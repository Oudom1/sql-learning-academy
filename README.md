# SQL Learning Academy

A standalone SQL learning and assessment pilot from **AI Agents Office**.

## Current features
- Basic, Intermediate and Advanced SQL assessments
- Five questions per level and automatic scoring
- Pass threshold: **80%** (4 out of 5)
- Separate achievement certificates for each passed level
- Certificate gallery and **Download / Save as PDF** through browser printing
- Responsive, static frontend

## Important limitations
This is a **pilot**, not a production examination or accredited certification service. Exam answers and grading are in the browser, and certificates are saved in browser localStorage. They can be altered by the user and cannot be independently verified. The current question bank is intentionally small. Do not use pilot certificates for hiring, compliance or official credential verification.

## Roadmap
1. Add complete beginner-to-advanced lessons and hands-on SQL practice in a restricted sandbox.
2. Add authenticated accounts, database persistence, server-side exam grading, larger randomized question banks and exam attempt records.
3. Add signed, unique certificate issuance, secure PDF generation, downloadable certificates and a verification URL/QR.
4. Add accessibility, security, QA tests and CI/CD deployment.

## Run
Open `index.html` in a browser. No dependencies are required.

## Deploy
Enable **GitHub Pages** under repository Settings → Pages, choose **Deploy from a branch**, branch **main**, folder **/(root)**. The expected URL after deployment is `https://oudom1.github.io/sql-learning-academy/`.

## Original task
[AI Agents Office issue #49](https://github.com/Oudom1/ai-agents-office/issues/49).
