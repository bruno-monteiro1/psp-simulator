const createTransaction = require('../entities/transaction/transaction-creation.js');
const processFinancial = require('./financial-processing.js');

const processTransaction = (transaction, crypto) => {
	try {

		const finalTransaction = createTransaction.createTransaction(transaction, crypto);
		return finalTransaction;

	} catch (err) {
		throw new Error(err);
	}
}

module.exports = {
	processTransaction: processTransaction
}