const knex = require('knex');

const db_connection = knex({
	  client: 'pg',
	  connection: {
	    host : process.env.DATABASE_URL,
	    ssl: true
	  }
});


module.exports = {
	db_connection: db_connection
}