const database = require('./database.js');

const access_balance = database.db_connection;

// {
// 	"filter": "by type, by description, none",
// 	"transaction_type": "", 
// 	"description": ""
// }

const retrieveBalance = (request) => {

	if(request.filter === 'by type'){
		return retrieveBalanceByType(request);
	}

	if(request.filter === 'by description'){
		return retrieveBalanceByDescription(request);
	}

	if(request.filter === 'none' || !request.filter){
		return retrieveFullBalance();
	}

	else {
		throw new Error('Invalid type.')
	}
}

const retrieveBalanceByType = async (request) => {

	const type = request.transaction_type;

	const raw_expected_balance = await access_balance('financials')
	.where('type', type)
	.andWhere('status', 'expected')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const raw_available_balance = await access_balance('financials')
	.where('type', type)
	.andWhere('status', 'received')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const expected_balance = await parseFloat(raw_expected_balance);
	const available_balance = await parseFloat(raw_available_balance);

	const balance = await Object.freeze({
		consult: new Date(),
		type: type,
		available: available_balance,
		expected: expected_balance,
	});

	return balance;
}

const retrieveBalanceByDescription = async (request) => {

	const description = request.description;

	const raw_expected_balance = await access_balance('financials')
	.where('description', 'like', `%${description}%`)
	.andWhere('status', 'expected')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const raw_available_balance = await access_balance('financials')
	.where('description', 'like', `%${description}%`)
	.andWhere('status', 'received')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const expected_balance = await parseFloat(raw_expected_balance);
	const available_balance = await parseFloat(raw_available_balance);

	const balance = await Object.freeze({
		consult: new Date(),
		description: description,
		available: available_balance,
		expected: expected_balance,
	});

	return balance;
}

const retrieveFullBalance = async () => {

	const raw_expected_balance = await access_balance('financials')
	.where('status', 'expected')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const raw_available_balance = await access_balance('financials')
	.where('status', 'received')
	.sum('financial_value')
	.then(results => {
		return results[0].sum;
	})
	.catch(err => {
		throw new Error();
	});

	const expected_balance = await parseFloat(raw_expected_balance);
	const available_balance = await parseFloat(raw_available_balance);

	const balance = await Object.freeze({
		consult: new Date(),
		available: available_balance,
		expected: expected_balance,
	});

	return balance;
}

module.exports = {
	retrieveBalance: retrieveBalance
}