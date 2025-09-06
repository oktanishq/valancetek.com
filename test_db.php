<?php
// Test database connection and table existence
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Database Connection Test</h2>";

// Database configuration
$servername = "localhost";
$username = "valancetek_user";
$password = "Tanishq@1234";
$dbname = "db";

echo "<h3>Testing Connection...</h3>";

// Create connection
$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    echo "<p style='color: red;'>❌ Connection failed: " . $conn->connect_error . "</p>";
    echo "<p><strong>Solution:</strong> Make sure XAMPP MySQL is running</p>";
    exit();
}

echo "<p style='color: green;'>✅ Connected to MySQL successfully</p>";

// Check if database exists
$result = $conn->query("SHOW DATABASES LIKE '$dbname'");
if ($result->num_rows == 0) {
    echo "<p style='color: red;'>❌ Database '$dbname' does not exist</p>";
    echo "<p><strong>Solution:</strong> Run <a href='setup_database.php'>setup_database.php</a> first</p>";
    exit();
}

echo "<p style='color: green;'>✅ Database '$dbname' exists</p>";

// Select database
$conn->select_db($dbname);

// Check if tables exist
$tables = ['contact_submissions', 'newsletter_subscriptions'];
$missing_tables = [];

foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows == 0) {
        $missing_tables[] = $table;
    } else {
        echo "<p style='color: green;'>✅ Table '$table' exists</p>";
    }
}

if (!empty($missing_tables)) {
    echo "<p style='color: red;'>❌ Missing tables: " . implode(', ', $missing_tables) . "</p>";
    echo "<p><strong>Solution:</strong> Run <a href='setup_database.php'>setup_database.php</a> again</p>";
}

// Test insert query
echo "<h3>Testing Form Submission...</h3>";
$sql = "INSERT INTO contact_submissions (name, email, message, form_type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $test_name = "Test User";
    $test_email = "test@example.com";
    $test_message = "This is a test message";
    $test_type = "Test Form";

    $stmt->bind_param("ssss", $test_name, $test_email, $test_message, $test_type);

    if ($stmt->execute()) {
        echo "<p style='color: green;'>✅ Test insert successful</p>";
        // Clean up test data
        $conn->query("DELETE FROM contact_submissions WHERE email = 'test@example.com'");
    } else {
        echo "<p style='color: red;'>❌ Test insert failed: " . $stmt->error . "</p>";
    }
    $stmt->close();
} else {
    echo "<p style='color: red;'>❌ Failed to prepare statement: " . $conn->error . "</p>";
}

$conn->close();

echo "<h3>Email Test</h3>";
// Test email functionality
$test_email_result = mail("test@example.com", "Test Email", "This is a test email from Valance Tek setup.");
if ($test_email_result) {
    echo "<p style='color: green;'>✅ Email function is working</p>";
} else {
    echo "<p style='color: orange;'>⚠️ Email function may not work in local environment (this is normal)</p>";
    echo "<p style='font-size: 0.9em; color: #666;'>Email will work on live server with proper SMTP configuration</p>";
}

echo "<h3>Summary</h3>";
echo "<p>If all checks above are green, your database is ready!</p>";
echo "<p>If you see red errors, follow the solutions provided.</p>";
echo "<p><a href='setup_database.php'>← Run Database Setup</a> | <a href='admin.php'>View Admin Panel →</a></p>";
?>