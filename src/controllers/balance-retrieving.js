const retrieveBalance = require('../data-access/retrieve-balance-db.js');

const balance = async (req, res) => {

	try {
		const retrieved_balance = await retrieveBalance.retrieveBalance(req.body);
		res.status(200).send(JSON.stringify(retrieved_balance));
	} catch (err) {
		res.status(400).send('Somenthing went wrong ' + err)
	}

}


module.exports = {
	balance: balance
}