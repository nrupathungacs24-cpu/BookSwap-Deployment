# Quick Start Guide - Deploy BookSwap to Render

Follow these steps to make your BookSwap application publicly accessible.

## 🎯 Quick Steps

### 1. Push to GitHub

```powershell
# Navigate to project
cd c:\Users\nrupa\OneDrive\Desktop\fullStack_project\BookSwap

# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/bookswap.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Render

1. **Sign up at [render.com](https://render.com)** (use GitHub to sign in)

2. **Deploy Backend**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Settings:
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add Environment Variables:
     - `NODE_ENV` = `production`
     - `PORT` = `3000`
     - `FIREBASE_SERVICE_ACCOUNT` = *[paste your service-account-key.json content]*
   - Click "Create Web Service"
   - **Copy your backend URL**: `https://bookswap-backend-XXXX.onrender.com`

3. **Update Frontend Environment**:
   - Create `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://bookswap-backend-XXXX.onrender.com/api',
     firebaseConfig: { /* your config */ }
   };
   ```
   - Commit and push:
   ```powershell
   git add .
   git commit -m "Add production environment"
   git push
   ```

4. **Deploy Frontend**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repo
   - Settings:
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist/book-swap`
   - Click "Create Static Site"
   - **Copy your frontend URL**: `https://bookswap-XXXX.onrender.com`

### 3. Share Your App! 🎉

Your app is now live at: `https://bookswap-XXXX.onrender.com`

Share this URL with anyone - they can access it from any device!

---

## 📚 Need More Help?

See the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) guide for:
- Troubleshooting
- Environment variable setup
- MongoDB configuration
- CORS issues

---

## ⚡ Important Notes

- **First Load**: Free tier apps may take 30-60 seconds on first load after inactivity
- **Auto-Deploy**: Any `git push` will automatically redeploy your app
- **Logs**: Check Render dashboard for deployment logs if issues occur

**That's it! Your BookSwap app is now publicly accessible! 🚀**
