<?php
header('Content-Type: application/json');
include('database.php');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Nhận dữ liệu từ FE
$data = json_decode(file_get_contents('php://input'), true);
$phone = isset($data['phone']) ? $conn->real_escape_string($data['phone']) : '';
$user_password = isset($data['password']) ? $conn->real_escape_string($data['password']) : '';

if (empty($phone) || empty($user_password)) {
    echo json_encode(["success" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit();
}

// Truy vấn kiểm tra thông tin đăng nhập
$sql = "SELECT * FROM staff_accounts WHERE phone = '$phone' AND password = '$user_password'  AND status = 'active' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "message" => "Đăng nhập thành công!",
        "position" => $row['position'],
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Thông tin đăng nhập không đúng hoặc bạn không có quyền truy cập!"]);
}

$conn->close(); 