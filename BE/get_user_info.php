<?php
session_start();
include 'database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Chưa đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT u.lastname, u.firstname, u.phone, r.rank_name 
        FROM users u 
        JOIN ranks r ON u.rank_id = r.rank_id 
        WHERE u.user_id = $user_id";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'name' => $row['lastname'] . ' ' . $row['firstname'],
        'phone' => $row['phone'],
        'rank' => $row['rank_name']
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Không tìm thấy người dùng']);
}
?>