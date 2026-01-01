# BookSwap Deployment Guide - Render

This guide will walk you through deploying your BookSwap full-stack application to Render, making it publicly accessible from any system.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account**: Create one at [github.com](https://github.com) if you don't have one
2. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
3. **Firebase Project**: Your existing Firebase project with service account key
4. **Git Installed**: Download from [git-scm.com](https://git-scm.com/)

---

## 🚀 Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository (if not already done)

Open PowerShell in your project root:

```powershell
cd c:\Users\nrupa\OneDrive\Desktop\fullStack_project\BookSwap
git init
```

### 1.2 Create `.gitignore` Files

Ensure sensitive files are NOT committed:

**Backend `.gitignore`** (should already exist):
```
node_modules/
.env
service-account-key.json
```

**Frontend `.gitignore`** (should already exist):
```
node_modules/
dist/
.angular/
/src/environments/environment.ts
/src/environments/environment.development.ts
```

### 1.3 Commit and Push to GitHub

```powershell
# Add all files
git add .

# Commit
git commit -m "Initial commit - BookSwap application"

# Create a new repository on GitHub (via web browser)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/bookswap.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `BookSwap` repository

### 2.2 Configure Backend Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `bookswap-backend` |
| **Region** | Choose closest to you (e.g., Oregon) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add the following:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `FIREBASE_SERVICE_ACCOUNT` | *Paste entire contents of `service-account-key.json` as a single-line JSON string* |

**Important**: To convert `service-account-key.json` to a single line:
```powershell
# In PowerShell
Get-Content backend\service-account-key.json -Raw | ConvertTo-Json -Compress
```

Copy the output and paste it as the value for `FIREBASE_SERVICE_ACCOUNT`.

### 2.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Note your backend URL: `https://bookswap-backend-XXXX.onrender.com`

### 2.5 Test Backend

Visit: `https://bookswap-backend-XXXX.onrender.com/`

You should see:
```json
{
  "status": "OK",
  "message": "BookSwap Backend is running"
}
```

---

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Update Frontend Environment

Before deploying, update the frontend to use your production backend URL.

**Create/Update `frontend/src/environments/environment.prod.ts`:**

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://bookswap-backend-XXXX.onrender.com/api',
  firebaseConfig: {
    // Your Firebase config here
  }
};
```

**Commit and push this change:**
```powershell
git add .
git commit -m "Add production environment configuration"
git push
```

### 3.2 Create Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select your `BookSwap` repository

### 3.3 Configure Frontend Service

| Setting | Value |
|---------|-------|
| **Name** | `bookswap-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist/book-swap` |

### 3.4 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for build to complete (5-10 minutes)
3. Note your frontend URL: `https://bookswap-XXXX.onrender.com`

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend API

```powershell
# Test health check
curl https://bookswap-backend-XXXX.onrender.com/

# Test API endpoint
curl https://bookswap-backend-XXXX.onrender.com/api/test
```

### 4.2 Test Frontend

1. Open browser and visit: `https://bookswap-XXXX.onrender.com`
2. You should see the BookSwap homepage
3. Test authentication:
   - Click "Sign Up"
   - Create a new account
   - Verify registration works
4. Test book features:
   - Add a book
   - Search for books
   - View book details

---

## 🔗 Your Public URLs

After successful deployment, you'll have:

- **Frontend (Main App)**: `https://bookswap-XXXX.onrender.com`
- **Backend API**: `https://bookswap-backend-XXXX.onrender.com`

**Share the frontend URL with anyone** - they can access your BookSwap application from any device with internet!

---

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: Backend shows "Application failed to respond"
- **Solution**: Check Render logs for errors
- Verify environment variables are set correctly
- Ensure Firebase service account JSON is valid

**Problem**: CORS errors in browser console
- **Solution**: Update backend CORS configuration to allow your frontend URL

### Frontend Issues

**Problem**: Blank page or 404 errors
- **Solution**: Verify `_redirects` file is in `dist/book-swap/` after build
- Check build logs for compilation errors

**Problem**: API calls failing
- **Solution**: Verify `environment.prod.ts` has correct backend URL
- Check browser console for error messages

### Free Tier Limitations

- **Backend**: May spin down after 15 minutes of inactivity (first request after will be slow)
- **Build Time**: Limited to 500 build hours/month
- **Bandwidth**: 100 GB/month

---

## 🔄 Updating Your Deployment

To deploy updates:

```powershell
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

Render will automatically rebuild and redeploy both services!

---

## 📞 Support

If you encounter issues:
1. Check Render logs in the dashboard
2. Review [Render Documentation](https://render.com/docs)
3. Check Firebase console for authentication issues

---

**Congratulations! Your BookSwap application is now live and publicly accessible! 🎉**
