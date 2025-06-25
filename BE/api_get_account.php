<?php
include 'database.php'; 
header('Content-Type: application/json');

$sql = "SELECT staff_id, phone, fullname, position, salary, status FROM staff_accounts";
$result = $conn->query($sql);

$accounts = [];
while ($row = $result->fetch_assoc()) {
    $accounts[] = $row;
}

echo json_encode($accounts);
?>