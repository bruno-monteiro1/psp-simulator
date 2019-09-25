const database = require('./database.js');

const register_transaction = database.db_connection;

const insertTransactionDB = async (transaction) => {
		try {
			const registered_transaction = register_transaction('transactions')
			.returning('*')
			.insert(transaction);
			return registered_transaction;

		} catch (err) {
			throw new Error('Failed to register transaction.');
			console.log(err);
		}
};

module.exports = {
	insertTransactionDB: insertTransactionDB
}