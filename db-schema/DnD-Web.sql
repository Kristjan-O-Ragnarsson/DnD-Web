CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL
);

CREATE TABLE `character` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `user_id` int,
  `location` byte,
  `level` tinyint,
  `race_id` tinyint,
  `background_text` varchar(255),
  `alignment` tinyint,
  `xp` int,
  `saving_throw_str` int,
  `saving_throw_dex` int,
  `saving_throw_cons` int,
  `saving_throw_int` int,
  `saving_throw_wis` int,
  `saving_throw_char` int,
  `skill_acrobatics` int,
  `skill_animal_handling` int,
  `skill_arcana` int,
  `skill_athletics` int,
  `skill_deception` int,
  `skill_history` int,
  `skill_insight` int,
  `skill_intimidation` int,
  `skill_investigation` int,
  `skill_medicine` int,
  `skill_nature` int,
  `skill_perception` int,
  `skill_performance` int,
  `skill_persuasion` int,
  `skill_religion` int,
  `skill_sleight_of_hand` int,
  `skill_stealth` int,
  `skill_survival` int
);

CREATE TABLE `game` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT
);

CREATE TABLE `npc` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `location` byte
);

CREATE TABLE `monster` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `location` byte
);

CREATE TABLE `race` (
  `id` tinyint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `alignment` (
  `id` tinyint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

ALTER TABLE `character` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `character` ADD FOREIGN KEY (`race_id`) REFERENCES `race` (`id`);

ALTER TABLE `character` ADD FOREIGN KEY (`alignment`) REFERENCES `alignment` (`id`);

ALTER TABLE `npc` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
