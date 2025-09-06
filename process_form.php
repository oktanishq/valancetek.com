<?php
// Valance Tek - Contact Form Processor
// Handles form submissions, database storage, and email notifications

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$servername = "localhost";
$username = "valancetek_user";
$password = "Tanishq@1234";
$dbname = "db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed. Please run setup_database.php first.',
        'error' => $conn->connect_error
    ]);
    exit();
}

// Set charset to handle special characters
$conn->set_charset("utf8");

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = sanitize_input($_POST['full-name'] ?? $_POST['name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $mobile = sanitize_input($_POST['mobile'] ?? '');
    $company = sanitize_input($_POST['company'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    // Determine form type
    $form_type = isset($_POST['full-name']) ? 'Contact Form' : 'Newsletter';

    // Validate required fields
    $errors = [];

    if (empty($name)) {
        $errors[] = "Name is required";
    }

    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }

    if ($form_type === 'Contact Form' && empty($message)) {
        $errors[] = "Message is required";
    }

    // If no errors, process the form
    if (empty($errors)) {
        // Insert into database
        $sql = "INSERT INTO contact_submissions (name, email, mobile, company, message, form_type, submitted_at, ip_address)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)";

        $stmt = $conn->prepare($sql);
        $ip_address = $_SERVER['REMOTE_ADDR'];

        $stmt->bind_param("sssssss", $name, $email, $mobile, $company, $message, $form_type, $ip_address);

        if ($stmt->execute()) {
            // Return success response
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been received successfully.'
            ]);
        } else {
            // Log the error
            error_log("Database insert failed: " . $stmt->error);

            // Return error response
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Database error. Please run setup_database.php first.',
                'error' => $stmt->error
            ]);
        }

        $stmt->close();
    } else {
        // Return validation errors
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Please correct the following errors:',
            'errors' => $errors
        ]);
    }
} else {
    // Return error for non-POST requests
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}

$conn->close();
?>