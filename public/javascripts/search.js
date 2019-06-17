searchNameProduct = (pos) => {
	//pos is position to get key seach
	// pos = 0 is input at header, pos = 1 is input at shop page
	const keyName = document.getElementsByClassName('keyNameSearch')[pos].value;
	console.log('key: ', keyName);
};
