<?php
include('database.php');  

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
    $firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    // check sdt trung khong
    $check_sdt = "SELECT * FROM users WHERE phone = '$phone'";
    $check_result = mysqli_query($conn, $check_sdt);
    if (mysqli_num_rows($check_result) > 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Số điện thoại đã được đăng ký. Vui lòng dùng số khác.'
        ]);
        exit;
    }
    // Nếu khong trùng thêm vào database
    $insert_sql = "INSERT INTO users (lastname, firstname, phone, rank_id) 
                   VALUES ('$lastname', '$firstname', '$phone', 1)";  
    if (mysqli_query($conn, $insert_sql)) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Đăng ký thành công! Vui lòng đăng nhập.'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Lỗi: ' . mysqli_error($conn)
        ]);
    }
}
?>
