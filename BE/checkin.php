<?php
session_start();
header('Content-Type: application/json');

// Kiểm tra đăng nhập
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Chưa đăng nhập',
        'logged_in' => false,
    ]);
    exit;
}

// Kiểm tra chọn bàn
if (!isset($_SESSION['selected_table_id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Chưa chọn bàn',
        'logged_in' => true,
        'table_selected' => false,
    ]);
    exit;
}

// Nếu đã đăng nhập và đã chọn bàn
echo json_encode([
    'status' => 'success',
    'message' => 'Đã đăng nhập và chọn bàn',
    'logged_in' => true,
    'table_selected' => true,
    'user_id' => $_SESSION['user_id'],
    'table_id' => $_SESSION['selected_table_id']
]);
