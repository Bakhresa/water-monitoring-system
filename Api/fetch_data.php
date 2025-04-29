<?php
header('Content-Type: application/json');
include 'connect.php';

// Fetch latest 7 records for chart
$sql = 'SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 7';
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>