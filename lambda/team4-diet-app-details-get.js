'use strict';

const mysql = require('mysql');
const sessionToken = "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2";

// RDS connection information
const mysqlHost      = "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com";
const mysqlUser      = "admin";
const mysqlDbname    = "teams4";
const mysqlPassword  = "j2002214J";
const mysqlTableName = "user_details";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  // get parm data
  const userId = event.queryStringParameters.userId; 
  const token = event.headers.authorization;

  // validate
  if (!userId) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "not a valid data, enter the required parameters",
    });
    return response;
  }
  if (token != sessionToken) {
    response.statusCode = 401;
    response.body = JSON.stringify({
       message: "not a valid token"
    });
    return response;
  }

  // generate connection
  const connection = mysql.createConnection({
    host     : mysqlHost,
    user     : mysqlUser,
    password : mysqlPassword,
    database : mysqlDbname
  });

  try {
    const selectSqlCommand = `SELECT * FROM ${mysqlTableName} WHERE user_id = '${userId}' LIMIT 1`;
    const data = await new Promise((resolve, reject) => {
      // get connect
      connection.connect((error) => {
        if (error) {
            reject('error connecting: ' + error.stack);
        }
      });
      // exec select
      connection.query(selectSqlCommand, function(error, results, fields) {
        if (error) {
          reject("not found user id");
        }
        resolve(results);
      });
    });
    response.body = JSON.stringify({ data });

    connection.end();
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました",
      errorDetail: e.toString(),
    });
  }

  return response;
};
