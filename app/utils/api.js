var M2X = require('./m2xclient');
const m2xClient = new M2X('21545dbb3a70e5853e810ce7c57c89b0');

module.exports = {
	getPlugs() {
		return new Promise((resolve,reject) => {
			m2xClient.devices.list(function(response) {
		    if (response.isSuccess()) {
		    	resolve(response);
		    } else {
	        console.log(JSON.stringify(response.error()));
	        reject({ error: 'Could not fetch devices!' });
		    }
			});
		})
		
	}
}