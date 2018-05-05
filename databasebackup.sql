-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: geochat
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.17.10.1

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (14,52.447111,-1.414307,55.535694,9.854521,11,93,0,'TEXT','Hello Denmark','','2018-04-15 17:53:18','2018-04-15 17:53:18',1),(15,43.515577,0.403592,55.750341,37.614317,11,93,0,'TEXT','Helloa','','2018-04-15 20:16:17','2018-04-15 20:16:17',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (93,11,'test-session-key','mGtAKQP8zP',9999999999,'2018-03-31 14:35:29','2018-03-31 14:35:29',1),(106,11,'WmOkf-4gahz-MaPyd-pgO7c-6r5kL-eIubH','laRUbJRthr',1522970828,'2018-04-03 23:27:08','2018-04-03 23:27:08',0),(107,11,'lokjN-oQKiV-SPgZh-FdjLF-qiWX3-Rjfkl','uR8L5c5WiT',1522970839,'2018-04-03 23:27:19','2018-04-03 23:27:19',0),(108,11,'Y5pzy-wGF0V-mp23L-L6Epd-VndLT-SctEF','pnJuMLozNn',1522970856,'2018-04-03 23:27:36','2018-04-03 23:27:36',0),(109,11,'HlADP-Sawl2-mIYTq-YpnXF-9iSWJ-kBhIQ','4WmJlWUUbt',1522970862,'2018-04-03 23:27:42','2018-04-03 23:27:42',0),(110,11,'jhjN5-3U08d-6SWIh-SKNrH-1VqVT-RQWpg','F4CEwMLzgo',1523717770,'2018-04-12 14:56:10','2018-04-12 14:56:10',0),(111,11,'xfWO3-OeceI-tV9QC-MAyyw-b6bSo-2KAtp','VKGhh8qjP9',1523717780,'2018-04-12 14:56:20','2018-04-12 14:56:20',0),(112,11,'6Cpp4-2gtnp-t9o5R-EUj3h-IAqGO-OawjQ','RT0bF5VtDk',1523795331,'2018-04-13 12:28:51','2018-04-13 12:28:51',0),(113,11,'reQJN-689KR-dOo7S-BBv38-lWJOb-pqSrE','F7A6P7693A',1523795366,'2018-04-13 12:29:26','2018-04-13 12:29:26',0),(114,11,'gMcbK-LrnvI-pSDNi-nWsE0-0EBvM-9JopF','Nbp71S4qqp',1523795881,'2018-04-13 12:38:01','2018-04-13 12:38:01',0),(115,11,'leDLu-tWUk6-VvLGG-HMJP9-gDngr-xLZJY','eIh5vTRfUv',1523798404,'2018-04-13 13:20:04','2018-04-13 13:20:04',1),(116,11,'G5Boo-vthZa-AskLc-sq3f2-1CopD-ibb50','YwuaEFFZbW',1523972817,'2018-04-15 13:46:57','2018-04-15 13:46:57',1),(117,11,'Q0tKE-e8Cnf-PB6aU-OCfah-UcUSe-WNTUe','GJO2neuFoa',1523981546,'2018-04-15 16:12:26','2018-04-15 16:12:26',1),(118,11,'f788n-xmXru-mbHrn-ANwIL-x2TVA-TyKMB','vat6KwrCrw',1523982628,'2018-04-15 16:30:28','2018-04-15 16:30:28',1),(119,11,'N2CCD-mjZt7-mtZ38-ewWdk-TKogM-sCBxq','HkPI8SKYZb',1523995270,'2018-04-15 20:01:10','2018-04-15 20:01:10',1),(120,11,'m2EVO-IjLKs-qT4Qw-njWVD-XdvIf-h1AEZ','qxiqHAe7bc',1523995271,'2018-04-15 20:01:11','2018-04-15 20:01:11',1),(121,11,'UHNdp-YLPQy-UvDdG-I0qgj-udFZm-oLsZb','uRuEl9DPGP',1523995803,'2018-04-15 20:10:03','2018-04-15 20:10:03',1),(122,11,'JORm0-iv9rD-WOFav-yfap4-bF9iz-DaG9G','xoGZfyPQrj',1523995833,'2018-04-15 20:10:33','2018-04-15 20:10:33',1),(123,11,'HsYNX-Q2bNn-XTmqw-MozeT-grPNL-Pt9h2','45QKfWaify',1523995837,'2018-04-15 20:10:37','2018-04-15 20:10:37',1),(124,11,'4zweL-wYklC-9YqeW-b2uWi-zOeej-adOMt','Sc5oSsK7j8',1523997338,'2018-04-15 20:35:38','2018-04-15 20:35:38',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Martin','Shaw','thirdyearproject@martinshaw.co','$2a$12$.g3DTPvGfIQ.vCmEw2cUj.e6h4VqrxjJNr6s15s4ME5AEQ12p53.C','2018-03-31 13:55:55','2018-03-31 13:55:55',1);
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

-- Dump completed on 2018-05-05 16:51:44
