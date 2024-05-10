 
--  ADD docker/mysql/init.sql /docker-entrypoint-initdb.d

 USE mysql;
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
 FLUSH PRIVILEGES;
