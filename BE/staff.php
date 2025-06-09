<?php
header('Content-Type: application/json');
include('database.php');

// Câu truy vấn
$sql = "SELECT staff_id, fullname, phone, position, salary, status FROM staff_accounts";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    exit;
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode(['status' => 'ok', 'data' => $data]);
?>

