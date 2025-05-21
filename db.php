<?php
$servername = "localhost";  
$username = "root";  // Username mặc định của XAMPP là `root`
$password = "";  // Nếu chưa đặt mật khẩu, để trống
$dbname = "one_food";  

// Kết nối MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra lỗi kết nối
if ($conn->connect_error) {  
    die("Kết nối thất bại: " . $conn->connect_error);  
}

// Thiết lập charset để tránh lỗi font tiếng Việt
$conn->set_charset("utf8mb4");
?>