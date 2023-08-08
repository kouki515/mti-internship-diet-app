const mysql = require('mysql');

// 接続先のMySQLサーバ情報
const mysql_host = "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com";
const mysql_user = "admin";
const mysql_dbname = "teams4";
const mysql_password = "j2002214J";

// 実行するSQL文
const sql = `SELECT * FROM users`;

const connection = mysql.createConnection({
    host     : mysql_host,
    user     : mysql_user,
    password : mysql_password,
    database : mysql_dbname
});

// MySQLデータベースへの接続
connection.connect((err) => {
  if (err) {
    console.log('error');
    return;
  }
});

// MySQLデータベースでSQL実行
connection.query(sql, function(err, results, fields) {
    if (err) {
        console.log("MySQL Select Error");
    } else {
    console.log("MySQL Select Success");
    console.log(results[1].id);
    // console.log(fields);
    }
});

connection.end();
  console.log('end');
