<?php
include('database.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $sql = "SELECT * FROM users WHERE phone = '$phone'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) == 1) {
        // Lấy thông tin người dùng
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['lastname'] = $user['lastname'];
        $_SESSION['firstname'] = $user['firstname'];
        $_SESSION['rank_id'] = $user['rank_id'];
        $_SESSION['user'] = $user;

        echo json_encode([
            'status' => 'success',
            'message' => 'Đăng nhập thành công!',
            'redirect' => '../FE/index-login.html'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Số điện thoại không tồn tại. Vui lòng kiểm tra lại!'
        ]);
    }
}

