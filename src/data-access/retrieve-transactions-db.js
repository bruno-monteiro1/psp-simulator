const database = require('./database.js');

const access_transactions = database.db_connection;

// {
// 	"filter": "by id", //by range, by type, by description, by card, by id
// 	"from": "2019-09-01",
// 	"until": "2020-12-31",
// 	"transaction_type": "debit", //debit, credit, installment_credit
//  "description": ""
// 	"card": ""
// 	"id": ""
// }

const retrieveTransactions = (request) => {

	if(request.filter === 'by range'){
		return retrieveTransactionsByPeriod(request);
	}

	if(request.filter === 'by type'){
		return retrieveTransactionsByType(request);
	}

	if(request.filter === 'by description'){
		return retrieveTransactionsByDescription(request);
	}

	if(request.filter === 'by card'){
		return retrieveTransactionsByCard(request);
	}

	if(request.filter === 'by id'){
		return retrieveTransactionsById(request);
	}



	else {
		throw new Error('Invalid type of retrieve.')
	}
}


const retrieveTransactionsByPeriod = async (request) => {

	const transactions = await access_transactions('transactions')
	.select('*')
	.whereBetween('transaction_date', [request.from, request.until])
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid date input.')
	});

	return transactions;
}

const retrieveTransactionsByType = async (request) => {

	const transactions = await access_transactions('transactions')
	.where('type', request.transaction_type)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return transactions;
}

const retrieveTransactionsByDescription = async (request) => {
	const transactions = await access_transactions('transactions')
	.where('description', request.description)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return transactions;
}

const retrieveTransactionsByCard = async (request) => {
	const transactions = await access_transactions('transactions')
	.where('card_number', request.card)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return transactions;
}

const retrieveTransactionsById = async (request) => {

	const transactions = await access_transactions('transactions')
	.where('id', request.id)
	.select('*')
	.then(results => {
		return results;
	})
	.catch(err => {
		throw new Error('Invalid input.')
	});

	return transactions;

}

module.exports = {
	retrieveTransactions: retrieveTransactions
}