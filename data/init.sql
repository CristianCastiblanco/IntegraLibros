CREATE DATABASE IF NOT EXISTS libros;

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_native_password BY 'userpassword';

GRANT ALL PRIVILEGES ON libros.* TO 'user'@'%';

FLUSH PRIVILEGES;
