# Valance Tek - Enterprise Technology Solutions

<div align="center">
  <img src="assets/4k Tran_logo.png" alt="Valance Tek Logo" width="200"/>
  
  [![Website](https://img.shields.io/badge/🌐_Website-Live-00c250?style=for-the-badge&logo=google-chrome)](https://valancetek.com)
  [![License](https://img.shields.io/badge/📄_License-MIT-blue?style=for-the-badge)](LICENSE)
  [![PHP](https://img.shields.io/badge/🐘_PHP-8.0+-777BB4?style=for-the-badge&logo=php)](https://php.net)
  [![MySQL](https://img.shields.io/badge/🗄️_MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql)](https://mysql.com)
  [![Responsive](https://img.shields.io/badge/📱_Responsive-Design-00c250?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
</div>

---

## 🚀 Overview

**Valance Tek** is a cutting-edge technology solutions provider specializing in enterprise-grade web development, mobile applications, cloud infrastructure, and digital transformation. Our modern, responsive website showcases our comprehensive service portfolio and provides seamless client engagement through advanced contact systems.

> **"Innovating the Future of Technology"** - Delivering excellence since 2024

## ✨ Key Features

### 🎯 Core Functionality
- **📧 Advanced Contact System** - Multi-channel communication with database integration
- **📊 Admin Dashboard** - Comprehensive submission management and analytics
- **📱 Fully Responsive Design** - Optimized for all devices and screen sizes
- **⚡ Performance Optimized** - Fast loading with modern web standards
- **🔍 SEO Optimized** - Complete with sitemaps, meta tags, and search engine optimization

### 🛠️ Technical Excellence
- **🔒 Secure Form Processing** - PHP backend with MySQL database
- **📈 Google Analytics 4** - Advanced user tracking and insights
- **🎨 Modern UI/UX** - Smooth animations and professional design
- **🌐 Multi-Platform Integration** - WhatsApp, email, and phone support
- **📋 Automated Workflows** - Email notifications and lead management

## 🏗️ Architecture

```
Valance Tek Website
├── 🎨 Frontend Layer
│   ├── HTML5 Semantic Structure
│   ├── CSS3 with Custom Animations
│   └── Vanilla JavaScript (ES6+)
├── ⚙️ Backend Layer
│   ├── PHP 8.0+ Processing
│   └── MySQL 8.0+ Database
└── 🔧 DevOps Layer
    ├── Apache/Nginx Hosting
    ├── SSL/TLS Encryption
    └── Performance Optimization
```

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [⚙️ Configuration](#️-configuration)
- [📊 Database Setup](#-database-setup)
- [🌐 Deployment](#-deployment)
- [🎯 Usage](#-usage)
- [🔧 Customization](#-customization)
- [📈 Analytics](#-analytics)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

## 🚀 Quick Start

Get the website running in under 5 minutes:

```bash
# Clone the repository
git clone https://github.com/your-username/valance-tek-website.git
cd valance-tek-website

# Start local server (using PHP built-in server)
php -S localhost:8000

# Visit http://localhost:8000 in your browser
```

## 🛠️ Installation

### Prerequisites
- **Web Server**: Apache/Nginx with PHP 8.0+
- **Database**: MySQL 8.0+ or MariaDB 10.5+
- **PHP Extensions**: mysqli, mbstring, curl
- **Browser**: Modern browser with JavaScript enabled

### Step-by-Step Setup

1. **📥 Download & Extract**
   ```bash
   wget https://github.com/your-username/valance-tek-website/archive/main.zip
   unzip main.zip
   cd valance-tek-website-main
   ```

2. **🗄️ Database Configuration**
   ```bash
   # Access MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE valance_tek_contacts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **🌐 Web Server Setup**
   ```apache
   # .htaccess configuration (already included)
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . index.html [L]
   ```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=valance_user
DB_PASS=your_secure_password
DB_NAME=valance_tek_contacts

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Admin Panel
ADMIN_PASSWORD=your_secure_admin_password
```

### File Permissions
```bash
# Set proper permissions
chmod 755 -R .
find . -type f -name "*.php" -exec chmod 644 {} \;
```

## 📊 Database Setup

### Automated Setup
Navigate to `setup_database.php` in your browser to automatically create tables and sample data.

### Manual Setup
```sql
-- Create contact submissions table
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    company VARCHAR(255),
    message TEXT,
    form_type VARCHAR(50) DEFAULT 'Contact Form',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    status ENUM('new', 'read', 'responded') DEFAULT 'new',
    notes TEXT,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create newsletter table
CREATE TABLE newsletter_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    ip_address VARCHAR(45),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 🌐 Deployment

### cPanel Deployment
1. **📤 Upload Files**
   - Upload all files to `public_html`
   - Ensure `.htaccess` is uploaded
   - Set permissions: 755 (directories), 644 (files)

2. **🔒 SSL Configuration**
   - Install SSL certificate
   - Enable HTTPS redirect in `.htaccess`

3. **🔧 Final Configuration**
   - Update domain in `sitemap.xml`
   - Configure Google Analytics
   - Update contact information

### Cloud Deployment Options
- **AWS**: Use EC2 with RDS MySQL
- **DigitalOcean**: App Platform or Droplets
- **Heroku**: PHP application deployment
- **Vercel/Netlify**: Static hosting with serverless functions

## 🎯 Usage

### Admin Panel Access
```
URL: https://yourdomain.com/admin.php
Default Password: valance2025 (change immediately)
```

### Form Testing
- **Contact Form**: Test lead generation
- **Newsletter**: Verify subscription handling
- **File Uploads**: Check attachment processing

### Performance Monitoring
- Monitor Google Analytics dashboard
- Check server response times
- Review database query performance

## 🔧 Customization

### Branding
```css
/* styles/style.css */
:root {
  --primary-color: #00c250;
  --secondary-color: #333333;
  --accent-color: #00a040;
}
```

### Content Management
- Update company information in HTML files
- Modify services in `pages/services.html`
- Customize contact details in footer component

### Feature Extensions
- Add new form fields in `process_form.php`
- Extend admin panel functionality
- Integrate third-party APIs

## 📈 Analytics & Monitoring

### Google Analytics 4
- **Real-time Users**: Monitor active visitors
- **Conversion Tracking**: Form submission events
- **User Journey**: Page flow analysis
- **Device Analytics**: Mobile vs desktop usage

### Performance Metrics
- **Page Load Time**: < 3 seconds target
- **Form Conversion**: Track submission rates
- **Email Delivery**: Monitor notification success
- **Database Performance**: Query optimization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **💾 Commit** changes: `git commit -m 'Add amazing feature'`
4. **📤 Push** to branch: `git push origin feature/amazing-feature`
5. **🔄 Open** a Pull Request

### Development Guidelines
- Follow PHP PSR standards
- Use semantic HTML5
- Maintain responsive design principles
- Test across multiple browsers
- Document new features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Valance Tek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 📞 Support & Contact

<div align="center">

### Get In Touch
**📧 Email**: contact@valancetek.com  
**📱 Phone**: +91 74281 39556  
**💬 WhatsApp**: [Chat with us](https://wa.me/917428139556)  

### Business Hours
**🕒 Monday - Saturday**: 9:00 AM - 6:00 PM IST  
**🌍 Time Zone**: Asia/Kolkata (UTC+5:30)  

### Response Time
**⚡ Initial Response**: Within 24 hours  
**🎯 Project Quotes**: Within 48 hours  
**🚀 Support Tickets**: Within 4 hours  

</div>

---

<div align="center">
  <p><strong>Built with ❤️ by Valance Tek</strong></p>
  <p><em>Transforming Ideas into Digital Reality</em></p>
  
  ![GitHub stars](https://img.shields.io/github/stars/your-username/valance-tek-website?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/your-username/valance-tek-website?style=social)
  ![GitHub watchers](https://img.shields.io/github/watchers/your-username/valance-tek-website?style=social)
</div>

---

**🔒 Security Note**: This repository contains production-ready code. Please review security best practices before deployment.

**📊 Analytics**: This README was last updated on September 6, 2024. Star this repo if you find it helpful! ⭐