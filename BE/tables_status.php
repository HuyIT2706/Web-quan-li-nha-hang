<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['table_id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$table_id = intval($data['table_id']);
$status = trim($data['status']);

$valid_status = ['available', 'occupied', 'reserved'];
if (!in_array($status, $valid_status)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid status value']);
    exit;
}

require_once 'database.php'; // file của bạn, đã tạo $conn

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$sql = "UPDATE tables SET status = ? WHERE table_id = ?";

$stmt = mysqli_prepare($conn, $sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Prepare statement failed']);
    exit;
}

mysqli_stmt_bind_param($stmt, 'si', $status, $table_id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['success' => true, 'message' => 'Table status updated']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update table status']);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
