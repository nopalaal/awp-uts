-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2025 at 05:29 PM
-- Server version: 8.0.43
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mudjarap`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `idEvent` int NOT NULL,
  `namaAcara` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `tempat` varchar(255) NOT NULL,
  `deskripsi` text,
  `idProgram` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventgambar`
--

CREATE TABLE `eventgambar` (
  `idGambar` int NOT NULL,
  `idEvent` int NOT NULL,
  `urlGambar` varchar(255) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventpartner`
--

CREATE TABLE `eventpartner` (
  `idEventPartner` int NOT NULL,
  `idEvent` int NOT NULL,
  `idMediaPartner` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galeri`
--

CREATE TABLE `galeri` (
  `idGaleri` int NOT NULL,
  `idUser` int NOT NULL,
  `tipeContent` enum('Foto','Video','Lagu') NOT NULL,
  `urlContent` varchar(255) NOT NULL,
  `deskripsi` text,
  `tanggalPost` datetime DEFAULT CURRENT_TIMESTAMP,
  `idProgram` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interest`
--

CREATE TABLE `interest` (
  `idUser` int NOT NULL,
  `interest` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mediapartner`
--

CREATE TABLE `mediapartner` (
  `idMediaPartner` int NOT NULL,
  `namaMediaPartner` varchar(100) NOT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  `websiteUrl` varchar(255) DEFAULT NULL,
  `kontakEmail` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `idProgram` int NOT NULL,
  `namaProgram` varchar(100) NOT NULL,
  `deskripsiProgram` text,
  `idManager` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `idTask` int NOT NULL,
  `namaTask` varchar(255) NOT NULL,
  `deskripsi` text,
  `urlContent` varchar(255) DEFAULT NULL,
  `tanggalMulai` datetime NOT NULL,
  `tanggalAkhir` datetime NOT NULL,
  `status` enum('Pending','In Progress','Selesai','Revisi') NOT NULL DEFAULT 'Pending',
  `idManager` int NOT NULL,
  `idAdmin` int DEFAULT NULL,
  `tanggalPenyelesaianAktual` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `gender` enum('Pria','Wanita','Lainnya') DEFAULT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `role` enum('admin','manager','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`idEvent`),
  ADD KEY `fk_event_program` (`idProgram`);

--
-- Indexes for table `eventgambar`
--
ALTER TABLE `eventgambar`
  ADD PRIMARY KEY (`idGambar`),
  ADD KEY `idEvent` (`idEvent`);

--
-- Indexes for table `eventpartner`
--
ALTER TABLE `eventpartner`
  ADD PRIMARY KEY (`idEventPartner`),
  ADD UNIQUE KEY `idEvent` (`idEvent`,`idMediaPartner`),
  ADD KEY `idMediaPartner` (`idMediaPartner`);

--
-- Indexes for table `galeri`
--
ALTER TABLE `galeri`
  ADD PRIMARY KEY (`idGaleri`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `fk_galeri_program` (`idProgram`);

--
-- Indexes for table `interest`
--
ALTER TABLE `interest`
  ADD PRIMARY KEY (`idUser`,`interest`),
  ADD KEY `idUser_idx` (`idUser`);

--
-- Indexes for table `mediapartner`
--
ALTER TABLE `mediapartner`
  ADD PRIMARY KEY (`idMediaPartner`),
  ADD UNIQUE KEY `namaMediaPartner` (`namaMediaPartner`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`idProgram`),
  ADD UNIQUE KEY `namaProgram` (`namaProgram`),
  ADD KEY `idManager` (`idManager`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`idTask`),
  ADD KEY `idManager` (`idManager`),
  ADD KEY `idAdmin` (`idAdmin`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `idEvent` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eventgambar`
--
ALTER TABLE `eventgambar`
  MODIFY `idGambar` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eventpartner`
--
ALTER TABLE `eventpartner`
  MODIFY `idEventPartner` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galeri`
--
ALTER TABLE `galeri`
  MODIFY `idGaleri` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mediapartner`
--
ALTER TABLE `mediapartner`
  MODIFY `idMediaPartner` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `idProgram` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `idTask` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `nama`, `tanggalLahir`, `email`, `domisili`, `gender`, `photo_profile`, `role`) VALUES
(1, 'admin', '$2b$10$XqJz4mKtJE/iEKHVFvDL9eGqSKI5rYO8RyJfXP4XqP5YYJPVqJ8M2', 'Administrator', '1990-01-01', 'admin@mudjarap.com', 'Jakarta', 'Pria', NULL, 'admin'),
(2, 'manager', '$2b$10$XqJz4mKtJE/iEKHVFvDL9eGqSKI5rYO8RyJfXP4XqP5YYJPVqJ8M2', 'Manager User', '1995-05-15', 'manager@mudjarap.com', 'Bandung', 'Wanita', NULL, 'manager'),
(3, 'user', '$2b$10$XqJz4mKtJE/iEKHVFvDL9eGqSKI5rYO8RyJfXP4XqP5YYJPVqJ8M2', 'Regular User', '2000-12-25', 'user@mudjarap.com', 'Surabaya', 'Pria', NULL, 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `eventgambar`
--
ALTER TABLE `eventgambar`
  ADD CONSTRAINT `eventgambar_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `eventpartner`
--
ALTER TABLE `eventpartner`
  ADD CONSTRAINT `eventpartner_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eventpartner_ibfk_2` FOREIGN KEY (`idMediaPartner`) REFERENCES `mediapartner` (`idMediaPartner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `galeri`
--
ALTER TABLE `galeri`
  ADD CONSTRAINT `fk_galeri_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `galeri_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `interest`
--
ALTER TABLE `interest`
  ADD CONSTRAINT `fk_interest_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`idManager`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`idManager`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
