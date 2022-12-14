import './css/index.css';
import './css/home.css';

import IMask from 'imask';

const ccBgColor = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor2 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardColorType(type) {
	const colors = {
		visa: ['07051B', '0E0E0E'],
		mastercard: ['2051FF', '0E0E0E'],
		cielo: ['pink', 'black'],
		default: ['orange', 'green'],
	};

	ccBgColor.setAttribute('fill', colors[type][0]);
	ccBgColor2.setAttribute('fill', colors[type][1]);
	ccLogo.setAttribute('src', `cc-${type}.svg`);
}

setCardColorType('cielo');

const securityCode = document.getElementById('security-code');
const securityCodePattern = {
	mask: '0000',
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.getElementById('expiration-date');
const expirationDatePattern = {
	mask: 'MM{/}YY',
	blocks: {
		YY: {
			mask: IMask.MaskedRange,
			// valid until 2026
			from: String(new Date().getFullYear()).slice(2),
			to: String(new Date().getFullYear() + 4).slice(2),
		},
		MM: {
			mask: IMask.MaskedRange,
			from: 1,
			to: 12,
		},
	},
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.getElementById('card-number');
const cardNumberPattern = {
	mask: [
		{
			mask: '0000 0000 0000 0000',
			regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
			cardtype: 'mastercard',
		},
		{
			mask: '0000 0000 0000 0000',
			regex: /^4\d{0,15}/,
			cardtype: 'visa',
		},
		{
			mask: '0000 0000 0000 0000',
			cardtype: 'default',
		},
	],
	dispatch(appended, dynamicMasked) {
		const number = (dynamicMasked.value + appended).replace(/\D/g, '');
		return dynamicMasked.compiledMasks.find((item) => number.match(item.regex));
	},
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);
