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
			location.reload();
		})
		.fail(function (err) {
			console.log('fail');
		});
};

onDeleteProduct = (id) => {
	console.log('on delete product');
	const idNameEjs = 'product-' + id;
	const temp = document.getElementById(idNameEjs);
	if (temp) {
		temp.style.display = 'none';
	}
	$.ajax({
		url: 'deleteFromCart?id=' + id,
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	})
		.done((result) => {
			console.log('result: ', result);
			location.reload();
		})
		.fail(function (err) {
			console.log('fail');
		});
};

checkAddress = () => {
	let result = false;
	const address = document.getElementById("address").value;
	const message = document.getElementById("message-address");
	if (address === '') {
		message.innerHTML = "Bạn cần nhập địa chỉ giao hàng";
		document.getElementById("address").focus();
	} else if (address.length < 10) {
		message.innerHTML = "Địa chỉ giao hàng cần cụ thể hơn";
		document.getElementById("address").focus();
	} else {
		message.innerHTML = "";
		result = true;
	}
	return result;
}


onPayment = () => {
	console.log("onpayment btn");
	const address = document.getElementById("address").value;
	const message = document.getElementById("message-address");
	if (checkAddress()) {
		document.getElementById("from-payment-post").submit();
	}
	// if (address === '') {
	// 	message.innerHTML = "Bạn cần nhập địa chỉ giao hàng";
	// } else if (address.length < 10) {
	// 	message.innerHTML = "Địa chỉ giao hàng cần cụ thể hơn";
	// } else {
	// 	message.innerHTML = "";
	// 	$.ajax({
	// 		url: 'payment?address=' + address + '&sum=' + sum,
	// 		type: 'post',
	// 		contentType: 'application/json; charset=utf-8',
	// 		dataType: 'json'
	// 	})
	// 		.done((result) => {
	// 			console.log('result: ', result);
	// 			location.reload();
	// 		})
	// 		.fail(function (err) {
	// 			console.log('fail', err);
	// 		});
	// }
}
