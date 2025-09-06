# Valance Technologies - cPanel Deployment Guide

## 🚀 Deployment Checklist

### Pre-Deployment Tasks
- [ ] Update domain name in sitemap.xml (currently set to valancetek.com)
- [ ] Update domain name in robots.txt (currently set to valancetek.com)
- [ ] Replace placeholder favicon files with actual company favicon
- [ ] Update Google Analytics ID (currently GA_MEASUREMENT_ID)
- [ ] Update social media links in footer (currently placeholders)
- [ ] Test all forms and contact functionality
- [ ] Verify all external links (WhatsApp, email, phone)

### File Structure
```
public_html/ (or your cPanel root directory)
├── index.html (main homepage)
├── .htaccess
├── robots.txt
├── sitemap.xml
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   └── animation-preview.html
├── assets/
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── 4k Tran_logo.png
│   ├── White Text.png
│   └── whatsapp_qr.jpg
├── styles/
│   └── style.css
├── js/
│   └── main.js
└── components/ (development only - remove for production)
    ├── nav.html
    ├── footer.html
    └── footer-template.html
```

### Deployment Steps

#### 1. Prepare Files
```bash
# From your local project directory
cd src
# All files are ready for upload
```

#### 2. Upload to cPanel
1. Log into your cPanel account
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root directory)
4. Upload all files from the `src/` directory, maintaining the folder structure:
    - `index.html` → root directory
    - `pages/` folder with all page files
    - `assets/`, `styles/`, `js/` folders
    - `.htaccess`, `robots.txt`, `sitemap.xml` → root directory
5. Ensure `.htaccess` is uploaded (hidden files may need to be shown)

#### 3. Set Permissions
- Set directory permissions to 755
- Set file permissions to 644
- Ensure `.htaccess` is readable (644)

#### 4. Update Domain References
1. Edit `sitemap.xml` and replace `valancetek.com` with your actual domain
2. Edit `robots.txt` and replace `valancetek.com` with your actual domain
3. Update any hardcoded URLs in HTML files if necessary

#### 5. SSL Certificate
1. In cPanel, go to **SSL/TLS Status**
2. Install SSL certificate for your domain
3. Update `.htaccess` to redirect HTTP to HTTPS (uncomment the redirect rule)

#### 6. Test Deployment
- Visit your website
- Test all navigation links
- Check that all assets load (images, CSS, JS)
- Test contact forms
- Verify favicon appears in browser tab
- Check mobile responsiveness

### Post-Deployment Configuration

#### Google Analytics
1. Create Google Analytics account
2. Get your GA4 Measurement ID
3. Replace `GA_MEASUREMENT_ID` in all HTML files

#### Search Console
1. Submit sitemap to Google Search Console
2. Add your domain to Google Search Console
3. Verify domain ownership

#### Social Media
Update social media links in footer component:
- LinkedIn
- Instagram
- Facebook
- Twitter (if applicable)

### Troubleshooting

#### Common Issues
1. **404 Errors**: Check file paths and ensure all files uploaded to correct directories
2. **Assets not loading**: Verify relative paths are correct (pages use `../assets/` for assets)
3. **Favicon not showing**: Clear browser cache or check file paths in root directory
4. **Forms not working**: Ensure form action URLs are correct
5. **Navigation broken**: Verify pages are in `pages/` subdirectory and paths are absolute (`/pages/...`)

#### Performance Optimization
- Enable compression in cPanel (already configured in .htaccess)
- Set up browser caching (already configured in .htaccess)
- Consider CDN for assets if needed

### Maintenance
- Regularly update sitemap.xml when adding new pages
- Monitor Google Analytics for user behavior
- Keep contact information updated
- Backup files regularly through cPanel

### Support
If you encounter issues during deployment, check:
1. cPanel error logs
2. Browser developer tools for console errors
3. File permissions
4. Domain DNS settings

---
**Note**: This deployment guide assumes a standard cPanel setup. Your specific hosting provider may have slight variations in the interface or available features.