const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const transactionInsertion = require('./controllers/transaction-insertion.js');
const transactionRetrieving = require('./controllers/transaction-retrieving.js');
const financialRetrieving = require('./controllers/financial-retrieving.js');
const balanceRetrieving = require('./controllers/balance-retrieving.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('PSP is running fine!') });
app.post('/process-transaction', (req, res) => { transactionInsertion.insertTransaction(req, res, crypto) });
app.post('/retrieve-transactions', (req, res) => { transactionRetrieving.retrieveTransactions(req, res) });
app.post('/retrieve-financials', (req, res) => { financialRetrieving.retrieveFinancials(req, res) });
app.post('/balance', (req, res) => { balanceRetrieving.balance(req, res) });

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});