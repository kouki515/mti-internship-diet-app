'use strict';

const mysql = require('mysql');
const sessionToken = "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2";

// RDS connection information
const mysqlHost      = "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com";
const mysqlUser      = "admin";
const mysqlDbname    = "teams4";
const mysqlPassword  = "j2002214J";

const mysqlTableName = "users";
const userDetailsTableName = "user_details"

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const {name, mailaddress, password} = JSON.parse(event.body);

  // validate
  if (!name || !mailaddress || !password) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "not a valid data, enter the required parameters",
    });

    return response;
  }

  // generate pool
  const pool = mysql.createPool({
    host     : mysqlHost,
    user     : mysqlUser,
    password : mysqlPassword,
    database : mysqlDbname
  });
  
  try {
    const userInsertSqlCommand = `INSERT INTO ${mysqlTableName}(name, email, password) VALUES ('${name}', '${mailaddress}', '${password}')`;
    const data = await new Promise((resolve, reject) => {
      // get connect
      pool.getConnection((error) => {
        if (error) {
          reject('error connecting: ' + error.stack);
        }
      });
      // exec insert
      pool.query(userInsertSqlCommand, function(error, results, fields) {
        if (error) {
          reject("MySQL Insert Error");
        }
        resolve(results);
      });
    });
    const userId = data.insertId;

    const insertSqlCommand = `INSERT INTO ${userDetailsTableName}(user_id) VALUES ('${userId}')`;
    const insertData = await new Promise((resolve, reject) => {
      // get connect
      pool.getConnection((error) => {
        if (error) {
            reject('error connecting: ' + error.stack);
        }
      });
      // exec insert
      pool.query(insertSqlCommand, function(error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });

    response.statusCode = 201;
    response.body = JSON.stringify({ userId, token: sessionToken });

    pool.end();
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました",
      errorDetail: e.toString(),
    });
  }

  return response;
};
