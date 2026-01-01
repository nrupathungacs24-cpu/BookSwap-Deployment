# Complete Guide: Push BookSwap to GitHub

This guide will walk you through creating a GitHub account, creating a repository, and pushing your BookSwap code to it.

---

## Part 1: Create a GitHub Account

### If you already have a GitHub account, skip to Part 2.

1. **Open your browser** and go to: https://github.com/signup

2. **Enter your email address** in the field and click "Continue"

3. **Create a password** (must be at least 15 characters OR 8 characters with a number and lowercase letter)

4. **Choose a username** (this will be your GitHub identity, e.g., "nrupa123")

5. **Complete the verification** (solve the puzzle)

6. **Click "Create account"**

7. **Verify your email** - Check your email inbox and enter the code GitHub sends you

8. **Done!** You now have a GitHub account

---

## Part 2: Create a New Repository on GitHub

1. **Sign in to GitHub** at https://github.com/login

2. **Click the "+" icon** in the top-right corner

3. **Select "New repository"**

4. **Fill in the repository details**:
   - **Repository name**: `bookswap` (or any name you prefer)
   - **Description**: `BookSwap - A full-stack book exchange application`
   - **Visibility**: Choose "Public" (free) or "Private" (requires paid plan for some features)
   - **DO NOT** check "Initialize this repository with a README" (we already have code)
   - **DO NOT** add .gitignore or license yet

5. **Click "Create repository"**

6. **Copy the repository URL** - You'll see something like:
   ```
   https://github.com/YOUR_USERNAME/bookswap.git
   ```
   **Keep this URL handy!** You'll need it in Part 3.

---

## Part 3: Push Your Code to GitHub

Now let's push your BookSwap code to the repository you just created.

### Step 1: Check if Git is installed

Open PowerShell and run:
```powershell
git --version
```

**If you see a version number** (e.g., `git version 2.40.0`), Git is installed. Proceed to Step 2.

**If you see an error**, you need to install Git:
1. Download from: https://git-scm.com/download/win
2. Run the installer (use default settings)
3. Restart PowerShell and try `git --version` again

### Step 2: Configure Git (First-time setup)

Run these commands in PowerShell (replace with your info):
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Git in your project

```powershell
cd c:\Users\nrupa\OneDrive\Desktop\fullStack_project\BookSwap
git init
```

You should see: `Initialized empty Git repository`

### Step 4: Add all files to Git

```powershell
git add .
```

This stages all your files for commit.

### Step 5: Create your first commit

```powershell
git commit -m "Initial commit - BookSwap application ready for deployment"
```

You should see a summary of files committed.

### Step 6: Connect to your GitHub repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/bookswap.git
```

### Step 7: Rename the branch to 'main'

```powershell
git branch -M main
```

### Step 8: Push to GitHub

```powershell
git push -u origin main
```

**You'll be prompted for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (NOT your GitHub password)

#### How to create a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `BookSwap Deployment`
4. Set expiration: `90 days` (or your preference)
5. Check the box: `repo` (Full control of private repositories)
6. Scroll down and click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

### Step 9: Verify on GitHub

1. Go to: `https://github.com/YOUR_USERNAME/bookswap`
2. You should see all your BookSwap files!

---

## Part 4: What's Next?

Now that your code is on GitHub, you can deploy to Render! Follow the steps in `QUICKSTART.md` or `DEPLOYMENT.md`.

---

## 🆘 Troubleshooting

### "Permission denied" error
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` permissions

### "Repository not found" error
- Double-check the repository URL
- Make sure the repository exists on GitHub
- Verify your username is correct

### "Failed to push some refs" error
- Try: `git pull origin main --allow-unrelated-histories`
- Then: `git push -u origin main`

### Files are too large
- GitHub has a 100MB file size limit
- Check if you accidentally committed `node_modules/` (should be in `.gitignore`)

---

## 📝 Quick Command Reference

```powershell
# Check Git status
git status

# See what's changed
git diff

# Add specific files
git add filename.txt

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

**Congratulations!** Once you complete these steps, your BookSwap code will be on GitHub and ready for deployment! 🎉
