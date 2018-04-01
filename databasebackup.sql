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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (92,12,'RR4tO-Sj94S-kdltA-fwswQ-TGqxy-dDgDn','nPfZZNlD2F',1522506900,'2018-03-31 13:56:22','2018-03-31 13:56:22',0),(93,11,'test-session-key','mGtAKQP8zP',9999999999,'2018-03-31 14:35:29','2018-03-31 14:35:29',1),(94,11,'OaESm-h1FNB-0gVst-erbkm-ABKvM-US6Ir','mk09ecnujw',1522695989,'2018-03-31 19:06:29','2018-03-31 19:06:29',1),(95,11,'jUoTi-bEhFY-2gpfn-2w0L5-MS00t-b32kX','e3rKyX49Ya',1522696291,'2018-03-31 19:11:32','2018-03-31 19:11:32',1),(96,11,'nN0tN-Mbzdo-Ifh2s-goE7Q-QNoUj-hMnBK','NtqOGShuOL',1522696325,'2018-03-31 19:12:05','2018-03-31 19:12:05',1),(97,11,'vindi-vI47I-sGfZx-O4rEd-O0bf6-sqe6d','gl2kec2Hy4',1522696329,'2018-03-31 19:12:09','2018-03-31 19:12:09',1),(98,11,'JoK14-JxNdB-9zlOJ-4DziD-2fbG3-yn45r','AUI2gP7kvo',1522697725,'2018-03-31 19:35:25','2018-03-31 19:35:25',1),(99,11,'syAVN-wF1bs-51LSK-ffiis-pCJ89-HxLDz','yN5Lc0PHp4',1522698115,'2018-03-31 19:41:55','2018-03-31 19:41:55',1),(100,11,'7lyUT-AErkE-BPKry-3qCMa-W2lFC-WneoX','T5hx3UmkWA',1522698641,'2018-03-31 19:50:41','2018-03-31 19:50:41',1),(101,11,'wIlx6-jJp9q-pvRL1-qtNah-IL3Tl-SPf2t','mJczERUNV8',1522699656,'2018-03-31 20:07:36','2018-03-31 20:07:36',1);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Martin','Shaw','thirdyearproject@martinshaw.co','$2a$12$.g3DTPvGfIQ.vCmEw2cUj.e6h4VqrxjJNr6s15s4ME5AEQ12p53.C','2018-03-31 13:55:55','2018-03-31 13:55:55');
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

-- Dump completed on 2018-04-01 14:15:42
