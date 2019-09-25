const createTransaction = (raw_transaction, crypto) => {

	const { value, description, type, installments, card } = raw_transaction;
	const { number, expiry, cvv, holder } = card;
	const id = crypto.randomBytes(16).toString("hex");

	if(!value) {
		throw new Error('invalid value');
	}

	if(!description) {
		throw new Error('invalid description');
	}

	if(type !== 'credit' && type !== 'debit' && type !== 'installment_credit') {
		throw new Error('Invalid type');
	}

	if((type === 'debit' && installments)) {
		throw new Error('Invalid type or installments');
	}

	if(type === 'credit' && installments !== 1) {
		throw new Error('Invalid type or installments');
	}

	if(type === 'installment_credit' && (installments < 2 || installments > 12)) {
		throw new Error('Invalid type or installments');
	}

	if(!number || !expiry || !cvv || !holder) {
		throw new Error('Invalid card information');
	}

	if(number.length !== 16 || expiry.length !== 5 || cvv.length !== 3) {
		throw new Error('Invalid card information');
	} 

	return Object.freeze({
		id: id,
		transaction_value: value,
		transaction_date: new Date(),
		description: description,
		type: type,
		installments: installments,
		card_number: number.slice(-4),
		card_expiry: expiry,
		card_cvv: cvv,
		card_holder: holder
	})
}

module.exports = {
	createTransaction: createTransaction
}