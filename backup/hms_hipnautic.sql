-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2022 at 08:39 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hms_hipnautic`
--

-- --------------------------------------------------------

--
-- Table structure for table `additional_service`
--

CREATE TABLE `additional_service` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `service_id` int(11) NOT NULL,
  `userid` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_rooms`
-- (See below for the actual view)
--
CREATE TABLE `all_rooms` (
`id` int(11)
,`room_number` varchar(100)
,`room_occupancy` int(5)
,`room_rate` float
,`adtl_adult` float
,`adtl_kid` float
,`policy` varchar(255)
,`room_type` varchar(255)
,`bed` int(3)
,`photo` varchar(255)
,`room_description` varchar(255)
,`status_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `backup`
--

CREATE TABLE `backup` (
  `id` int(11) NOT NULL,
  `backup_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `userid` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `billing_list`
-- (See below for the actual view)
--
CREATE TABLE `billing_list` (
`id` int(11)
,`booking_id` varchar(12)
,`card_info` varchar(4)
,`street_add` varchar(255)
,`city_add` varchar(255)
,`zip_add` varchar(20)
,`currency` varchar(5)
,`total_amount` float
,`discount_id` int(11)
,`discount_total` float
,`date` datetime
,`payment_ref` varchar(255)
,`room_charge` varchar(100)
,`room_id` varchar(12)
,`room_number` varchar(100)
,`policy` varchar(255)
,`photo` varchar(255)
,`room_description` varchar(255)
,`date_from` date
,`date_to` date
,`nights` int(100)
,`guests` int(11)
,`fname` varchar(255)
,`mname` varchar(3)
,`lname` varchar(255)
,`status` varchar(100)
,`check_in` datetime
,`check_out` datetime
,`payment_method` varchar(255)
,`ref_id` varchar(255)
,`reservation_type` varchar(100)
,`status_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(12) NOT NULL,
  `reservation_type` varchar(100) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `nights` int(100) NOT NULL,
  `guests` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `mname` varchar(3) NOT NULL,
  `status` varchar(100) NOT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `street_add` varchar(255) NOT NULL,
  `city_add` varchar(255) NOT NULL,
  `zip_add` varchar(10) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `ref_id` varchar(255) NOT NULL,
  `userid` varchar(12) NOT NULL,
  `last_update` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `booking_list`
-- (See below for the actual view)
--
CREATE TABLE `booking_list` (
`id` int(12)
,`reservation_type` varchar(100)
,`room_id` varchar(255)
,`date_from` date
,`date_to` date
,`nights` int(100)
,`guests` int(11)
,`fullname` text
,`check_in` datetime
,`check_out` datetime
,`phone` varchar(12)
,`email` varchar(255)
,`gender` tinyint(1)
,`street_add` varchar(255)
,`city_add` varchar(255)
,`zip_add` varchar(10)
,`payment_method` varchar(255)
,`ref_id` varchar(255)
,`userid` varchar(12)
,`room_charge` varchar(100)
,`card_info` varchar(4)
,`currency` varchar(5)
,`billing_address` text
,`payment_ref` varchar(255)
,`total_amount` float
,`status_name` varchar(100)
,`date` datetime
,`employee_name` varchar(511)
);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `mname` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `userid` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fname`, `lname`, `mname`, `status`, `phone_number`, `email`, `position`, `userid`) VALUES
(1, 'test ', 'user', '1', 1, '099999999999', 'hipnauticresort@gmail.com', '1', '1'),
(3, 'Jara Wannie', 'Pacia', 'De Jesus', 1, '', '', '11', '3'),
(4, 'Joyce Ann', 'Quinones', 'Aguilar', 1, '', '', '12', '4');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `requestor` varchar(255) NOT NULL,
  `request_date` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `module` varchar(100) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userid` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `action`, `module`, `timestamp`, `userid`) VALUES
(1, 'Authentication', 'user login(verification sent) : test  1 user', '2022-01-10 06:40:49', '1'),
(2, 'Service Module', 'created a new Service/Facility, id : 1', '2022-01-10 06:50:10', '1'),
(3, 'Discount Module', 'created a new Discount, id : 1', '2022-01-10 06:52:19', '1'),
(4, 'User Management Module', 'created a new position : Receptionist', '2022-01-10 06:53:23', '1'),
(5, 'User Management Module', 'created a new position : Receptionist', '2022-01-10 06:54:18', '1'),
(6, 'User Management Module', 'created a new position : Manager', '2022-01-10 06:54:28', '1'),
(7, 'User Management Module', 'created a new access and employee : 3', '2022-01-10 06:55:23', '1'),
(8, 'User Management Module', 'created a new access and employee : 4', '2022-01-10 06:56:06', '1'),
(9, 'Service Module', 'created a new Service/Facility, id : 2', '2022-01-10 07:00:39', '1'),
(10, 'Service Module', 'created a new Service/Facility, id : 3', '2022-01-10 07:01:07', '1'),
(11, 'Service Module', 'created a new Service/Facility, id : 4', '2022-01-10 07:01:23', '1'),
(12, 'Service Module', 'created a new Service/Facility, id : 5', '2022-01-10 07:01:38', '1'),
(13, 'Discount Module', 'created a new Discount, id : 2', '2022-01-10 07:02:14', '1'),
(14, 'Authentication', 'user login(verification sent) : Jara Wannie De Jesus Pacia', '2022-01-10 07:04:52', '3'),
(15, 'Room Management Module', 'created a new room category, id : 3', '2022-01-10 07:21:42', '3'),
(16, 'Room Management Module', 'created a new room category, id : 4', '2022-01-10 07:22:30', '3'),
(17, 'Room Management Module', 'created a new room category, id : 5', '2022-01-10 07:23:14', '3'),
(18, 'Room Management Module', 'created a new room category, id : 6', '2022-01-10 07:24:28', '3'),
(19, 'Room Management Module', 'created a new room category, id : 7', '2022-01-10 07:25:07', '3'),
(20, 'Room Management Module', 'created a new room category, id : 8', '2022-01-10 07:28:00', '3');

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL,
  `promo_code` varchar(255) NOT NULL,
  `validity` date NOT NULL,
  `discount_rate` varchar(10) NOT NULL,
  `discount_limit` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `promo_code`, `validity`, `discount_rate`, `discount_limit`, `created_by`, `date_created`) VALUES
(1, 'Valentines', '2022-02-14', '100', NULL, 1, '2022-01-10 14:52:19'),
(2, 'Summer', '2022-03-31', '300', NULL, 1, '2022-01-10 15:02:14');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_number` varchar(100) NOT NULL,
  `room_type` varchar(12) NOT NULL,
  `room_occupancy` int(5) NOT NULL,
  `status` varchar(12) NOT NULL,
  `room_rate` float NOT NULL,
  `adtl_adult` float NOT NULL,
  `adtl_kid` float NOT NULL,
  `policy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `room_type`, `room_occupancy`, `status`, `room_rate`, `adtl_adult`, `adtl_kid`, `policy`) VALUES
(1, 'Full Resort Reservation', '1', 20, '3', 900, 0, 0, 'No Cancellation');

-- --------------------------------------------------------

--
-- Table structure for table `room_feature`
--

CREATE TABLE `room_feature` (
  `id` int(11) NOT NULL,
  `room_id` varchar(12) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `room_status`
--

CREATE TABLE `room_status` (
  `id` int(11) NOT NULL,
  `status_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_status`
--

INSERT INTO `room_status` (`id`, `status_name`, `description`) VALUES
(1, 'RESERVED', NULL),
(2, 'CHECK-IN', NULL),
(3, 'AVAILABLE', NULL),
(4, 'CANCELLED', NULL),
(5, 'CHECK-OUT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `room_description` varchar(255) DEFAULT NULL,
  `bed` int(3) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `category`, `room_description`, `bed`, `photo`) VALUES
(1, 'Full Resort Reservation', 'Resort reservation with amenities and facilities', 10, 'uploads/05ab9cd6afbd9bbee15c6261a204ddecaba21973.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_cost` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_cost`, `date_created`, `status`) VALUES
(1, 'Towel', 50, '2022-01-10 14:50:10', 1),
(2, 'Bedsheet', 60, '2022-01-10 15:00:39', 1),
(3, 'Blanket', 70, '2022-01-10 15:01:07', 1),
(4, 'Pillow', 40, '2022-01-10 15:01:23', 1),
(5, 'Bed', 150, '2022-01-10 15:01:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `booking_id` varchar(12) NOT NULL,
  `date` datetime NOT NULL,
  `room_id` varchar(12) NOT NULL,
  `room_charge` varchar(100) NOT NULL,
  `card_info` varchar(4) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `street_add` varchar(255) NOT NULL,
  `city_add` varchar(255) NOT NULL,
  `zip_add` varchar(20) NOT NULL,
  `payment_ref` varchar(255) NOT NULL,
  `total_amount` float NOT NULL,
  `discount_total` float DEFAULT NULL,
  `discount_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pword` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `vkey` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `created_by` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `pword`, `role`, `status`, `vkey`, `date_created`, `last_login`, `created_by`) VALUES
(1, 'hipnauticresort@gmail.com', '$2y$10$TkuRHgisCReLm6vg2HW9muvAioDDEfnjpi0gxqNuy3f33RWYY1JI.', 1, 1, NULL, '2021-12-08 13:40:50', '2021-12-08 06:40:27', '1'),
(3, 'jarawanniepacia@gmail.com', '$2y$10$mYJUnrsba1AOvUgVLhJgPOU22vVYU/vh1ogGeITYgMB81jvQXPRuO', 11, 1, NULL, '2022-01-10 14:55:23', NULL, '1'),
(4, 'quinonesjoyceann11@gmail.com', '$2y$10$/I7RD5YzwEDXtnB.4A/HFuuq4GR1yFDCTZusnCtIbaj479sCUH/aa', 12, 1, NULL, '2022-01-10 14:56:06', NULL, '1');

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_access`
-- (See below for the actual view)
--
CREATE TABLE `user_access` (
`id` int(12)
,`email` varchar(255)
,`pword` varchar(255)
,`status` tinyint(1)
,`role` int(11)
,`created_by` varchar(12)
,`date_created` datetime
,`fname` varchar(255)
,`lname` varchar(255)
,`mname` varchar(255)
,`position` varchar(255)
,`position_name` varchar(255)
,`priv` varchar(255)
,`userid` varchar(12)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `priv` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_by` varchar(12) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `position`, `type`, `priv`, `status`, `created_by`, `date_created`) VALUES
(1, 'System Admin', 'admin', 'transaction,maintenance,utility,reports', 1, '1', '2021-10-04 22:06:58'),
(11, 'Receptionist', NULL, 'transaction,maintenance,reports', 1, '1', '2022-01-10 14:54:18'),
(12, 'Manager', NULL, 'transaction,maintenance,reports', 1, '1', '2022-01-10 14:54:28');

-- --------------------------------------------------------

--
-- Structure for view `all_rooms`
--
DROP TABLE IF EXISTS `all_rooms`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `all_rooms`  AS SELECT `a`.`id` AS `id`, `a`.`room_number` AS `room_number`, `a`.`room_occupancy` AS `room_occupancy`, `a`.`room_rate` AS `room_rate`, `a`.`adtl_adult` AS `adtl_adult`, `a`.`adtl_kid` AS `adtl_kid`, `a`.`policy` AS `policy`, `b`.`category` AS `room_type`, `b`.`bed` AS `bed`, `b`.`photo` AS `photo`, `b`.`room_description` AS `room_description`, `c`.`status_name` AS `status_name` FROM ((`rooms` `a` left join `room_types` `b` on(`a`.`room_type` = `b`.`id`)) left join `room_status` `c` on(`a`.`status` = `c`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `billing_list`
--
DROP TABLE IF EXISTS `billing_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `billing_list`  AS SELECT `a`.`id` AS `id`, `a`.`booking_id` AS `booking_id`, `a`.`card_info` AS `card_info`, `a`.`street_add` AS `street_add`, `a`.`city_add` AS `city_add`, `a`.`zip_add` AS `zip_add`, `a`.`currency` AS `currency`, `a`.`total_amount` AS `total_amount`, `a`.`discount_id` AS `discount_id`, `a`.`discount_total` AS `discount_total`, `a`.`date` AS `date`, `a`.`payment_ref` AS `payment_ref`, `a`.`room_charge` AS `room_charge`, `a`.`room_id` AS `room_id`, `b`.`room_number` AS `room_number`, `b`.`policy` AS `policy`, `b`.`photo` AS `photo`, `b`.`room_description` AS `room_description`, `c`.`date_from` AS `date_from`, `c`.`date_to` AS `date_to`, `c`.`nights` AS `nights`, `c`.`guests` AS `guests`, `c`.`fname` AS `fname`, `c`.`mname` AS `mname`, `c`.`lname` AS `lname`, `c`.`status` AS `status`, `c`.`check_in` AS `check_in`, `c`.`check_out` AS `check_out`, `c`.`payment_method` AS `payment_method`, `c`.`ref_id` AS `ref_id`, `c`.`reservation_type` AS `reservation_type`, `d`.`status_name` AS `status_name` FROM (((`transactions` `a` left join `all_rooms` `b` on(`b`.`id` = `a`.`room_id`)) left join `booking` `c` on(`c`.`id` = `a`.`booking_id`)) left join `room_status` `d` on(`c`.`status` = `d`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `booking_list`
--
DROP TABLE IF EXISTS `booking_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `booking_list`  AS SELECT `a`.`id` AS `id`, `a`.`reservation_type` AS `reservation_type`, `a`.`room_id` AS `room_id`, `a`.`date_from` AS `date_from`, `a`.`date_to` AS `date_to`, `a`.`nights` AS `nights`, `a`.`guests` AS `guests`, concat(`a`.`fname`,' ',`a`.`mname`,' ',`a`.`lname`) AS `fullname`, `a`.`check_in` AS `check_in`, `a`.`check_out` AS `check_out`, `a`.`phone` AS `phone`, `a`.`email` AS `email`, `a`.`gender` AS `gender`, `a`.`street_add` AS `street_add`, `a`.`city_add` AS `city_add`, `a`.`zip_add` AS `zip_add`, `a`.`payment_method` AS `payment_method`, `a`.`ref_id` AS `ref_id`, `a`.`userid` AS `userid`, `b`.`room_charge` AS `room_charge`, `b`.`card_info` AS `card_info`, `b`.`currency` AS `currency`, concat(`b`.`street_add`,' ',`b`.`city_add`,' ',`b`.`zip_add`) AS `billing_address`, `b`.`payment_ref` AS `payment_ref`, `b`.`total_amount` AS `total_amount`, `c`.`status_name` AS `status_name`, `b`.`date` AS `date`, concat(`d`.`fname`,' ',`d`.`lname`) AS `employee_name` FROM (((`booking` `a` left join `transactions` `b` on(`a`.`id` = `b`.`booking_id`)) left join `room_status` `c` on(`a`.`status` = `c`.`id`)) left join `employee` `d` on(`a`.`userid` = `d`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `user_access`
--
DROP TABLE IF EXISTS `user_access`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_access`  AS   (select `t1`.`id` AS `id`,`t1`.`email` AS `email`,`t1`.`pword` AS `pword`,`t1`.`status` AS `status`,`t1`.`role` AS `role`,`t1`.`created_by` AS `created_by`,`t1`.`date_created` AS `date_created`,`t2`.`fname` AS `fname`,`t2`.`lname` AS `lname`,`t2`.`mname` AS `mname`,`t2`.`position` AS `position`,`t3`.`position` AS `position_name`,`t3`.`priv` AS `priv`,`t2`.`userid` AS `userid` from ((`user` `t1` left join `employee` `t2` on(`t1`.`id` = `t2`.`userid`)) left join `user_role` `t3` on(`t1`.`role` = `t3`.`id`)))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additional_service`
--
ALTER TABLE `additional_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `backup`
--
ALTER TABLE `backup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_feature`
--
ALTER TABLE `room_feature`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_status`
--
ALTER TABLE `room_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additional_service`
--
ALTER TABLE `additional_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `backup`
--
ALTER TABLE `backup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `room_feature`
--
ALTER TABLE `room_feature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_status`
--
ALTER TABLE `room_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
