const db = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.MYSQL_HOST,
      port : process.env.MYSQL_PORT,
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
    }
  });

//db.destroy();

module.exports =  db;