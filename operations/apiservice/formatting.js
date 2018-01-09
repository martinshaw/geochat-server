//
module.exports = {
	statusOk: (jsonObject) => {
		return {
			"status": "ok",
			"data": jsonObject
		}
	},
	statusError: (errorMessage, jsonObject) => {
		return {
			"status": "error",
			"error_msg": errorMessage,
			"data": jsonObject
		}
	}

}