CREATE DATABASE IF NOT EXISTS `quanlinhahang`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;
USE `quanlinhahang`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlinhahang
-- ------------------------------------------------------
-- Server version	9.2.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(12, 2) NOT NULL,
  `total` decimal(12, 2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 74 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 111 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */
;
INSERT INTO `order_items`
<<<<<<< HEAD
VALUES (59, 37, 2, 1, 350000.00, 350000.00),
(60, 37, 11, 1, 150000.00, 150000.00),
(61, 37, 24, 1, 200000.00, 200000.00),
(62, 37, 21, 1, 120000.00, 120000.00),
(63, 37, 25, 1, 220000.00, 220000.00),
(64, 37, 35, 1, 180000.00, 180000.00),
(65, 37, 34, 1, 140000.00, 140000.00),
(66, 37, 40, 5, 20000.00, 100000.00),
(67, 37, 44, 2, 20000.00, 40000.00),
(69, 39, 4, 1, 380000.00, 380000.00),
(70, 40, 8, 1, 350000.00, 350000.00),
(71, 40, 6, 1, 300000.00, 300000.00),
(72, 40, 12, 1, 90000.00, 90000.00),
(73, 40, 40, 10, 20000.00, 200000.00);
=======
VALUES (78, 42, 1, 1, 400000.00, 400000.00),
  (79, 42, 11, 1, 150000.00, 150000.00),
  (80, 42, 16, 1, 65000.00, 65000.00),
  (81, 42, 24, 1, 200000.00, 200000.00),
  (82, 42, 21, 1, 120000.00, 120000.00),
  (83, 42, 44, 10, 20000.00, 200000.00),
  (84, 43, 1, 1, 400000.00, 400000.00),
  (86, 43, 12, 1, 90000.00, 90000.00),
  (87, 44, 1, 1, 430000.00, 430000.00),
  (88, 44, 11, 2, 150000.00, 150000.00),
  (89, 44, 44, 6, 20000.00, 120000.00),
  (90, 45, 3, 1, 320000.00, 320000.00),
  (91, 45, 10, 1, 80000.00, 80000.00),
  (92, 45, 25, 1, 220000.00, 220000.00),
  (93, 45, 26, 1, 150000.00, 150000.00),
  (94, 46, 53, 1, 450000.00, 450000.00),
  (95, 46, 27, 1, 170000.00, 170000.00),
  (96, 46, 31, 1, 120000.00, 120000.00),
  (97, 46, 36, 1, 160000.00, 160000.00),
  (98, 46, 33, 1, 150000.00, 150000.00),
  (99, 47, 9, 1, 320000.00, 320000.00),
  (100, 47, 19, 1, 75000.00, 75000.00),
  (101, 47, 21, 1, 120000.00, 120000.00),
  (102, 47, 23, 1, 190000.00, 190000.00),
  (103, 48, 2, 1, 400000.00, 400000.00),
  (106, 48, 36, 1, 160000.00, 160000.00),
  (107, 48, 44, 4, 20000.00, 80000.00),
  (108, 49, 1, 1, 430000.00, 430000.00),
  (109, 50, 3, 1, 320000.00, 320000.00),
  (110, 51, 12, 1, 90000.00, 90000.00);
>>>>>>> master
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `table_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(12, 2) NOT NULL,
  `status` enum('pending', 'in_progress', 'completed') DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 41 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 52 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */
;
INSERT INTO `orders`
VALUES (
<<<<<<< HEAD
    37,
    5,
    1,
    '2025-05-29 06:43:21',
    1500000.00,
    'in_progress'
  ),
(38, 5, 1, '2025-05-29 07:12:31', 380000.00, 'pending'),
(
    39,
    5,
    4,
    '2025-05-29 07:27:32',
    380000.00,
    'in_progress'
  ),
(
    40,
    5,
    15,
    '2025-05-29 15:30:51',
    940000.00,
    'in_progress'
=======
    42,
    5,
    3,
    '2025-06-07 05:31:44',
    1135000.00,
    'completed'
  ),
  (
    43,
    5,
    3,
    '2025-06-07 16:58:13',
    490000.00,
    'completed'
  ),
  (
    44,
    5,
    3,
    '2025-06-09 00:07:44',
    700000.00,
    'completed'
  ),
  (
    45,
    11,
    2,
    '2025-06-09 00:20:08',
    770000.00,
    'completed'
  ),
  (
    46,
    13,
    2,
    '2025-06-09 15:24:59',
    1050000.00,
    'completed'
  ),
  (
    47,
    5,
    1,
    '2025-06-09 15:34:25',
    705000.00,
    'completed'
  ),
  (
    48,
    5,
    2,
    '2025-06-13 13:31:54',
    1200000.00,
    'completed'
  ),
  (
    49,
    14,
    2,
    '2025-06-15 15:46:28',
    430000.00,
    'completed'
  ),
  (
    50,
    5,
    2,
    '2025-06-15 15:55:58',
    320000.00,
    'completed'
  ),
  (
    51,
    15,
    1,
    '2025-06-17 06:49:20',
    90000.00,
    'completed'
>>>>>>> master
  );
/*!40000 ALTER TABLE `orders` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `payment_method` enum('cash', 'online') NOT NULL,
  `amount` decimal(12, 2) NOT NULL,
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */
;
INSERT INTO `payments`
<<<<<<< HEAD
VALUES (7, 37, 'online', 1275000.00, '2025-05-29 06:45:21'),
(8, 39, 'online', 323000.00, '2025-05-29 07:28:28'),
(9, 40, 'online', 799000.00, '2025-05-29 15:31:56');
=======
VALUES (
    11,
    42,
    'online',
    964750.00,
    '2025-06-07 05:33:39'
  ),
  (12, 43, 'cash', 416500.00, '2025-06-07 16:58:50'),
  (
    13,
    44,
    'online',
    722500.00,
    '2025-06-09 00:09:30'
  ),
  (
    14,
    45,
    'online',
    731500.00,
    '2025-06-09 00:21:53'
  ),
  (15, 46, 'cash', 997500.00, '2025-06-09 15:25:53'),
  (
    16,
    47,
    'online',
    599250.00,
    '2025-06-09 15:36:01'
  ),
  (
    17,
    48,
    'online',
    544000.00,
    '2025-06-13 13:35:06'
  ),
  (18, 49, 'cash', 408500.00, '2025-06-15 15:47:08'),
  (
    19,
    50,
    'online',
    272000.00,
    '2025-06-17 06:13:57'
  ),
  (
    20,
    51,
    'online',
    85500.00,
    '2025-06-17 06:50:50'
  );
>>>>>>> master
/*!40000 ALTER TABLE `payments` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(12, 2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('available', 'out_of_stock') DEFAULT 'available',
  PRIMARY KEY (`product_id`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 52 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 54 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */
;
INSERT INTO `products`
VALUES (
    1,
    'Lẩu 4 ngăn',
    'Nồi lẩu với 4 ngăn chứa các loại nước dùng khác nhau, cho phép thưởng thức đa dạng vị cay, thanh, và ngọt trong cùng một bữa ăn.',
    'Lẩu',
<<<<<<< HEAD
    380000.00,
    './assets/img/products/lau-4-ngan.jpg',
    'available'
  ),
(
=======
    430000.00,
    'http://localhost/webnhahang/FE/assets/img/products/lau-4-ngan.jpg',
    'available'
  ),
  (
>>>>>>> master
    2,
    'Lẩu 3 ngăn',
    'Lẩu 3 ngăn phong cách Trung Hoa, với nước dùng cay, ngọt và thanh, kèm đa dạng nguyên liệu tươi ngon như thịt bò, đậu hũ và rau củ.',
    'Lẩu',
<<<<<<< HEAD
    350000.00,
    './assets/img/products/lau-3-ngan.jpg',
    'available'
  ),
(
=======
    400000.00,
    'http://localhost/webnhahang/FE/assets/img/products/lau-3-ngan.jpg',
    'available'
  ),
  (
>>>>>>> master
    3,
    'Lẩu thập cẩm',
    'Nồi lẩu thập cẩm nhiều loại nguyên liệu như hải sản, rau củ, nấm và thịt, nước dùng đậm đà thích hợp cho bữa ăn gia đình.',
    'Lẩu',
    320000.00,
    './assets/img/products/lau-thap-cam.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    4,
    'Lẩu bao tử bò',
    'Lẩu đặc trưng với bao tử bò cùng nước dùng cay nồng, dùng kèm nhiều loại rau và gia vị phong phú.',
    'Lẩu',
    380000.00,
    './assets/img/products/lau-bao-tu-bo.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    5,
    'Lẩu bao ngư',
    'Lẩu hải sản cao cấp với bao ngư, mực, tôm và các loại nấm, nước dùng thơm ngon đậm đà.',
    'Lẩu',
    420000.00,
    './assets/img/products/lau-bao-ngu.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    6,
    'Lẩu bò',
    'Lẩu truyền thống với nước dùng đậm đà và thịt bò thái lát mỏng, kèm rau tươi và đồ nhúng phong phú.',
    'Lẩu',
    300000.00,
    './assets/img/products/lau-bo.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    7,
    'Lẩu cá tầm',
    'Lẩu cá tầm thanh ngọt, kết hợp với rau củ tươi và gia vị đặc trưng, tạo nên hương vị độc đáo.',
    'Lẩu',
    390000.00,
    './assets/img/products/lau-ca-tam.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    8,
    'Lẩu Thái Tom Yum',
    'Lẩu Thái chua cay Tom Yum với hương thơm đặc trưng của sả, lá chanh và ớt, vị đậm đà kích thích vị giác.',
    'Lẩu',
    350000.00,
    './assets/img/products/lau-thai-tomyum.jpeg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    9,
    'Lẩu Thái nấm chay',
    'Lẩu Thái chay thanh nhẹ với các loại nấm tươi ngon và nước dùng chua cay đặc trưng.',
    'Lẩu',
    320000.00,
    './assets/img/products/lau-thai-nam-chay.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    10,
    'Súp bí ngô',
    ' Súp bí ngô mịn màng, thơm ngọt, trang trí dầu giấm balsamic và rau mùi tươi.',
    'Súp',
    80000.00,
    './assets/img/products/sup-bi-ngo.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    11,
    'Súp bào ngư hải sâm',
    'Súp hải sản thượng hạng với bào ngư, hải sâm và tôm tươi, nước dùng đậm đà.',
    'Súp',
    150000.00,
    './assets/img/products/sup-bao-ngu-hai-sam.jpeg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    12,
    'Súp hải sản',
    'Súp hải sản đa dạng với tôm, mực, nấm kim châm và rau củ tươi ngon.',
    'Súp',
    90000.00,
    './assets/img/products/sup-hai-san.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    13,
    'Súp su hào',
    'Súp su hào dịu nhẹ, kết hợp cùng thịt mềm và cà rốt, mang đến hương vị thanh thanh, bổ dưỡng và dễ ăn.',
    'Súp',
    80000.00,
    './assets/img/products/sup-su-hao.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    14,
    'Súp củ cải',
    'Súp củ cải trắng béo ngậy, điểm xuyến hạt hạch và dầu ô liu thơm lừng.',
    'Súp',
    85000.00,
    './assets/img/products/sup-cu-cai.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    15,
    'Đậu hũ xào nấm',
    'Đậu hũ chiên giòn xào cùng nấm tươi và rau củ, thơm ngon, đậm đà hương vị chay.',
    'Món chay',
    70000.00,
    './assets/img/products/chay-dau-hu-xao-nam.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    16,
    'Chả cuốn nấm',
    'Cuốn chay với bánh tráng mềm, nhân nấm và rau tươi, ăn kèm nước chấm chua ngọt đặc trưng.',
    'Món chay',
    65000.00,
    './assets/img/products/chay-cuon-nam.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    17,
    'Chả chiên quế chay',
    'Chả chay giòn bên ngoài, mềm dai bên trong, gia vị quế thơm nhẹ, phục vụ kèm nước mắm chay.',
    'Món chay',
    60000.00,
    './assets/img/products/chay-cha-que.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    18,
    'Bún trộn chay',
    'Bún trộn thanh đạm với rau củ, đậu hũ chiên, nấm và nước chấm đặc biệt.',
    'Món chay',
    70000.00,
    './assets/img/products/chay-bun-tron.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    19,
    'Bún riêu chay',
    'Món bún riêu chay với nước dùng chua nhẹ, đậu hũ, cà chua, và rau thơm tươi.',
    'Món chay',
    75000.00,
    './assets/img/products/chay-bun-rieu.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    20,
    'Bột chiên chay',
    'Bột chiên giòn, ăn kèm trứng, rau thơm và nước sốt cay đặc trưng.',
    'Món chay',
    65000.00,
    './assets/img/products/chay-bot-chien.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    21,
    'Cá hồi xông khói',
    'Cá hồi xông khói tươi ngon, ăn kèm kem phô mai và bánh quy giòn.',
    'Hải sản',
    120000.00,
    './assets/img/products/haisan-ca-hoi.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    22,
    'Tôm sú luộc rần thịt',
    'Tôm sú luộc chín tới, thịt chắc và ngọt, giữ nguyên hương vị biển.',
    'Hải sản',
    180000.00,
    './assets/img/products/haisan-tom_su_luot_ran_thit.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    23,
    'Tôm sú rang muối',
    'Tôm sú rang muối thơm phức, giòn rụm với lớp muối thấm đều.',
    'Hải sản',
    190000.00,
    './assets/img/products/haisan-tom-su-rang-muoi.jpeg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    24,
    'Tôm sú rang bơ tỏi',
    'Tôm sú rang bơ tỏi thơm lừng, béo ngậy và đậm đà hương vị.',
    'Hải sản',
    200000.00,
    './assets/img/products/haisan-tom-su-rang-bo-toi.jpeg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    25,
    'Cua luộc',
    'Cua luộc tươi ngon, thịt chắc, ăn kèm nước chấm chua cay đậm đà.',
    'Hải sản',
    220000.00,
    './assets/img/products/haisan-cua-luoc.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    26,
    'Hàu tươi sống',
    'Hàu tươi sống được trình bày đẹp mắt, kèm nước mắm chua cay đặc trưng.',
    'Hải sản',
    150000.00,
    './assets/img/products/haisan-hau.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    27,
    'Tôm chiên giòn',
    'Tôm chiên giòn vàng ruộm, thơm ngon, ăn kèm sốt mayonnaise đặc biệt.',
    'Hải sản',
    170000.00,
    './assets/img/products/haisan-tom-chien-gion.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    28,
    'Salad rau củ quả',
    'Salad tươi mát với các loại rau xanh và cà chua bi, hòa quyện cùng nước sốt đặc biệt.',
    'Rau',
    70000.00,
    './assets/img/products/rau-salad-ca-chua.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    29,
    'Salad xà lách',
    'Xà lách tươi giòn ăn kèm nước sốt kem thanh mát, thích hợp cho bữa ăn nhẹ và dinh dưỡng.',
    'Rau',
    65000.00,
    './assets/img/products/rau-salad-xa-lach.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    30,
    'Salad cà chua',
    'Cà chua đỏ mọng kết hợp với rau thơm, tạo nên món salad thanh đạm và dễ ăn.',
    'Rau',
    60000.00,
    './assets/img/products/rau-salad-cachua.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    31,
    'Salad tôm hùm',
    'Salad tươi ngon với tôm hùm kết hợp rau xanh, tạo hương vị đậm đà, sang trọng.',
    'Rau',
    120000.00,
    './assets/img/products/rau-salad-tomhum.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    32,
    'Rau su hào sợi',
    'Su hào bào sợi tươi ngon, trộn cùng nước sốt chua cay đặc trưng, món ăn thanh nhẹ, dễ tiêu.',
    'Rau',
    70000.00,
    './assets/img/products/rau-xu-hao-soi.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    33,
    'Heo nướng giòn da',
    'Thịt heo nướng giòn da, mềm mọng, thơm lừng với gia vị đậm đà.',
    'Món nướng',
    150000.00,
    './assets/img/products/nuong-heo-gion-bi.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    34,
    'Gà nướng thảo mộc',
    'Gà nướng ướp thảo mộc thơm phức, da vàng giòn, thịt mềm ngon.',
    'Món nướng',
    140000.00,
    './assets/img/products/nuong-ga.png',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    35,
    'Thịt cừu nướng',
    'Thịt cừu tươi nướng vừa chín tới, giữ nguyên vị ngọt tự nhiên và hương thơm đặc trưng.',
    'Món nướng',
    180000.00,
    './assets/img/products/nuong-thit-cuu.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    36,
    'Sườn heo nướng mật ong',
    'Sườn heo nướng mềm, thấm vị mật ong ngọt dịu, kết hợp nước sốt đặc biệt.',
    'Món nướng',
    160000.00,
    './assets/img/products/nuong-suon-heo.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    37,
    'Xúc xích nướng',
    'Xúc xích nướng vàng ươm, thơm ngon, ăn kèm bánh mì hoặc rau sống.',
    'Món nướng',
    90000.00,
    './assets/img/products/nuong-xuc-xich.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    38,
    'Thịt nướng rau củ',
    'Thịt nướng kết hợp cùng rau củ tươi ngon, thơm lừng và đầy màu sắc.',
    'Món nướng',
    140000.00,
    './assets/img/products/nuong-thit-rau-cu.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    39,
    'Sườn cừu nướng BBQ',
    'Sườn cừu nướng BBQ cay nhẹ, thấm đẫm gia vị, mềm và đậm đà hương vị.',
    'Món nướng',
    190000.00,
    './assets/img/products/nuong-suon-cuu.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    40,
    'Pepsi lon',
    'Nước ngọt Pepsi lon lạnh sảng khoái, giải khát nhanh chóng.',
    'Nước uống',
    20000.00,
    './assets/img/products/nuocuong-pepsi.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    41,
    'Trà đào chanh sả',
    'Trà đào thanh mát kết hợp chanh và sả thơm dịu, giải nhiệt ngày hè.',
    'Nước uống',
    35000.00,
    './assets/img/products/nuocuong-tra-dao-chanh-sa.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    42,
    'Soda chanh',
    'Soda chanh sủi tăm thơm mát, tươi ngon, kích thích vị giác.',
    'Nước uống',
    30000.00,
    './assets/img/products/nuonguong-soda-chanh.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    43,
    'Trà chanh',
    'Trà chanh truyền thống đậm đà, thơm nồng hương chanh tươi.',
    'Nước uống',
    25000.00,
    './assets/img/products/nuonguong-tra-chanh.jpg',
    'available'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    44,
    'Coca Cola lon',
    'Nước ngọt Coca Cola lon đặc trưng, vị ngọt đậm đà, kích thích vị giác.',
    'Nước uống',
    20000.00,
    './assets/img/products/nuocuong-coca.jpg',
    'available'
<<<<<<< HEAD
=======
  ),
  (
    53,
    'Combo 1',
    'Món gồm các món: 1 lẩu tứ xuyên, 1 phần trứng ốp la, 1 bánh hỏi , 1 cơm rang hải sản.',
    'Lẩu',
    450000.00,
    'http://localhost/webnhahang/FE/assets/img/products/contact.jpg',
    'available'
>>>>>>> master
  );
/*!40000 ALTER TABLE `products` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `ranks`
--

DROP TABLE IF EXISTS `ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `ranks` (
  `rank_id` int NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(50) NOT NULL,
  `discount` decimal(5, 2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`rank_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `ranks`
--

LOCK TABLES `ranks` WRITE;
/*!40000 ALTER TABLE `ranks` DISABLE KEYS */
;
INSERT INTO `ranks`
VALUES (1, 'Đồng', 5.00),
<<<<<<< HEAD
(2, 'Bạc', 10.00),
(3, 'Vàng', 15.00);
=======
  (2, 'Bạc', 10.00),
  (3, 'Vàng', 15.00);
>>>>>>> master
/*!40000 ALTER TABLE `ranks` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `staff_accounts`
--

DROP TABLE IF EXISTS `staff_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `staff_accounts` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `salary` decimal(12, 2) DEFAULT NULL,
  `status` enum('active', 'inactive') DEFAULT 'active',
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `phone` (`phone`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `staff_accounts`
--

LOCK TABLES `staff_accounts` WRITE;
/*!40000 ALTER TABLE `staff_accounts` DISABLE KEYS */
;
INSERT INTO `staff_accounts`
VALUES (
    1,
    '0868698389',
<<<<<<< HEAD
    '123456',
=======
    '$2y$10$Bfky3w6R30WN2ifkhUVpB.Pt2JmAnNFiMH.b3ltceKn17wnjS8EwK',
>>>>>>> master
    'Bùi Văn Huy',
    'admin',
    8000000.00,
    'active'
<<<<<<< HEAD
=======
  ),
  (
    7,
    '0396048599',
    '$2y$10$3t1MxnQmfhVOA3mUy1bY5.qf2y7.N3ASx5naM31yqGC2aOxWnsIB2',
    'Hoàng Mai Kiều',
    'Nhân viên',
    NULL,
    'active'
  ),
  (
    8,
    '0123456789',
    '$2y$10$g59vxQb0VJsWqUL0M/Hj/eOeALWG6LLZ2OUJ34iNaQRbI07IRM7xW',
    'Lê Thị Tuyết Băng ',
    'Nhân viên',
    NULL,
    'active'
  ),
  (
    10,
    '1234567890',
    '$2y$10$HFSrtJcIW7nYPA67vLh2z./v0DQqeOOiqRF80CGenGQRCJ47rrsAy',
    'Lê Trọng Kiên',
    'Nhân viên',
    NULL,
    'active'
>>>>>>> master
  );
/*!40000 ALTER TABLE `staff_accounts` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `tables` (
  `table_id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(100) NOT NULL,
  `status` enum('available', 'occupied', 'reserved') DEFAULT 'available',
  PRIMARY KEY (`table_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */
;
INSERT INTO `tables`
<<<<<<< HEAD
VALUES (1, 'Bàn 1', 'occupied'),
(2, 'Bàn 2', 'available'),
(3, 'Bàn 3', 'occupied'),
(4, 'Bàn 4', 'occupied'),
(5, 'Bàn 5', 'available'),
(6, 'Bàn 6', 'available'),
(7, 'Bàn 7', 'available'),
(8, 'Bàn 8', 'available'),
(9, 'Bàn 9', 'available'),
(10, 'Bàn 10', 'available'),
(11, 'Bàn 11', 'available'),
(12, 'Bàn 12', 'available'),
(13, 'Bàn 13', 'available'),
(14, 'Bàn 14', 'available'),
(15, 'Bàn 15', 'occupied');
=======
VALUES (1, 'Bàn 1', 'available'),
  (2, 'Bàn 2', 'available'),
  (3, 'Bàn 3', 'available'),
  (4, 'Bàn 4', 'available'),
  (5, 'Bàn 5', 'available'),
  (6, 'Bàn 6', 'available'),
  (7, 'Bàn 7', 'available'),
  (8, 'Bàn 8', 'available'),
  (9, 'Bàn 9', 'available'),
  (10, 'Bàn 10', 'available'),
  (11, 'Bàn 11', 'available'),
  (12, 'Bàn 12', 'available'),
  (13, 'Bàn 13', 'available'),
  (14, 'Bàn 14', 'available'),
  (15, 'Bàn 15', 'available');
>>>>>>> master
/*!40000 ALTER TABLE `tables` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `rank_id` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `phone` (`phone`),
  KEY `rank_id` (`rank_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rank_id`) REFERENCES `ranks` (`rank_id`)
<<<<<<< HEAD
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
=======
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
>>>>>>> master
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users`
VALUES (
    5,
    'Bùi Văn ',
    'Huy',
    '0868698389',
    3,
    '2025-05-16 08:04:17'
  ),
<<<<<<< HEAD
(
=======
  (
>>>>>>> master
    11,
    'Lê Thị Tuyết ',
    'Băng ',
    '0987654321',
    1,
    '2025-05-24 14:26:21'
<<<<<<< HEAD
=======
  ),
  (
    12,
    'Lê Thị Tuyết ',
    'Băng',
    '1472589021',
    1,
    '2025-06-09 00:04:47'
  ),
  (
    13,
    'Võ Thanh ',
    'Trúc',
    '0979025109',
    1,
    '2025-06-09 15:22:55'
  ),
  (
    14,
    'Bùi Văn ',
    'Kiên',
    '1234567890',
    1,
    '2025-06-15 15:45:50'
  ),
  (
    15,
    'Lê Trọng ',
    'Kiên',
    '0843335539',
    1,
    '2025-06-17 06:48:49'
>>>>>>> master
  );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
<<<<<<< HEAD
-- Dump completed on 2025-05-30 12:25:32
=======
-- Dump completed on 2025-06-17 14:12:42
>>>>>>> master
