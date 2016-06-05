const M2X_KEY = 'e9fb8386815eb7db7bbe9cb5386414fe';
const HEADERS = {
	'Content-Type': 'application/json',
	'X-M2X-KEY': M2X_KEY
};

module.exports = {
	getPlugs() {
		return fetch(`https://api-m2x.att.com/v2/devices`, {
			method: 'GET',
			headers: {
				'X-M2X-KEY': M2X_KEY,
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.log('error is : ',error);
		})		
	},
	getOpenPlugsOnFloor(floor) {
		console.log('floor value passed into getOpenPlugsOnFloor is : ',floor);
		return fetch(`https://api-m2x.att.com/v2/devices/search?tags=floor${floor}`, {
			method: 'GET',
			headers: {
				'X-M2X-KEY': M2X_KEY,
				'Content-Type': 'application/json',
				'tags': `floor${floor}`
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.log('error is : ',error);
		})
	}
}