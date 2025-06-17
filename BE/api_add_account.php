<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$phone = $data['phone'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$fullname = $data['fullname'];
$position = $data['position'];
$status = $data['status'];

// Kiểm tra trùng SĐT
$checkSql = "SELECT staff_id FROM staff_accounts WHERE phone = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $phone);
$checkStmt->execute();
$checkStmt->store_result();
if ($checkStmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'SĐT đã có trong danh sách nhân viên!']);
    exit();
}

$sql = "INSERT INTO staff_accounts (phone, password, fullname, position, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $phone, $password, $fullname, $position, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Thêm nhân viên thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Thêm thất bại!']);
}
?> 