-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 08-Set-2021 às 05:28
-- Versão do servidor: 10.1.36-MariaDB
-- versão do PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dgusto`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `authority`
--

CREATE TABLE `authority` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `authority`
--

INSERT INTO `authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_USER');

-- --------------------------------------------------------

--
-- Estrutura da tabela `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `username`) VALUES
(1, 'admin@localhost.com', 'Admin', '$2a$10$z2ko3h5qmpKi//BafElZKumwsAYNEiPiyqkhxnpcVYuLvU1A3Wq2.', 'admin'),
(2, 'user@localhost.com', 'User', '$2a$10$9QmW92qjrXltDRbQpJ7BT.aIreHmxuHYoRL0hbNvGKZg5ReoC8muC', 'user');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_authority`
--

CREATE TABLE `user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user_authority`
--

INSERT INTO `user_authority` (`user_id`, `authority_name`) VALUES
(1, 'ROLE_ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- Indexes for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD PRIMARY KEY (`user_id`,`authority_name`),
  ADD KEY `FK6ktglpl5mjosa283rvken2py5` (`authority_name`);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `user_authority`
--
ALTER TABLE `user_authority`
  ADD CONSTRAINT `FK6ktglpl5mjosa283rvken2py5` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`name`),
  ADD CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
