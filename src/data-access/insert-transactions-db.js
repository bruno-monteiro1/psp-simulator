const database = require('./database.js');

const insertTransactionDB = async (transaction) => {
				try {

					const register_transaction = database.db_connection;
					const registered_transaction = register_transaction('transactions')
					.returning('*')
					.insert(transaction);
					return registered_transaction;

				} catch {
					throw new Error('Failed to register transaction.')
				}
};

module.exports = {
	insertTransactionDB: insertTransactionDB
}