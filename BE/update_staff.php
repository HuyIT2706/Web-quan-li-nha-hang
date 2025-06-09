<?php
header('Content-Type: application/json');
include('database.php');

// Tạo kết nối PDO thay vì mysqli
try {
    $pdo = new PDO("mysql:host=localhost:3307;dbname=quanlinhahang;charset=utf8", "root", "bangbang");
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Kết nối PDO thất bại: ' . $e->getMessage()]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['staff_id'])) {
    echo json_encode(['status'=>'error','message'=>'Thiếu staff_id']);
    exit;
}

$staff_id = (int)$input['staff_id'];
$fullname = $input['fullname'] ?? '';
$phone = $input['phone'] ?? '';
$position = $input['position'] ?? '';
$status = $input['status'] ?? 'inactive';

try {
    $stmt = $pdo->prepare("UPDATE staff_accounts SET fullname=?, phone=?, position=?, status=? WHERE staff_id=?");
    $stmt->execute([$fullname, $phone, $position, $status, $staff_id]);
    echo json_encode(['status'=>'ok']);
} catch (PDOException $e) {
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
