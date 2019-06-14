changeQuantity = (id, index, mode) => {
	let quantity = document.getElementsByClassName('quantityProduct')[index].innerHTML;
	quantity = parseInt(quantity) + parseInt(mode);
	if (quantity === 0) {
		quantity = 1;
	}
	console.log('new quantity: ', quantity);
	$.ajax({
		url: 'changeQuantity?id=' + id + '&quantity=' + quantity,
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	})
		.done((result) => {
			console.log('result: ', result);
			window.location.reload;
		})
		.fail(function(err) {
			console.log('fail');
		});
};

onDeleteProduct = (id) => {
	console.log('on delete product');
	$.ajax({
		url: 'deleteFromCart?id=' + id,
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	})
		.done((result) => {
			console.log('result: ', result);
			window.location.reload;
		})
		.fail(function(err) {
			console.log('fail');
		});
};
