const database = require('./database.js');

const access_financials = database.db_connection;

const retrieveFinancials = (request) => {

	if(request.filter === 'by range'){
		return retrieveFinancialsByPeriod(request);
	}

	if(request.filter === 'by type'){
		return retrieveFinancialsByType(request);
	}

	if(request.filter === 'by status'){
		return retrieveFinancialsByStatus(request);
	}

	if(request.filter === 'by id'){
		return retrieveFinancialsById(request);
	}

	else {
		throw new Error('Invalid type of retrieve.')
	}
}


const retrieveFinancialsByPeriod = async (request) => {

	const financials = await access_financials('financials')
	.select('*')
	.whereBetween('received_date', [request.from, request.until])
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return financials;
}

const retrieveFinancialsByType = async (request) => {
	const financials = await access_financials('financials')
	.where('type', request.transaction_type)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return financials;
}

const retrieveFinancialsByStatus = async (request) => {
	const financials = await access_financials('financials')
	.where('status', request.status)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return financials;
}

const retrieveFinancialsById = async (request) => {

	const financials = await access_financials('financials')
	.where('financial_id', request.id)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return financials;

}

module.exports = {
	retrieveFinancials: retrieveFinancials
}