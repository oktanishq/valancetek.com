<?php
// Valance Tek - Database Setup Script
// Creates the necessary database and tables for contact form submissions

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$servername = "localhost";
$username = "valancetek_user";
$password = "Tanishq@1234";

// Create connection without specifying database
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "<h2>Valance Tek Database Setup</h2>";

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if ($conn->query($sql) === TRUE) {
    echo "<p style='color: green;'>✓ Database 'valance_tek_contacts' created successfully</p>";
} else {
    echo "<p style='color: red;'>✗ Error creating database: " . $conn->error . "</p>";
}

// Select the database
$conn->select_db("db");

// Create contact_submissions table
$table_sql = "
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
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
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if ($conn->query($table_sql) === TRUE) {
    echo "<p style='color: green;'>✓ Table 'contact_submissions' created successfully</p>";
} else {
    echo "<p style='color: red;'>✗ Error creating table: " . $conn->error . "</p>";
}

// Create newsletter_subscriptions table
$newsletter_sql = "
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    ip_address VARCHAR(45),
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if ($conn->query($newsletter_sql) === TRUE) {
    echo "<p style='color: green;'>✓ Table 'newsletter_subscriptions' created successfully</p>";
} else {
    echo "<p style='color: red;'>✗ Error creating newsletter table: " . $conn->error . "</p>";
}

// Insert sample data for testing
$sample_sql = "
INSERT IGNORE INTO contact_submissions (name, email, mobile, company, message, form_type) VALUES
('John Doe', 'john@example.com', '+1234567890', 'ABC Company', 'This is a test message from the contact form.', 'Contact Form'),
('Jane Smith', 'jane@example.com', '+1987654321', 'XYZ Corp', 'Interested in your web development services.', 'Contact Form')";

if ($conn->query($sample_sql) === TRUE) {
    echo "<p style='color: green;'>✓ Sample data inserted successfully</p>";
} else {
    echo "<p style='color: red;'>✗ Error inserting sample data: " . $conn->error . "</p>";
}

echo "<h3>Database Setup Complete!</h3>";
echo "<p><strong>Database:</strong> db</p>";
echo "<p><strong>Tables Created:</strong></p>";
echo "<ul>";
echo "<li>contact_submissions - Stores contact form submissions</li>";
echo "<li>newsletter_subscriptions - Stores newsletter signups</li>";
echo "</ul>";

echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>Make sure your XAMPP Apache and MySQL are running</li>";
echo "<li>Test the contact form on your website</li>";
echo "<li>Check your email for form submission notifications</li>";
echo "</ol>";

echo "<p><a href='../pages/index.html' style='background: #00c250; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>← Back to Website</a></p>";

$conn->close();
?>