<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli('localhost', 'root', '', 'quanlinhahang'); // Đúng tên database

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Kết nối CSDL thất bại: ' . $conn->connect_error]);
    exit;
}

$fullname = $conn->real_escape_string($data['fullname']);
$phone = $conn->real_escape_string($data['phone']);
$position = $conn->real_escape_string($data['position']);
$status = 'active';

// Kiểm tra trùng số điện thoại
$check = $conn->query("SELECT * FROM staff_accounts WHERE phone='$phone'");
if ($check && $check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Số điện thoại đã tồn tại']);
    $conn->close();
    exit;
}

// Thêm nhân viên
$sql = "INSERT INTO staff_accounts (fullname, phone, position, status) VALUES ('$fullname', '$phone', '$position', '$status')";
if ($conn->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Thêm nhân viên thành công']);
} else {
    echo json_encode(['success' => false, 'message' => 'Thêm thất bại: ' . $conn->error]);
}
$conn->close();
?>