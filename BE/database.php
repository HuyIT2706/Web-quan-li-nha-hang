<?php
$servername = "localhost";   
$username = "root";           
$password = "";               
$dbname = "quanlinhahang";       

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}
?>
