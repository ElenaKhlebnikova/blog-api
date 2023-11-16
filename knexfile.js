const path = require('path');
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    port: process.env.PORT_DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  migrations: {
    directory: path.join(__dirname, '/migrations'),
  },
};
