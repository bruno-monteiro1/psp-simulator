const createFinancial = (transaction_id, transaction_date, value, installment, installments, description, type, card_number, days_to_receive, status, crypto) => {	const id = crypto.randomBytes(16).toString("hex");
	
	const createDate = (transaction_date, days_to_receive) => {
		let receive_date = new Date(transaction_date);
		receive_date.setDate(receive_date.getDate() + days_to_receive);
		return receive_date;
	}


	const financial = Object.freeze({
		financial_value: value.toFixed(2),
		description: description + ` ${installment}${installments}`,
		type: type,
		card_number: card_number,
		received_date: createDate(transaction_date, days_to_receive),
		transaction_date: transaction_date,
		financial_id: id,
		transaction_id: transaction_id,
		status: status
	});

	return financial;
	
}

module.exports = {
	createFinancial: createFinancial
}