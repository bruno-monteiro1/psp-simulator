const knex = require('knex');

const db_connection = knex({
	  client: 'pg',
	  connection: {
	    host : '127.0.0.1',
	    user : 'bruno',
	    password : '',
	    database : 'confere-psp'
	  }
});


module.exports = {
	db_connection: db_connection
}