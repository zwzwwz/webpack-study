define('getSum', ['./calculator.js'], function(math) {
	return function(a, b) {
		console.log('sum:', calculator.add(a, b))
	}
})
