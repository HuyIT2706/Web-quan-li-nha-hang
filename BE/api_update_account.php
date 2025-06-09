<?php
include 'database.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$staff_id = $data['staff_id'];
$phone = $data['phone'];
$password = $data['password'];
$fullname = $data['fullname'];
$position = $data['position'];
$status = $data['status'];

$sql = "UPDATE staff_accounts SET phone=?, password=?, fullname=?, position=?, status=? WHERE staff_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $phone, $password, $fullname, $position, $status, $staff_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cập nhật thành công!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Cập nhật thất bại!']);
}
?> 