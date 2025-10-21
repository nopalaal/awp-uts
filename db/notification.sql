-- Create notification table
CREATE TABLE IF NOT EXISTS `notification` (
  `idNotification` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('task','event','system') NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `relatedId` int(11) DEFAULT NULL COMMENT 'ID of related task/event',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idNotification`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
