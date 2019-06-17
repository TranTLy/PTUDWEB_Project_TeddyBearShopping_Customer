pagingShop = (link) => {
	console.log('link paging shop: ', link);
	// url: 'paging' + link,
	$.ajax({
		url: link,
		type: 'get',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	})
		.done((result) => {
			console.log('result: ', result);
			location.reload();
		})
		.fail(function(err) {
			console.log('fail');
		});
};
