-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: mudjarap
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `idEvent` int NOT NULL AUTO_INCREMENT,
  `namaAcara` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `tempat` varchar(255) NOT NULL,
  `deskripsi` text,
  `idProgram` int DEFAULT NULL,
  PRIMARY KEY (`idEvent`),
  KEY `fk_event_program` (`idProgram`),
  CONSTRAINT `fk_event_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventgambar`
--

DROP TABLE IF EXISTS `eventgambar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventgambar` (
  `idGambar` int NOT NULL AUTO_INCREMENT,
  `idEvent` int NOT NULL,
  `urlGambar` varchar(255) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idGambar`),
  KEY `idEvent` (`idEvent`),
  CONSTRAINT `eventgambar_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventgambar`
--

LOCK TABLES `eventgambar` WRITE;
/*!40000 ALTER TABLE `eventgambar` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventgambar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventpartner`
--

DROP TABLE IF EXISTS `eventpartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventpartner` (
  `idEventPartner` int NOT NULL AUTO_INCREMENT,
  `idEvent` int NOT NULL,
  `idMediaPartner` int NOT NULL,
  PRIMARY KEY (`idEventPartner`),
  UNIQUE KEY `idEvent` (`idEvent`,`idMediaPartner`),
  KEY `idMediaPartner` (`idMediaPartner`),
  CONSTRAINT `eventpartner_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventpartner_ibfk_2` FOREIGN KEY (`idMediaPartner`) REFERENCES `mediapartner` (`idMediaPartner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventpartner`
--

LOCK TABLES `eventpartner` WRITE;
/*!40000 ALTER TABLE `eventpartner` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventpartner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeri`
--

DROP TABLE IF EXISTS `galeri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeri` (
  `idGaleri` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `tipeContent` enum('Foto','Video','Lagu') NOT NULL,
  `urlContent` varchar(255) NOT NULL,
  `deskripsi` text,
  `tanggalPost` datetime DEFAULT CURRENT_TIMESTAMP,
  `idProgram` int DEFAULT NULL,
  PRIMARY KEY (`idGaleri`),
  KEY `idUser` (`idUser`),
  KEY `fk_galeri_program` (`idProgram`),
  CONSTRAINT `fk_galeri_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `galeri_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeri`
--

LOCK TABLES `galeri` WRITE;
/*!40000 ALTER TABLE `galeri` DISABLE KEYS */;
/*!40000 ALTER TABLE `galeri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interest`
--

DROP TABLE IF EXISTS `interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interest` (
  `idUser` int NOT NULL,
  `interest` varchar(225) NOT NULL,
  PRIMARY KEY (`idUser`,`interest`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `fk_interest_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interest`
--

LOCK TABLES `interest` WRITE;
/*!40000 ALTER TABLE `interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediapartner`
--

DROP TABLE IF EXISTS `mediapartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mediapartner` (
  `idMediaPartner` int NOT NULL AUTO_INCREMENT,
  `namaMediaPartner` varchar(100) NOT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  `websiteUrl` varchar(255) DEFAULT NULL,
  `kontakEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idMediaPartner`),
  UNIQUE KEY `namaMediaPartner` (`namaMediaPartner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediapartner`
--

LOCK TABLES `mediapartner` WRITE;
/*!40000 ALTER TABLE `mediapartner` DISABLE KEYS */;
/*!40000 ALTER TABLE `mediapartner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `idProgram` int NOT NULL AUTO_INCREMENT,
  `namaProgram` varchar(100) NOT NULL,
  `deskripsiProgram` text,
  `idManager` int DEFAULT NULL,
  PRIMARY KEY (`idProgram`),
  UNIQUE KEY `namaProgram` (`namaProgram`),
  KEY `idManager` (`idManager`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`idManager`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `idTask` int NOT NULL AUTO_INCREMENT,
  `namaTask` varchar(255) NOT NULL,
  `deskripsi` text,
  `urlContent` varchar(255) DEFAULT NULL,
  `tanggalMulai` datetime NOT NULL,
  `tanggalAkhir` datetime NOT NULL,
  `status` enum('Pending','In Progress','Selesai','Revisi') NOT NULL DEFAULT 'Pending',
  `idEmployee` int NOT NULL,
  `idAdmin` int DEFAULT NULL,
  `tanggalPenyelesaianAktual` datetime DEFAULT NULL,
  PRIMARY KEY (`idTask`),
  KEY `idManager` (`idEmployee`),
  KEY `idAdmin` (`idAdmin`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`idEmployee`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `gender` enum('Pria','Wanita','Lainnya') DEFAULT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `role` enum('admin','employee','user') DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2b$10$SAq9zk0A6zlZyrgUJwDiT.2gFQxwVf1HKV.ueqEkg6Ufrh6wxPFtG','Administrator','1990-01-01','admin@mudjarap.com','Jakarta','Pria',NULL,'admin'),(2,'manager','$2b$10$SAq9zk0A6zlZyrgUJwDiT.2gFQxwVf1HKV.ueqEkg6Ufrh6wxPFtG','Manager User','1995-05-15','manager@mudjarap.com','Bandung','Wanita',NULL,'employee'),(3,'user','$2b$10$SAq9zk0A6zlZyrgUJwDiT.2gFQxwVf1HKV.ueqEkg6Ufrh6wxPFtG','Regular User','2000-12-25','user@mudjarap.com','Surabaya','Pria',NULL,'user'),(4,'user1','$2b$10$nYNjVUdsmgeg/1JoxTL9..AUUx7.959r6p.fIUxGUQrNoQKo1xnB6','User Demo 1','1998-08-02','user1@example.com','Tangerang Selatan','Pria',NULL,'user'),(5,'user2','$2b$10$HS6oFY708Nm1/8VNVcsCJulI7jt2WwCgc4xbW2qMDDTl1NZ8C.CdC','User Demo 2','1999-01-01','user2@example.com','Jakarta Pusat','Pria',NULL,'user'),(6,'user3','$2b$10$uGrQvpFOcVK6uX79B5.FyuBBP5iPe/durfk1.CRaRYIQ3TVKwWIZa','User Demo 3','1991-05-01','user3@example.com','Jakarta Pusat','Wanita',NULL,'user'),(7,'user4','$2b$10$zIS4QZOEeAb3afK83swrNuAqxvc9VKvnQv8rnN2keehqqE4e5RSzK','User Demo 4','1998-07-10','user4@example.com','Jakarta Selatan','Wanita',NULL,'user'),(8,'user5','$2b$10$ovOFBCXIAqYBs18S/1TrqOYJBleAz8vNBk8ThdUhgpKPBVmTwmyLq','User Demo 5','1996-04-06','user5@example.com','Bekasi','Pria',NULL,'user'),(9,'user6','$2b$10$si7emCUtZYnbRZ9tZRPqcOFy8yI5.RLvlAtMmJJj/7lJ1G9V18CoC','User Demo 6','1994-06-05','user6@example.com','Jakarta Barat','Pria',NULL,'user'),(10,'user7','$2b$10$uKgQv0GKhd6dpadDhp/jHOzVNEfjjEk4tee/O.b0DYdVsC8nBPJpC','User Demo 7','1999-08-05','user7@example.com','Tangerang Selatan','Wanita',NULL,'user'),(11,'user8','$2b$10$VLRNQjuMEoWJpDNBymH7yuJcAT.vbF0O7uAY3.hh/DyHsbAf1OP8O','User Demo 8','1998-07-13','user8@example.com','Jakarta Selatan','Pria',NULL,'user'),(12,'user9','$2b$10$kNUsf5PsbkZOU/bzOLegSOK4QyWwTBvYANWXaE/leET169YSASfNq','User Demo 9','1996-03-03','user9@example.com','Jakarta Timur','Wanita',NULL,'user'),(13,'user10','$2b$10$E5aNzx2ftU..hYMIRe5a3ujqFx0XwvOic.q/UuOLoJHCgTFutgcV6','User Demo 10','1992-02-16','user10@example.com','Jakarta Timur','Pria',NULL,'user'),(14,'user11','$2b$10$M1..LxDxWrjJL5.ZOg13.Of6s/7Dm1uy2NPlZGfUn0LGLKWEvovUG','User Demo 11','1998-08-14','user11@example.com','Bogor','Wanita',NULL,'user'),(15,'user12','$2b$10$eidf2PDleXgLvVNvpKtj4uKkmWiBSqTjvi4j8.jZA.T3DLHl0oxu.','User Demo 12','1993-04-14','user12@example.com','Depok','Wanita',NULL,'user'),(16,'user13','$2b$10$23.iokw3Gi.dJ0RvdR4QEOgsx181pElFn8iUrIA4T96OHn2GBaztq','User Demo 13','1993-06-20','user13@example.com','Bekasi','Wanita',NULL,'user'),(17,'user14','$2b$10$/pGjdagpOjA8Iq3HUmR12OPQOzmtTXLSj6HTTHxOdKMlpQWf4HTGe','User Demo 14','1997-05-04','user14@example.com','Depok','Pria',NULL,'user'),(18,'user15','$2b$10$Tw9BwWF5b9Sx6Q9iee4qCed9JADRna058dH0lDWPBjpwPV2opTWTC','User Demo 15','1998-03-09','user15@example.com','Bogor','Pria',NULL,'user'),(19,'user16','$2b$10$mpt3gQL4bjU1cyOiW8MAReWkHGFBfALdn0M9YTg7pDYz35pXVmTDq','User Demo 16','1997-08-09','user16@example.com','Jakarta Utara','Wanita',NULL,'user'),(20,'user17','$2b$10$0hF1uXlsVB4/lGtke6t0OOSNYW9Ze2boEsYvvJA8ZyKUdEWjfm8Fa','User Demo 17','1998-03-15','user17@example.com','Jakarta Timur','Wanita',NULL,'user'),(21,'user18','$2b$10$ERMDnZ/L74CrkM.Y5Fctuu3OHu6hmoAZHS8Fw9Or.2BqU4j6xzgDO','User Demo 18','1991-03-06','user18@example.com','Bogor','Wanita',NULL,'user'),(22,'user19','$2b$10$xy8zWmDyktJYa9CeLYIJMeTtWs1RBiKZv/WKaF0D.UMAjR6rgQEBq','User Demo 19','1990-02-21','user19@example.com','Jakarta Timur','Pria',NULL,'user'),(23,'user20','$2b$10$7yaF3kTN7CDx1FKqp9RyEuXLux7ZghqheOs92BtOqsb6ukYIs0By6','User Demo 20','1996-06-01','user20@example.com','Jakarta Pusat','Pria',NULL,'user'),(24,'user21','$2b$10$aX81ZzDO0pz2vWZBROe6eej4PyziAsdSeLcrdF16oTKUzTNxR3OYa','User Demo 21','1992-01-13','user21@example.com','Jakarta Timur','Pria',NULL,'user'),(25,'user22','$2b$10$Vvho6hNLqwXXQpZeM3Ro/u1akT0mL7QnCqgmHGux9xIP7Agt4XcUK','User Demo 22','1990-02-14','user22@example.com','Jakarta Pusat','Wanita',NULL,'user'),(26,'user23','$2b$10$AxZaKJP2icYJ/MH35SxIYe4m3NFR8Jik9QFHv6XvVng5fIYxJSBk6','User Demo 23','1998-07-11','user23@example.com','Jakarta Timur','Pria',NULL,'user'),(27,'user24','$2b$10$o82Eqcr4PZyKtLtD3rB6cu7Xxu2DhAjO.lgzs/WUFz2lrur/LvAEy','User Demo 24','1994-05-26','user24@example.com','Jakarta Timur','Pria',NULL,'user'),(28,'user25','$2b$10$Y351Kc4CiH5hyu6CwWguS.U6W6A5ZDnqLWJOC2kq45mwznLaBvIRW','User Demo 25','1994-03-06','user25@example.com','Jakarta Barat','Pria',NULL,'user'),(29,'user26','$2b$10$kRSQbIqeov9tSdK/hVJgiuE8tcq0wiwDEEoNL0chRByMPvMdfnloO','User Demo 26','1999-07-21','user26@example.com','Jakarta Timur','Wanita',NULL,'user'),(30,'user27','$2b$10$S5fCfXiOjLJrnOBDG19doefz91/WNBmlaJCAEvQ/bBMmpq/fbfwwK','User Demo 27','1993-07-25','user27@example.com','Depok','Wanita',NULL,'user'),(31,'user28','$2b$10$Vb/9Cmner5HqwW89UThjpO8U3.WeMQ6dAmrGuOccS4w.afMR5Ep6a','User Demo 28','1991-09-22','user28@example.com','Tangerang Selatan','Pria',NULL,'user'),(32,'user29','$2b$10$fkkBjmXI8pahhSPXd.ZFGeVad1e/UXBiwALDzlGgiNRNG5Z1ma9hi','User Demo 29','1991-06-27','user29@example.com','Jakarta Pusat','Pria',NULL,'user'),(33,'user30','$2b$10$3KGkos0hLSLcO2Op0c6MOOWJSyF9mSaYNPFSJAKhMCx5ubjc4/8Se','User Demo 30','1994-02-05','user30@example.com','Jakarta Timur','Wanita',NULL,'user'),(34,'user31','$2b$10$IBK0apXVkCnD93l7LPy5L.TTPmhilJJw9FWxNUNjvsqu.xLwkkkYS','User Demo 31','1993-04-13','user31@example.com','Jakarta Selatan','Wanita',NULL,'user'),(35,'user32','$2b$10$uptdT/vuOCeu3nV5YKcpQ.Mwdq9oNTN6NcrvG2Hyaa/fEQnIbinpO','User Demo 32','1990-01-25','user32@example.com','Bekasi','Wanita',NULL,'user'),(36,'user33','$2b$10$8R/nVO16Z2LuE.2QeZKgIuRMHY.G0fEC3mUER//fwgcTR65ahl2aO','User Demo 33','1993-04-17','user33@example.com','Jakarta Timur','Wanita',NULL,'user'),(37,'user34','$2b$10$wg2d0nRG54cLt73b/1vKqOyILKSwQ/Sh1EFbDzcUhVpNJMKtZMHom','User Demo 34','1999-01-11','user34@example.com','Jakarta Utara','Wanita',NULL,'user'),(38,'user35','$2b$10$Eol7PSsKtWAndohAv4wsgey6A1P/x7CgGLd4X5.sDOSiLd9MW.c5q','User Demo 35','1990-01-01','user35@example.com','Jakarta Utara','Wanita',NULL,'user'),(39,'user36','$2b$10$Cjp1NtFbfzQv6VJw68Np1uiMz5TCUaaPz6GU1LgkQZXIKxX0jbanS','User Demo 36','1998-06-18','user36@example.com','Bogor','Wanita',NULL,'user'),(40,'user37','$2b$10$Tvir2FmccSoFEWgg37She.qsd3jrYgUgFnki476G6EnqMKZwmHh9W','User Demo 37','1997-02-25','user37@example.com','Jakarta Timur','Pria',NULL,'user'),(41,'user38','$2b$10$ydZ2SSla783vVHM50FmIcuwQQ2M0LBrZwQqxmPBINjmVYFywVgAPG','User Demo 38','1994-05-07','user38@example.com','Tangerang','Pria',NULL,'user'),(42,'user39','$2b$10$.BhW5RKV97a8Jfm5PMEvmOizF5zAjK52SF0uzMoEYJk.rZ0o6p/Du','User Demo 39','1994-03-07','user39@example.com','Tangerang','Wanita',NULL,'user'),(43,'user40','$2b$10$56vCqwQqfvxZuhqw3YPnZOlkXaTQwcZC9NwlNaf1vy01J.9yGeeC.','User Demo 40','1993-08-15','user40@example.com','Bekasi','Pria',NULL,'user'),(44,'user41','$2b$10$G6SZV0e9K.K4LWhHMwq4jOWQTXdorQo3bfvHuwg3ctjugn9R/E7LW','User Demo 41','1990-04-25','user41@example.com','Jakarta Selatan','Pria',NULL,'user'),(45,'user42','$2b$10$3oYt5uSfbVFMdtWZyP9Wpu.IQ/c/YqYRy1nPxpoEEk6fJvuimOltK','User Demo 42','1993-08-10','user42@example.com','Bekasi','Pria',NULL,'user'),(46,'user43','$2b$10$CjiVhOwabC0aC4U.cAZpZO8mCLyvfYoDklfvpSq2FesOkSlzw1coW','User Demo 43','1998-09-25','user43@example.com','Tangerang Selatan','Pria',NULL,'user'),(47,'user44','$2b$10$UI93ouodD7jc5jmoZiGM8ObOfA7LOuIiN0Gal.BVoLVTEhdezWtiS','User Demo 44','1991-05-08','user44@example.com','Jakarta Pusat','Pria',NULL,'user'),(48,'user45','$2b$10$FEy8UjHwUl7WxpdFzHEHcO7hP8Urv//mpPUe/KkUlvKHtHSdcXfFC','User Demo 45','1990-07-11','user45@example.com','Tangerang Selatan','Wanita',NULL,'user'),(49,'user46','$2b$10$GrwWuFROVIc8ew6tp1L.RuFU30n6yhWq7A7hGnVU7E1oi3HTpoYYu','User Demo 46','1998-02-02','user46@example.com','Tangerang Selatan','Wanita',NULL,'user'),(50,'user47','$2b$10$j.Lgk58kZqvLOYfFiHpCNOHnp0VQswpbh0zUs6hxL2/dIM2lAqzFm','User Demo 47','1996-03-21','user47@example.com','Jakarta Utara','Wanita',NULL,'user'),(51,'user48','$2b$10$XbmZq95LOPOr7bJ./Tr1z.Q2JWO1glr1GpEEchkkGbxWnhKQOLfgS','User Demo 48','1997-01-11','user48@example.com','Bogor','Pria',NULL,'user'),(52,'user49','$2b$10$l1wLJmFFNECoNnWLnYtch.vKFUXBBP2kDHr0FLOgPqOIwL24p79KW','User Demo 49','1994-08-12','user49@example.com','Bogor','Pria',NULL,'user'),(53,'user50','$2b$10$CvvXQ.aHqWwhdvB1xEdHguCMV/ae6QoS2gCjvlPkJmtoMyt0MqHk2','User Demo 50','1997-03-05','user50@example.com','Jakarta Pusat','Pria',NULL,'user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 21:34:02
