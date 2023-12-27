function jseval(expr) {
	try {
		var result = eval(expr)
		post(result)
	} catch (error) {
		post("error: ")
		post(error.message)
	}
	post()
}