# 🚀 BrainFix - Deployment Guide

Deploy BrainFix to production using various cloud platforms.

## ⚡ Quick Deploy (30 seconds)

### Vercel (Easiest)

```bash
# 1. Create account at vercel.com (free)
# 2. Install Vercel CLI
npm i -g vercel

# 3. Deploy from project directory
cd mindmap-3d
vercel deploy

# 4. Done! Get live URL
```

### Netlify (Drag & Drop)

1. Go to netlify.com
2. Drag and drop `index.html`, `brain-visualizer.js`, `brain-search.js`
3. Done! Get live URL

## 📋 Platform-by-Platform Guide

### Vercel (Recommended)

**Pros:**
- Free tier includes unlimited deployments
- Auto-scaling
- Edge functions
- Built-in analytics
- Git integration

**Steps:**

```bash
# 1. Install CLI
npm install -g vercel

# 2. Navigate to project
cd /path/to/mindmap-3d

# 3. Deploy
vercel

# Follow prompts:
# - Link existing project? No
# - Set project name: brainfix
# - Set directory: ./
# - Deploy? Yes

# 4. Visit your URL!
```

**Add Environment Variables:**

```bash
vercel env add API_KEY
vercel env add DATABASE_URL
vercel deploy
```

**Monitor and Logs:**

```bash
# View deployments
vercel list

# View logs
vercel logs

# Remove deployment
vercel remove [deployment-id]
```

### Netlify

**Pros:**
- Simple drag-and-drop
- Free SSL
- Continuous deployment
- Custom domains

**Steps:**

1. **Sign Up**
   - Go to netlify.com
   - Sign up with GitHub/email

2. **Deploy**
   - Drag and drop your files
   - OR connect GitHub repo
   - Files auto-deployed

3. **Custom Domain**
   - Settings → Domain management
   - Add custom domain
   - Update DNS records
   - Auto-provisioned SSL

**Using CLI:**

```bash
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd mindmap-3d
netlify deploy

# Production deploy
netlify deploy --prod
```

### GitHub Pages (Free)

**Pros:**
- Free hosting
- Version control
- Auto-deploys from git

**Steps:**

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/brainfix
   git push -u origin main
   ```

2. **Enable Pages**
   - Go to repo → Settings
   - Enable GitHub Pages
   - Select main branch as source

3. **Access**
   - Your site: `https://username.github.io/brainfix`

### AWS S3 + CloudFront

**Pros:**
- Scalable
- Reliable
- CDN included
- Professional

**Steps:**

```bash
# 1. Create S3 bucket
aws s3 mb s3://my-brainfix-bucket

# 2. Upload files
aws s3 cp index.html s3://my-brainfix-bucket/
aws s3 cp brain-*.js s3://my-brainfix-bucket/

# 3. Make files public
aws s3api put-bucket-acl \
    --bucket my-brainfix-bucket \
    --acl public-read

# 4. Enable website hosting
aws s3 website s3://my-brainfix-bucket \
    --index-document index.html

# 5. Set up CloudFront (CDN)
# Use AWS Console to create distribution
```

**Cost:** ~$0.50-5/month depending on traffic

### DigitalOcean App Platform

**Pros:**
- Straightforward pricing
- Reliable
- Easy management

**Steps:**

1. **Connect GitHub**
   - Apps → Create App
   - Connect your GitHub repo

2. **Configure**
   - Select source branch
   - auto-deploys on push

3. **Domain**
   - Apps → Domains
   - Add custom domain

**Cost:** $5-12/month

### Heroku

**Pros:**
- Easy git deployment
- Automatic SSL

**Note:** Heroku phased out free tier in late 2022

```bash
# Still available with paid plans
heroku login
heroku create my-brainfix
git push heroku main
```

**Cost:** $7+/month

## 🌍 Setting Up Custom Domain

### For Any Platform:

1. **Register Domain**
   - GoDaddy, Namecheap, Google Domains, etc.
   - Cost: $10-15/year

2. **Point DNS to Platform**

   **For Vercel:**
   ```
   - Get nameservers from Vercel dashboard
   - Update domain registrar to use those nameservers
   - Wait 24-48 hours for propagation
   ```

   **For Netlify:**
   ```
   - Settings → Domain management
   - Add domain
   - Update nameservers or CNAME record
   - Auto-SSL after verification
   ```

   **For AWS:**
   ```
   - Get CloudFront domain
   - Add CNAME or A record in DNS
   - Verify SSL
   ```

3. **Verify**
   ```bash
   # Check DNS propagation
   nslookup yourdomain.com
   
   # Should show platform's servers
   ```

## 🔒 HTTPS/SSL

Most platforms handle automatically. For self-hosted:

```bash
# Using Let's Encrypt (free)
certbot certonly --webroot \
    -w /var/www/brainfix \
    -d yourdomain.com

# Nginx config
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/.../fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/.../privkey.pem;
    
    root /var/www/brainfix;
    index index.html;
}
```

## 📦 Building for Production

### Optimize Assets

```bash
# Minify HTML
npm install -g html-minifier
html-minifier --input-dir . --output-dir dist --file-ext html

# Minify JS
npm install -g terser
terser brain-visualizer.js -o brain-visualizer.min.js
```

### Create Production Build

```bash
# Create dist folder
mkdir dist

# Copy files
cp index.html dist/
cp brain-visualizer.js dist/
cp brain-search.js dist/
cp *.md dist/

# Deploy dist folder instead
```

### Enable Caching

**Vercel** (auto):
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

**Netlify** (auto):
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

## 📊 Environment-Specific Config

### Development
```html
<!-- index.html -->
<script>
    const isDev = window.location.hostname === 'localhost';
    const apiUrl = isDev 
        ? 'http://localhost:3000/api'
        : 'https://api.brainfix.com';
</script>
```

### Production Checklist

- [ ] Remove console.log statements
- [ ] Test on production domain
- [ ] Enable analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure CORS headers
- [ ] Enable compression
- [ ] Set cache headers
- [ ] Test on multiple browsers
- [ ] Performance test (Lighthouse)
- [ ] Security check (SSL, headers)

## 🔍 Performance Optimization

### Lighthouse Score Target: 90+

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

### Common Optimizations

1. **Lazy Load Brain**
```javascript
// Only load when visible
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        initializeBrain();
    }
});
observer.observe(document.getElementById('heroBrain'));
```

2. **Optimize Images**
```bash
# Use WebP format
imagemin *.png --out-dir=dist --plugin=webp
```

3. **Minify JavaScript**
```bash
# Minify all JS
terser *.js --compress --mangle --output bundle.min.js
```

4. **Gzip Compression**
```bash
# Enable on server
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

## 📈 Monitoring & Analytics

### Application Monitoring

```javascript
// Sentry (error tracking)
import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "your-sentry-dsn",
    environment: "production"
});
```

### User Analytics

```javascript
// Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

### Track Custom Events

```javascript
// Track searches
document.getElementById('searchInput').addEventListener('input', (e) => {
    gtag('event', 'search', {
        search_term: e.target.value
    });
});

// Track solution views
function openSolution(region, issueIdx) {
    gtag('event', 'view_solution', {
        region: region,
        issue: issueIdx
    });
}
```

## 🔐 Security Checklist

- [ ] Enable HTTPS
- [ ] Set security headers
- [ ] Implement CORS
- [ ] Validate user input
- [ ] Rate limit API
- [ ] Keep dependencies updated
- [ ] Remove sensitive data from code
- [ ] Enable authentication for admin
- [ ] Backup database regularly
- [ ] Monitor for vulnerabilities

### Security Headers

```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
```

## 💰 Cost Estimation

| Platform | Price | Notes |
|----------|-------|-------|
| Vercel | Free-$20 | Most affordable, great for startups |
| Netlify | Free-$19 | Great for JAMstack |
| GitHub Pages | Free | Good for open source |
| DigitalOcean | $5-60 | More control, VPS |
| AWS | $0.50-50 | Pay-as-you-go, scalable |
| Heroku | $7-50 | Easy but more expensive |

## 🔄 Continuous Deployment

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📝 Deployment Checklist

- [ ] Code is production-ready
- [ ] All tests pass
- [ ] Environment variables set
- [ ] Domain configured
- [ ] SSL certificate valid
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Performance optimal
- [ ] Security headers set
- [ ] Documentation updated

## 🆘 Troubleshooting

### Site not loading
```bash
# Check if files were uploaded
curl https://yourdomain.com

# Check HTTPS
openssl s_client -connect yourdomain.com:443

# Check DNS
nslookup yourdomain.com
```

### Slow performance
- Enable caching
- Minify assets
- Use CDN
- Optimize images
- Defer non-critical JavaScript

### Deploy failed
- Check logs with platform CLI
- Verify file paths
- Check file permissions
- Validate HTML syntax

## 🎉 You're Live!

Once deployed:

1. Share URL with users
2. Monitor analytics
3. Fix bugs quickly (all platforms support instant redeploy)
4. Iterate based on user feedback
5. Scale as needed

---

**Ready to launch? Choose your platform and deploy in minutes!** 🚀
