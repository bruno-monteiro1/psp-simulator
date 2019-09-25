# Confere PSP

Confere PSP is a REST API that simulates a Payment Service Provider. It is connected to a real database and can process transactions, create financials, retrieve them and also return the current and future balance of the customer's account. 


## Getting Started

The API is running here: 

https://confere-psp.herokuapp.com

## Testing

Since it does not have unit/integration tests, I recommend Postman for testing all the endpoints available in this API. Postman can be downloaded here: 

https://www.getpostman.com/downloads/

### Processing transactions

“/process-transaction” endpoint create and store transactions into the database, and also automatically calls another controller, finanction-insertion, to generate the one or more financials related to the transactions received. It expects a POST request with the following schema:

```
{
	"value": 100.00,
	"description": "Bicycle Deck",
	"type": "debit", // `debit`, `credit` or `installment_credit`
	"installments": null, // If credit, set 1 and if debit, set `null`
	"card": {
		"number": "5200555500001234",
		"expiry": "20/21",
		"cvv": "123",
		"holder": "David Blaine White"
	}
}
```
It only stores the last 4 digits of the card number.

### Retrieving transactions

“/retrieve-transactions" returns a list of transactions stored in the database, and it can apply filters based on the request. It expects a POST request with the following schema:

```
{
	"filter": "by id", //by range, by type, by description, by card, by id
	"from": "2019-09-01",
	"until": "2020-12-31",
	"transaction_type": "debit", //debit, credit, installment_credit
	"description": "Bicycle Deck"
	"card": "1234" // last 4 digits of card number
	"id": "" // transaction id
}
```

The API only checks the field correspondent to the filter requested. 

### Retrieving financials

“/retrieve-financials" returns a list of financials stored in the database, and it can apply filters based on the request. It expects a POST request with the following schema:

```
{
	"filter": "by id", //by range, by type, by status, by id
	"from": "2019-09-01",
	"until": "2020-12-31",
	"transaction_type": "debit", //debit, credit, installment_credit
	"status": "received," //expected, received
	"id": "" // financial id
}
```

The API only checks the field correspondent to the filter requested. 

### Retrieving balance

“/balance" returns the financial balance of the customer, showing the available (received) value and also the expected one, composed by the financials yet to be received. It expects a POST request with the following schema: 

```
{
	"filter": "by type", // by description, by date, none
	"date": "", // format YYYY-MM-DD
	"transaction_type": "", // debit, credit, installment_credit
	"description": "" // description of the transaction
}
```

The API only checks the field correspondent to the filter requested. If the filter field does not have any value, it responds the same way as "none", showing the current balance 

## Built With

* [Node.js](https://nodejs.org/en/) - Javascript runtime
* [Express.js](https://expressjs.com/) - Framework for Node.js
* [Body-Parser](https://www.npmjs.com/package/body-parser) - Parsing middleware for Node.js
* [Knex](http://knexjs.org/) - SQL Query Builder for Javascript
* [PostgreSQL](https://www.postgresql.org) - Relational database
