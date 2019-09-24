const accessFinancials = require('../data-access/retrieve-financials-db.js');

const retrieveFinancials = async (req, res) => {
	let response = {};
	try {
		const financials = await accessFinancials.retrieveFinancials(req.body);
		await Object.assign(response, financials)
		res.status(200).send(JSON.stringify(response));
	} catch (err) {
		res.status(400).send('Unable to retrieve Financials ' + err);
	}
}

module.exports = {
	retrieveFinancials: retrieveFinancials
}