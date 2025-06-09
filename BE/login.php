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

        // Lấy thông tin rank và discount
        $rankQuery = "SELECT rank_name, discount FROM ranks WHERE rank_id = " . $user['rank_id'];
        $rankResult = mysqli_query($conn, $rankQuery);
        $rankInfo = mysqli_fetch_assoc($rankResult);

        // Kiểm tra xem có thông tin bàn trong URL không
        $tableId = $_POST['table'] ?? null;
        $isReserve = $_POST['reserve'] ?? false;

        if ($tableId) {
            if ($isReserve) {
                // Nếu là đặt bàn, chuyển hướng đến trang đặt bàn
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Đăng nhập thành công!',
                    'user_id' => $user['user_id'],
                    'rank_name' => $rankInfo['rank_name'],
                    'discount' => $rankInfo['discount'],
                    'redirect' => '../FE/index-login.html?table=' . $tableId . '&reserve=true'
                ]);
            } else {
                // Nếu là chọn bàn, lưu vào session và chuyển hướng về trang chủ
                $_SESSION['selected_table_id'] = $tableId;
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Đăng nhập thành công!',
                    'user_id' => $user['user_id'],
                    'rank_name' => $rankInfo['rank_name'],
                    'discount' => $rankInfo['discount'],
                    'redirect' => '../FE/index-login.html'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'success',
                'message' => 'Đăng nhập thành công!',
                'user_id' => $user['user_id'],
                'rank_name' => $rankInfo['rank_name'],
                'discount' => $rankInfo['discount'],
                'redirect' => '../FE/index-login.html'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Số điện thoại không tồn tại. Vui lòng kiểm tra lại!'
        ]);
    }
}

