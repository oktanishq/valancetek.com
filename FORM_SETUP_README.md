# Valance Tek - Contact Form Setup Guide

## 🚀 Quick Setup

### 1. Database Setup
1. Make sure XAMPP is installed and running
2. Start Apache and MySQL from XAMPP Control Panel
3. Open your browser and go to: `http://localhost/your-project-folder/src/setup_database.php`
4. The database and tables will be created automatically

### 2. Test the Forms
1. Go to your website: `http://localhost:8000` (if using Python server)
2. Or use: `http://localhost/your-project-folder/src/index.html` (if using XAMPP)
3. Fill out the contact form or newsletter signup
4. Check your email for notifications
5. View submissions at: `http://localhost/your-project-folder/src/admin.php`

## 📋 Features

### ✅ What's Working Now:
- ✅ Contact form submissions saved to database
- ✅ Email notifications sent to contact@valancetek.com
- ✅ Newsletter subscriptions handled
- ✅ Admin panel to view/manage submissions
- ✅ Form validation and error handling
- ✅ AJAX form submission (no page refresh)
- ✅ Success/error messages
- ✅ Database with proper structure

### 📊 Database Tables:
- `contact_submissions` - Stores contact form data
- `newsletter_subscriptions` - Stores newsletter signups

### 🔐 Admin Panel:
- Password: `valance2025` (change this in admin.php)
- View all submissions
- Mark messages as read/responded
- Statistics dashboard

## 🛠️ File Structure

```
src/
├── index.html           # Homepage with contact form (moved to root)
├── process_form.php     # Main form processor
├── setup_database.php   # Database setup script
├── admin.php            # Admin panel
├── FORM_SETUP_README.md # This file
└── pages/
    ├── about.html       # About page
    ├── contact.html     # Contact page with form
    ├── services.html    # Services page
    └── ... (other pages)
```

## 📧 Email Configuration

The system sends HTML emails to `contact@valancetek.com` with:
- Professional styling
- All form field data
- Submission timestamp
- Sender's reply-to address

## 🔧 Customization

### Change Admin Password:
Edit `src/admin.php` line 9:
```php
$admin_password = "your-new-password";
```

### Change Database Settings:
Edit `src/process_form.php` lines 8-11:
```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "valance_tek_contacts";
```

### Change Email Recipient:
Edit `src/process_form.php` line 25:
```php
$to = "your-email@domain.com";
```

## 🚨 Important Notes

1. **Security**: This is a basic setup. For production, add:
   - Proper user authentication
   - CSRF protection
   - Input sanitization improvements
   - Rate limiting

2. **Email**: Make sure your server/PHP can send emails, or configure SMTP

3. **Database**: Back up your database regularly

4. **Testing**: Test forms thoroughly before going live

## 🎯 Testing Checklist

- [ ] Database setup completed
- [ ] Forms submit without errors
- [ ] Email notifications received
- [ ] Admin panel accessible
- [ ] Form validation working
- [ ] Success messages appear
- [ ] Data saved to database correctly

## 🆘 Troubleshooting

### Forms not submitting:
- Check if XAMPP Apache is running
- Verify database connection
- Check PHP error logs

### Emails not sending:
- Check spam folder
- Verify PHP mail configuration
- Test with a different email address

### Database errors:
- Ensure MySQL is running
- Check database credentials
- Run setup_database.php again

---

**Need help?** Contact your developer or check the PHP error logs in XAMPP.