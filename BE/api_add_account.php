<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$phone = $data['phone'];
$password = $data['password'];
$fullname = $data['fullname'];
$position = $data['position'];
$status = $data['status'];

$sql = "INSERT INTO staff_accounts (phone, password, fullname, position, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $phone, $password, $fullname, $position, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Thêm nhân viên thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Thêm thất bại!']);
}
?> 