const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({acceptDownloads:true});
  page.on('dialog',d=>d.accept('SQL Academy Test Learner'));
  await page.goto('file://'+process.cwd()+'/index.html');
  for(const [level,expected] of [['basic',80],['intermediate',100],['advanced',100]]){
   await page.locator('[data-start="'+level+'"]').click();
   const answers=level==='basic'?[0,1,0,1,0]:level==='intermediate'?[1,1,1,1,0]:[0,0,0,0,0];
   if(level==='basic')answers[4]=0; // deliberately one wrong, exactly 80%
   for(let i=0;i<5;i++)await page.locator('input[name="q'+i+'"][value="'+answers[i]+'"]').check();
   await page.locator('#submit').click();
   await page.locator('#score').getByText(String(expected)+'%',{exact:false}).count().catch(()=>{});
   const result=await page.locator('#score').innerText();
   assert(result.includes(expected+'%')&&result.includes('PASSED'),level+' pass failed: '+result);
   await page.locator('#view').click();
   assert((await page.locator('#paper').innerText()).includes('SQL Academy Test Learner'));
   assert(await page.locator('#preview').isVisible());
  }
  await page.reload();
  assert.equal(await page.locator('[data-cert]').count(),3,'certificates must survive refresh');
  await page.locator('[data-cert="basic"]').click();
  assert((await page.locator('#paper').innerText()).includes('80%'));
  await page.locator('[data-start="basic"]').click();
  for(let i=0;i<5;i++)await page.locator('input[name="q'+i+'"][value="2"]').check();
  await page.locator('#submit').click();
  assert((await page.locator('#score').innerText()).includes('NOT PASSED'));
  assert(await page.locator('#view').isHidden(),'failed exam cannot issue certificate');
  assert.equal(await page.locator('[data-cert]').count(),3,'failed retake must not remove existing certificate');
  console.log('PASS: 80% pass, 100% pass, 3 level certificates, persistence, failed attempt, and no new certificate on failure');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
