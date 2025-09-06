<?php
// Valance Tek - Admin Panel
// Simple interface to view contact form submissions

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Simple authentication (replace with proper authentication in production)
$admin_password = "valance2025"; // Change this to a secure password

// Check if user is logged in
$logged_in = false;
if (isset($_POST['password']) && $_POST['password'] === $admin_password) {
    $logged_in = true;
    $_SESSION['admin_logged_in'] = true;
} elseif (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    $logged_in = true;
}

// Start session for login persistence
session_start();

// Database configuration
$servername = "localhost";
$username = "valancetek_user";
$password = "Tanishq@1234";
$dbname = "db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit();
}

// Handle status updates
if ($logged_in && isset($_POST['update_status'])) {
    $id = intval($_POST['submission_id']);
    $status = $_POST['status'];

    $sql = "UPDATE contact_submissions SET status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $id);
    $stmt->execute();
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valance Tek - Admin Panel</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #00c250, #00a040);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            text-align: center;
        }

        .login-form {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 2rem auto;
        }

        .login-form input {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .login-form button {
            width: 100%;
            padding: 0.75rem;
            background: #00c250;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #00c250;
        }

        .table-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        tr:hover {
            background: #f8f9fa;
        }

        .status {
            padding: 0.25rem 0.5rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .status-new {
            background: #fff3cd;
            color: #856404;
        }

        .status-read {
            background: #d1ecf1;
            color: #0c5460;
        }

        .status-responded {
            background: #d4edda;
            color: #155724;
        }

        .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.875rem;
            text-decoration: none;
            display: inline-block;
        }

        .btn-primary {
            background: #00c250;
            color: white;
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }

        .message {
            background: white;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            border-left: 4px solid #00c250;
        }

        .logout-btn {
            position: absolute;
            top: 20px;
            right: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (!$logged_in): ?>
            <div class="login-form">
                <h2>Admin Login</h2>
                <form method="post">
                    <input type="password" name="password" placeholder="Enter admin password" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        <?php else: ?>
            <div class="header">
                <h1>Valance Tek - Admin Panel</h1>
                <p>Manage contact form submissions</p>
                <a href="?logout=1" class="btn btn-danger logout-btn">Logout</a>
            </div>

            <?php
            // Get statistics
            $total_sql = "SELECT COUNT(*) as total FROM contact_submissions";
            $new_sql = "SELECT COUNT(*) as new_count FROM contact_submissions WHERE status = 'new'";
            $today_sql = "SELECT COUNT(*) as today_count FROM contact_submissions WHERE DATE(submitted_at) = CURDATE()";

            $total_result = $conn->query($total_sql)->fetch_assoc();
            $new_result = $conn->query($new_sql)->fetch_assoc();
            $today_result = $conn->query($today_sql)->fetch_assoc();
            ?>

            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $total_result['total']; ?></div>
                    <div>Total Submissions</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $new_result['new_count']; ?></div>
                    <div>New Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $today_result['today_count']; ?></div>
                    <div>Today's Submissions</div>
                </div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql = "SELECT * FROM contact_submissions ORDER BY submitted_at DESC";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                $status_class = 'status-' . $row['status'];
                                echo "<tr>";
                                echo "<td>" . $row['id'] . "</td>";
                                echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                                echo "<td><a href='mailto:" . htmlspecialchars($row['email']) . "'>" . htmlspecialchars($row['email']) . "</a></td>";
                                echo "<td>" . htmlspecialchars($row['company'] ?: 'N/A') . "</td>";
                                echo "<td>" . htmlspecialchars(substr($row['message'], 0, 50)) . (strlen($row['message']) > 50 ? '...' : '') . "</td>";
                                echo "<td><span class='status {$status_class}'>" . ucfirst($row['status']) . "</span></td>";
                                echo "<td>" . date('M d, Y H:i', strtotime($row['submitted_at'])) . "</td>";
                                echo "<td>";
                                echo "<form method='post' style='display: inline;'>";
                                echo "<input type='hidden' name='submission_id' value='" . $row['id'] . "'>";
                                echo "<select name='status' onchange='this.form.submit()'>";
                                echo "<option value='new'" . ($row['status'] == 'new' ? ' selected' : '') . ">New</option>";
                                echo "<option value='read'" . ($row['status'] == 'read' ? ' selected' : '') . ">Read</option>";
                                echo "<option value='responded'" . ($row['status'] == 'responded' ? ' selected' : '') . ">Responded</option>";
                                echo "</select>";
                                echo "<input type='hidden' name='update_status' value='1'>";
                                echo "</form>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='8' style='text-align: center; padding: 2rem;'>No submissions yet</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>

<?php
$conn->close();
?>