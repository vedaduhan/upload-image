-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 06:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `imagesharing`
--

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `upload_id` int(20) NOT NULL,
  `upload_file_name` varchar(11) DEFAULT NULL,
  `upload_path` varchar(250) DEFAULT NULL,
  `upload_path_org` varchar(250) DEFAULT NULL,
  `upload_auther_id` int(20) NOT NULL,
  `upload_author` varchar(50) NOT NULL,
  `upload_description` varchar(250) DEFAULT NULL,
  `last_updated_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) DEFAULT 1 COMMENT 'active for 1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uploads`
--

INSERT INTO `uploads` (`upload_id`, `upload_file_name`, `upload_path`, `upload_path_org`, `upload_auther_id`, `upload_author`, `upload_description`, `last_updated_on`, `status`) VALUES
(9, '01dd7b0fa6f', '/uploads/resized/01dd7b0fa6f2aac44ebfbb2d0f7040d2.jpg', '/uploads/01dd7b0fa6f2aac44ebfbb2d0f7040d2.jpg', 0, 'Alex', 'ss', '2024-04-14 11:40:05', 1),
(10, '7386e999a1a', '/uploads/resized/7386e999a1a267c363dda81e467b7ad0.jpg', '/uploads/7386e999a1a267c363dda81e467b7ad0.jpg', 0, 'Chiara', 'ss', '2024-04-14 12:00:13', 1),
(11, 'petertuete_', '/uploads/resized/petertuete_Cute_easter_bunny_painting_eggs_disney_c1dc5878-cfe2-4990-9514-bd0ffd789d42.png', '/uploads/petertuete_Cute_easter_bunny_painting_eggs_disney_c1dc5878-cfe2-4990-9514-bd0ffd789d42.png', 0, 'Sally', 'B', '2024-04-14 12:08:28', 1),
(12, 'out_0 (1).p', '/uploads/resized/out_0 (1).png', '/uploads/out_0 (1).png', 0, 'Elliot', 'l', '2024-04-14 12:29:12', 1),
(13, '8-hqnG0rDu2', '/uploads/resized/8-hqnG0rDu2v2TmYF.png', '/uploads/8-hqnG0rDu2v2TmYF.png', 0, 'Veda', 'something new', '2024-04-17 15:37:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `created_on` timestamp NULL DEFAULT current_timestamp(),
  `last_updated_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='userData';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `created_on`, `last_updated_on`) VALUES
(5, 'Sally', 'sally@gmail.com', '$2b$10$OptQHfMmzMv4uer7JNampe.mjpCqDL8sXX/.2hnLqkIQ8XcmBGfG2', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Alex', 'alex@gmail.com', '$2b$10$/tXmTvo3QYVTT5upUR3jRuGS3ykLQrzCgh7UbB7esj7ioh4P9aAhG', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Veda', 'duhanv@tcd.ie', '$2b$10$rctI9GKvajPAA/t615QTAuZ95haTnggbsk7vfCdI78m911jpEo4e.', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`upload_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `upload_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
