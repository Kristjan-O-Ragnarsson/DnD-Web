CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL
);

CREATE TABLE `race` (
  `id` tinyint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `alignment` (
  `id` tinyint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `character` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `user_id` int,
  `location` varchar(255),
  `level` tinyint,
  `race_id` tinyint,
  `background_text` varchar(255),
  `alignment` tinyint,
  `xp` int,
  `saving_throw_str` tinyint,
  `saving_throw_dex` tinyint,
  `saving_throw_cons` tinyint,
  `saving_throw_int` tinyint,
  `saving_throw_wis` tinyint,
  `saving_throw_char` tinyint,
  `skill_acrobatics` tinyint,
  `skill_animal_handling` tinyint,
  `skill_arcana` tinyint,
  `skill_athletics` tinyint,
  `skill_deception` tinyint,
  `skill_history` tinyint,
  `skill_insight` tinyint,
  `skill_intimidation` tinyint,
  `skill_investigation` tinyint,
  `skill_medicine` tinyint,
  `skill_nature` tinyint,
  `skill_perception` tinyint,
  `skill_performance` tinyint,
  `skill_persuasion` tinyint,
  `skill_religion` tinyint,
  `skill_sleight_of_hand` tinyint,
  `skill_stealth` tinyint,
  `skill_survival` tinyint,
  `armour_class` tinyint,
  `initiative` tinyint,
  `speed` tinyint,
  `hp_max` tinyint,
  `hp_tmp` tinyint,
  `hp_cur` tinyint
);

CREATE TABLE `game` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `npc` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `location` varchar(255)
);

CREATE TABLE `monster` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `location` varchar(255)
);

ALTER TABLE `character` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `character` ADD FOREIGN KEY (`race_id`) REFERENCES `race` (`id`);

ALTER TABLE `character` ADD FOREIGN KEY (`alignment`) REFERENCES `alignment` (`id`);

ALTER TABLE `npc` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
