const accessTransactions = require('../data-access/retrieve-transactions-db.js');

const retrieveTransactions = async (req, res) => {
	let response = {};
	try {
		const transactions = await accessTransactions.retrieveTransactions(req.body);
		await Object.assign(response, transactions);
		res.status(200).json(JSON.stringify(response));
	} catch (err) {
		res.status(400).json(`${err}`);
	}
}

module.exports = {
	retrieveTransactions: retrieveTransactions
}