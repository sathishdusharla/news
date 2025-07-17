# Netlify Deployment Guide for Aksharakalam E-Paper

## 🚀 Deploying to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: 18

3. **Deploy**: Netlify will automatically build and deploy your site

### Method 2: Manual Deploy

1. **Build the project locally**:
   ```bash
   npm run build
   ```

2. **Deploy the dist folder**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to deploy

## 📁 Important Files for Netlify

### `netlify.toml` Configuration
- ✅ Build settings
- ✅ SPA redirect rules
- ✅ Security headers
- ✅ PDF caching rules
- ✅ Asset optimization

### `public/_redirects` Backup
- ✅ Fallback SPA routing

### Build Optimization
- ✅ Terser minification
- ✅ Code splitting
- ✅ Asset optimization
- ✅ PDF support

## 📰 Adding E-Papers After Deployment

### Daily Workflow:
1. **Name your PDF**: `epaper-DD-MM-YY.pdf` (e.g., `epaper-18-07-25.pdf`)
2. **Upload via Netlify Dashboard**:
   - Go to your site dashboard
   - Click "Site settings" → "Asset optimization" → "Static files"
   - Upload PDF to root directory
3. **Alternative**: Push to GitHub (auto-deploys)

### File Structure on Netlify:
```
yourdomain.netlify.app/
├── epaper-17-07-25.pdf  ← Today's edition
├── epaper-16-07-25.pdf  ← Archive
├── epaper-15-07-25.pdf  ← Archive
└── aksharakalam.png     ← Logo
```

## 🔧 Environment Variables (Optional)

If you need any environment variables:
- Go to Site settings → Environment variables
- Add any required variables

## 📱 Features Included

✅ **Automatic PDF Detection**
✅ **Mobile Responsive Design**
✅ **Fast Loading with CDN**
✅ **PWA Ready**
✅ **SEO Optimized**
✅ **Security Headers**

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain**:
   - Site settings → Domain management
   - Add your domain (e.g., `aksharakalam.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**: Automatically provided by Netlify

## 📊 Performance Optimization

The site includes:
- Code splitting for faster loading
- PDF caching for better performance
- Image optimization
- Minified assets
- CDN distribution

## 🔧 Troubleshooting

### Common Issues:

1. **PDF not loading**: Ensure file name matches `epaper-DD-MM-YY.pdf` format
2. **404 on page refresh**: The `_redirects` file handles SPA routing
3. **Build fails**: Check Node.js version is 18+

### Build Logs:
Check Netlify deploy logs for any build errors.

## 🎯 Daily Operation

Once deployed:
1. Upload new PDF with today's date
2. Website automatically detects and displays it
3. Previous PDFs move to archive
4. No code changes needed!

Your Aksharakalam e-paper site is now ready for production! 🎉
