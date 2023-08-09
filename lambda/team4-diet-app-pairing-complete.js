'use strict';

const mysql = require('mysql');
const sessionToken = "5da50cf80844d2cdab1bc15aa9e64802c7d365dec585b2896b9ef46f4274bfc2";

// RDS connection information
const mysqlHost      = "team4-db.cylsclnu96ov.ap-northeast-1.rds.amazonaws.com";
const mysqlUser      = "admin";
const mysqlDbname    = "teams4";
const mysqlPassword  = "j2002214J";

const selectTableName = "pairing_processes";
const insertTableName = "pair_users";
const updateTableName   = "user_details";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const {watcherUserId, passphrase} = JSON.parse(event.body);
  const token = event.headers.authorization;

  // validate
  if (!watcherUserId || !passphrase) {
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

  // generate pool
  const pool = mysql.createPool({
    host     : mysqlHost,
    user     : mysqlUser,
    password : mysqlPassword,
    database : mysqlDbname
  });
  
  try {
    const selectSqlCommand = `SELECT do_dieter FROM ${selectTableName} WHERE passphrase = '${passphrase}' LIMIT 1`;
    const selectData = await new Promise((resolve, reject) => {
      // get connect
      pool.getConnection((error) => {
        if (error) {
            reject('error connecting: ' + error.stack);
        }
      });
      // exec select
      pool.query(selectSqlCommand, function(error, results, fields) {
        if (error) {
          reject("not found pair user id");
        }
        resolve(results);
      });
    });

    const dieterUserId = selectData[0].do_dieter;

    const insertSqlCommand = `INSERT INTO ${insertTableName}(watcher_dieter_id, do_dieter_id) VALUES ('${watcherUserId}', '${dieterUserId}')`;
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

    const watcherUpdateSqlCommand = `UPDATE ${updateTableName} SET role = 'watcher' WHERE user_id = '${watcherUserId}' LIMIT 1`;
    const watcherUpdateData = await new Promise((resolve, reject) => {
      // get connect
      pool.getConnection((error) => {
        if (error) {
            reject('error connecting: ' + error.stack);
        }
      });
      // exec update
      pool.query(watcherUpdateSqlCommand, function(error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });

    const dieterUpdateSqlCommand = `UPDATE ${updateTableName} SET role = 'dieter' WHERE user_id = '${watcherUserId}' LIMIT 1`;
    const dieterUpdateData = await new Promise((resolve, reject) => {
      // get connect
      pool.getConnection((error) => {
        if (error) {
            reject('error connecting: ' + error.stack);
        }
      });
      // exec update
      pool.query(dieterUpdateSqlCommand, function(error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });

    response.statusCode = 201;
    const message = "success"
    response.body = JSON.stringify({ message });

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
