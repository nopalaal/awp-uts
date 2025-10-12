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

CREATE DATABASE IF NOT EXISTS `mudjarap` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

USE `mudjarap`;

-- --------------------------------------------------------

CREATE TABLE `event` (
  `idEvent` int NOT NULL AUTO_INCREMENT,
  `namaAcara` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL,
  `tempat` varchar(255) NOT NULL,
  `deskripsi` text,
  `idProgram` int DEFAULT NULL,
  PRIMARY KEY (`idEvent`),
  KEY `fk_event_program` (`idProgram`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `eventgambar` (
  `idGambar` int NOT NULL AUTO_INCREMENT,
  `idEvent` int NOT NULL,
  `urlGambar` varchar(255) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idGambar`),
  KEY `idEvent` (`idEvent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `eventpartner` (
  `idEventPartner` int NOT NULL AUTO_INCREMENT,
  `idEvent` int NOT NULL,
  `idMediaPartner` int NOT NULL,
  PRIMARY KEY (`idEventPartner`),
  UNIQUE KEY `idEvent` (`idEvent`,`idMediaPartner`),
  KEY `idMediaPartner` (`idMediaPartner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  KEY `fk_galeri_program` (`idProgram`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `interest` (
  `idUser` int NOT NULL,
  `interest` varchar(225) NOT NULL,
  PRIMARY KEY (`idUser`,`interest`),
  KEY `idUser_idx` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `mediapartner` (
  `idMediaPartner` int NOT NULL AUTO_INCREMENT,
  `namaMediaPartner` varchar(100) NOT NULL,
  `logoUrl` varchar(255) DEFAULT NULL,
  `websiteUrl` varchar(255) DEFAULT NULL,
  `kontakEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idMediaPartner`),
  UNIQUE KEY `namaMediaPartner` (`namaMediaPartner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `program` (
  `idProgram` int NOT NULL AUTO_INCREMENT,
  `namaProgram` varchar(100) NOT NULL,
  `deskripsiProgram` text,
  `idManager` int DEFAULT NULL,
  PRIMARY KEY (`idProgram`),
  UNIQUE KEY `namaProgram` (`namaProgram`),
  KEY `idManager` (`idManager`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `task` (
  `idTask` int NOT NULL AUTO_INCREMENT,
  `namaTask` varchar(255) NOT NULL,
  `deskripsi` text,
  `urlContent` varchar(255) DEFAULT NULL,
  `tanggalMulai` datetime NOT NULL,
  `tanggalAkhir` datetime NOT NULL,
  `status` enum('Pending','In Progress','Selesai','Revisi') NOT NULL DEFAULT 'Pending',
  `idManager` int NOT NULL,
  `idAdmin` int DEFAULT NULL,
  `tanggalPenyelesaianAktual` datetime DEFAULT NULL,
  PRIMARY KEY (`idTask`),
  KEY `idManager` (`idManager`),
  KEY `idAdmin` (`idAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `gender` enum('Pria','Wanita','Lainnya') DEFAULT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `role` enum('admin','manager','user') NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- FOREIGN KEYS
-- --------------------------------------------------------

ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `eventgambar`
  ADD CONSTRAINT `eventgambar_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `eventpartner`
  ADD CONSTRAINT `eventpartner_ibfk_1` FOREIGN KEY (`idEvent`) REFERENCES `event` (`idEvent`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eventpartner_ibfk_2` FOREIGN KEY (`idMediaPartner`) REFERENCES `mediapartner` (`idMediaPartner`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `galeri`
  ADD CONSTRAINT `fk_galeri_program` FOREIGN KEY (`idProgram`) REFERENCES `program` (`idProgram`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `galeri_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `interest`
  ADD CONSTRAINT `fk_interest_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`idManager`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`idManager`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`idAdmin`) REFERENCES `user` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;
