//
module.exports = {
	statusOk: (jsonObject) => {
		return {
			"status": 200,
			"error_msg": null,
			"data": jsonObject
		}
	},
	statusError: (statusCode, errorMessage) => {
		return {
			"status": statusCode,
			"error_msg": errorMessage
		}
	}

}