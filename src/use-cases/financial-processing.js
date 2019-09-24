const createFinancial = require('../entities/financial/financial-creation.js');

const processFinancial = (final_transaction, crypto) => {

	const { id, transaction_date, transaction_value, description, type, installments, card_number } = final_transaction;

	if(type === 'debit') {
		const financial_value = createFinancialValue(transaction_value, 'debit', null);
		const financial = [];
		financial.push(createFinancial.createFinancial(id, transaction_date, financial_value, '', '', description, type, card_number, 0, 'received', crypto));
		return financial;
	}

	if(type === 'credit' || type === 'installment_credit'){
		const total_value = createFinancialValue(transaction_value, 'credit', installments);
		const financial_value = total_value / installments;
		let financials = [];

		for(let i = 1; i <= installments; i++){
			let add_days_to_receive = 30 * i;
			financials.push(
				createFinancial.createFinancial(
					id, transaction_date, financial_value, i, `/${installments}`, description, type, card_number, add_days_to_receive, 'expected', crypto));
		}
		return financials;
	}
}

const createFinancialValue = (transaction_value, type, installments) => {
	if(type === 'debit') {
		let fee = transaction_value * 0.028;
		let total_financial_value = transaction_value - fee;
		return total_financial_value;
	}

	if(type === 'credit') {
		let fee = transaction_value * 0.032;
		let total_financial_value = transaction_value - fee;
		return total_financial_value;
	}

	if(type === 'installment_credit' && (installments > 1 && installments <= 6)) {
		let fee = transaction_value * 0.038;
		let total_financial_value = transaction_value - fee;
		return total_financial_value;
	}

	if(type === 'installment_credit' && installments > 6) {
		let fee = transaction_value * 0.042;
		let total_financial_value = transaction_value - fee;
		return total_financial_value;
	}
}

module.exports = {
	processFinancial: processFinancial
}