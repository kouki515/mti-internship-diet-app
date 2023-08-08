'use strict';

const mysql = require('mysql');
const token = "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2";

// RDS connection information
const mysqlHost      = "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com";
const mysqlUser      = "admin";
const mysqlDbname    = "teams4";
const mysqlPassword  = "j2002214J";
const mysqlTableName = "users"

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

  try {
    // generate connection
    const connection = mysql.createConnection({
      host     : mysqlHost,
      user     : mysqlUser,
      password : mysqlPassword,
      database : mysqlDbname
    });

    const insertSqlCommand = `INSERT INTO ${mysqlTableName}(name, email, password) VALUES ("${name}", "${mailaddress}", "${password}")`;

    // exec insert
    connection.query(insertSqlCommand, function(error, results, fields) {
      if (error) {
        throw new Error("MySQL Insert Error");
      } else {
        console.log("ぐりいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいん")
      }
    });

    // const selectSqlCommand = `SELECT id FROM "${mysqlTableName}" WHERE email = "${mailaddress}" LIMIT 1`;

    // exec select
    // connection.query(selectSqlCommand, function(error, results, fields) {
    //   const userId = results[0].id;
    //   if (error || userId) {
    //     throw new Error("MySQL Select Error");
    //   } else {
    //     response.statusCode = 201;
    //     response.body = JSON.stringify({ userId, token });
    //   }
    // });
    
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
