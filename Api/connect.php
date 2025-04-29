<?php
$host = 'localhost';
$user = 'root'; // Default XAMPP MySQL user
$pass = '';     // Default XAMPP MySQL password (empty)
$db = 'water_monitoring';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>