CREATE TABLE responces(
     id int NOT NULL AUTO_INCREMENT, 
     names text NOT NULL,
     attending BOOLEAN NOT NULL,
     diet text DEFAULT NULL,
     need_accom BOOLEAN DEFAULT NULL,
     accom_details text DEFAULT NULL,
     need_coach BOOLEAN DEFAULT NULL,
     coach_head_count INT DEFAULT NULL,
     email varchar(255) DEFAULT NULL,
     PRIMARY KEY (id)
);