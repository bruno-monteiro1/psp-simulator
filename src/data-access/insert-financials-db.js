const database = require('./database.js');

const access_financials = database.db_connection;

const insertFinancialDB = (financial) => {

	for(let i = 0; i <= financial.length; i++) {
		access_financials('financials')
		.insert(financial[i])
		.catch(err => {
			throw new Error('Failed to register financial.');
			console.log(err);
		});
	}
};

module.exports = {
	insertFinancialDB: insertFinancialDB
}