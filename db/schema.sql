DROP DATABASE IF EXISTS Employee_TrackerDB;

CREATE DATABASE Employee_TrackerDB;

USE Employee_TrackerDB;

CREATE TABLE department (
  `id` INTEGER UNSIGNED AUTO_INCREMENT  NOT NULL,
  `name` VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  `id` INTEGER  UNSIGNED AUTO_INCREMENT NOT NULL,
  `title` VARCHAR(30) NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INTEGER UNSIGNED NOT NULL,
   INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  `id` INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `first_name` VARCHAR(30) NULL,
  `last_name` VARCHAR(30) NULL,
  `manager_id` INTEGER UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
  `role_id` INTEGER UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);