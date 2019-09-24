const processFinancial = require('../use-cases/financial-processing.js');
const insertFinancialDB = require('../data-access/insert-financials-db.js');

const insertFinancial = async (transaction, crypto) => {
	try {
		const financial = await processFinancial.processFinancial(transaction, crypto);
		await insertFinancialDB.insertFinancialDB(financial);
	} catch (err) {
		throw new Error(err);
	}
}

module.exports = {
	insertFinancial: insertFinancial
}