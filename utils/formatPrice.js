export function formatPrice(price, decimals = 2, currencySymbol = '') {
	if (isNaN(price)) return 'Invalid Number';

	return (
			currencySymbol +
			Number(price).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	);
}

