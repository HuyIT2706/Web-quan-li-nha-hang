<?php
<<<<<<< HEAD
$servername = "localhost";   
$username = "root";           
$password = "12345678";               
$dbname = "quanlinhahang";       
=======
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "quanlinhahang";
>>>>>>> master

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
<<<<<<< HEAD
}
?>
=======
}
>>>>>>> master
