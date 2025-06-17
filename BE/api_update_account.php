<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$staff_id = $data['staff_id'];
$phone = $data['phone'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$fullname = $data['fullname'];
$position = $data['position'];
$status = $data['status'];

// Kiểm tra trùng SĐT (trừ chính mình)
$checkSql = "SELECT staff_id FROM staff_accounts WHERE phone = ? AND staff_id != ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("si", $phone, $staff_id);
$checkStmt->execute();
$checkStmt->store_result();
if ($checkStmt->num_rows > 0) {
    echo json_encode(['error' => false, 'message' => 'SĐT đã có trong danh sách nhân viên!']);
    exit();
}

$sql = "UPDATE staff_accounts SET phone=?, password=?, fullname=?, position=?, status=? WHERE staff_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $phone, $password, $fullname, $position, $status, $staff_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Cập nhật thất bại!']);
}
?> 