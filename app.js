'use strict';

function searchByLastName() {
	let lastNameInput = document.forms['nameForm']['lname'].value;
	let filteredPeople = people.filter(function(person) {
		if (person.lastName === lastNameInput) {
			return true;
		}
		return false;
	});

	if (filteredPeople.length > 0) {
		fillTable(filteredPeople, 'last-name-table');
	} else {
		alert('Sorry, looks like there is no one with that last name.');
	}
}

// const me = [ { 'First Name': 'Eric', 'Last Name': 'Dude' } ];

// //===Create thead function===
// function createThead(table, data) {
// 	let thead = table.createTHead();
// 	let row = thead.insertRow();
// 	for (let key of data) {
// 		let th = document.createElement('th');
// 		let text = document.createTextNode(key);
// 		th.appendChild(text);
// 		row.appendChild(th);
// 	}
// }

// //===Create table function===
// function createTable(table, data) {
// 	for (let element of data) {
// 		let row = table.insertRow();
// 		for (let key in element) {
// 			let cell = row.insertCell();
// 			let text = document.createTextNode(element[key]);
// 			cell.appendChild(text);
// 		}
// 	}
// }

// const table = document.querySelector('table');
// let data = Object.keys(me[0]);

// createTable(table, me);
// createThead(table, data);
