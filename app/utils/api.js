const M2X_KEY = 'e9fb8386815eb7db7bbe9cb5386414fe';
const COLLECTION_ID = '687165fd85a7f9ae40a225b134845cb8';
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
	getPlugsOnFloor(floor) {
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
	},
	getStatusOfPlug(plug) {
		// console.log('floor value passed into getOpenPlugsOnFloor is : ',floor);
		return fetch(`https://api-m2x.att.com/v2/devices/${plug.id}/streams`, {
			method: 'GET',
			headers: {
				'X-M2X-KEY': M2X_KEY,
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			console.log('first response in getOpenPlugsOnFloor is : ',response);
			return response.json();
		})
		.then(response => {
			console.log('response in second promise is : ',response);
			return {...plug, streams: response.streams};
		})
		.catch(error => {
			console.log('error is : ',error);
		})
	}
}