const processTransaction = require('../use-cases/transaction-processing.js');
const insertTransactionDB = require('../data-access/insert-transactions-db.js');
const insertFinancial = require('./financial-insertion.js');

const insertTransaction = async (req, res, crypto) => {
	try {
		const transaction = await processTransaction.processTransaction(req.body, crypto);
		await insertTransactionDB.insertTransactionDB(transaction);
		const financial = await insertFinancial.insertFinancial(transaction, crypto);
		res.status(200).json(transaction);
	} catch (err) {
		res.status(400).json(`${err}`);
	}
}

module.exports = {
	insertTransaction: insertTransaction
}