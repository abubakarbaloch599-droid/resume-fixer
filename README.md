# Resume Fixer — deploy guide

## What's in this folder
- `public/index.html` — the website (frontend). No build step needed.
- `api/fix-resume.js` — a serverless function that holds your Anthropic API key safely and calls Claude.
- `vercel.json` — tells Vercel how to run this project.

## Step 1: Get an Anthropic API key
1. Go to https://console.anthropic.com
2. Sign up / log in
3. Go to "API Keys" and create a new key
4. Copy it somewhere safe — you'll paste it into Vercel in Step 3
5. Add a small amount of credit to your account (this is separate from your Claude.ai subscription — it's pay-per-use, usually cents per resume rewrite)

## Step 2: Push this folder to GitHub
1. Go to https://github.com and create a new repository (e.g. "resume-fixer")
2. Upload this whole folder to that repository (drag and drop on GitHub's web UI works, or use `git push` if you're comfortable with git)

## Step 3: Deploy on Vercel
1. Go to https://vercel.com and sign up (you can sign up with your GitHub account — makes this step faster)
2. Click "Add New Project"
3. Import the GitHub repository you just created
4. Before clicking deploy, go to "Environment Variables" and add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (paste the key from Step 1)
5. Click "Deploy"
6. Wait about a minute — Vercel gives you a live URL like `resume-fixer-yourname.vercel.app`

## Step 4: Test it
Open your live URL, paste a real resume and job description, and click "Fix my resume". If it works, you have a live product with a real link you can share or sell.

## Step 5 (optional): Custom domain
In your Vercel project settings, go to "Domains" and connect a domain you own (e.g. resumefixer.com) if you want something more brandable than the free vercel.app link.

## Cost to run
- Vercel free tier covers this easily (it's a tiny app)
- Anthropic API costs are usage-based — a single resume rewrite typically costs a fraction of a cent to a few cents depending on resume length. If you charge $3-9 per use, your margin stays very high.
