-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: geochat
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `origin_lat` decimal(10,6) DEFAULT NULL,
  `origin_long` decimal(11,6) DEFAULT NULL,
  `recipient_lat` decimal(10,6) DEFAULT NULL,
  `recipient_long` decimal(11,6) DEFAULT NULL,
  `user_id` int(20) DEFAULT NULL,
  `session_id` int(20) DEFAULT NULL,
  `is_anonymaus` tinyint(1) DEFAULT '0',
  `message_type` text,
  `contents` text,
  `contents_extra` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (14,52.447111,-1.414307,55.535694,9.854521,17,93,0,'TEXT','Hello Denmark','','2018-04-15 17:53:18','2018-04-15 17:53:18',0),(15,43.515577,0.403592,55.750341,37.614317,17,93,0,'TEXT','Helloa','','2018-04-15 20:16:17','2018-04-15 20:16:17',0),(16,53.471931,-2.239127,53.471890,-2.238941,18,93,0,'TEXT','Hello, I\'m in John Dalton. Is anyone going to the Cafeteria?','','2018-05-25 07:33:25','2018-05-25 07:33:25',1),(17,53.471810,-2.240219,53.471809,-2.240262,17,93,0,'TEXT','Yes, I\'m in the Cafeteria now. Come over.','','2018-05-25 07:35:06','2018-05-25 07:35:06',1),(18,53.471867,-2.239602,53.471882,-2.239496,19,93,0,'TEXT','Have any of you finished the assignment? I need some help!','','2018-05-25 07:38:12','2018-05-25 07:38:12',1),(19,53.471870,-2.239047,53.471909,-2.239063,18,93,0,'TEXT','Jake, if you need some help. Come and meet with me and Martin in the cafeteria! :)','','2018-05-25 07:38:53','2018-05-25 07:38:53',1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(20) DEFAULT NULL,
  `session_key` text,
  `next` text,
  `timeout` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (93,17,'test-session-key','mGtAKQP8zP',9999999999,'2018-03-31 14:35:29','2018-03-31 14:35:29',1),(172,17,'VxptZ-EsPRw-sw3kC-JPsRw-gsZtE-H3hOC','UAjzceMXl8',1527377213,'2018-05-24 23:26:53','2018-05-24 23:26:53',1),(173,17,'zVfpN-mOhez-yvpvR-qn7Tn-N8HPj-lvXts','t62NFpV7vU',1527402315,'2018-05-25 06:25:15','2018-05-25 06:25:15',1),(174,17,'4vGbm-9oO7p-hWo82-dESVP-c2LHq-orl4T','wNAKiXwawG',1527402317,'2018-05-25 06:25:17','2018-05-25 06:25:17',1),(175,17,'XU1wj-xWg9a-5Tvcl-iYnRX-DrQP6-CfAdX','aQggbwb0En',1527403016,'2018-05-25 06:36:56','2018-05-25 06:36:56',1),(176,17,'eE7t0-C319z-2ZXGB-16ZfS-df548-KF6wG','HFQOlbC3pf',1527405357,'2018-05-25 07:15:57','2018-05-25 07:15:57',1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` tinytext NOT NULL,
  `last_name` tinytext NOT NULL,
  `email_address` tinytext NOT NULL,
  `password` tinytext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Martin','Shaw','thirdyearproject@martinshaw.co','$2a$12$lPk0oHoq2IRdySHSpcDKnOANkvEXngslCsKqZ/N2.XGjygLdQwAOS','2018-05-24 22:29:27','2018-05-24 22:29:27',1),(18,'Alex','Shaw','alex@martinshaw.co','$2a$12$Lqyu558F4n6Ek9tUXvU46uFljPTdzB81S9pvLd3MxX7/o27Nm2.I2','2018-05-25 07:30:03','2018-05-25 07:30:03',1),(19,'Jake','Cairns','jcairns@hotmail.com','$2a$12$Lqyu558F4n6Ek9tUXvU46uFljPTdzB81S9pvLd3MxX7/o27Nm2.I2','2018-05-25 07:36:54','2018-05-25 07:36:54',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-25  8:41:00
