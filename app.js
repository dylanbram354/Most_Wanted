'use strict';

function searchByName() {
	// Grabbing the values from our nameForm form and inputs.
	let firstNameInput = document.forms['nameForm']['fname'].value;
	let lastNameInput = document.forms['nameForm']['lname'].value;

	// "people" is coming from the data.js file. We have access to it within this JavaScript file.
	let filteredPeople = people.filter(function(person) {
		if (person.firstName === firstNameInput && person.lastName === lastNameInput) {
			return true;
		}
		return false;
	});

	// Rather than console logging, you need to append the filteredPeople to a table.
	if (filteredPeople.length > 0) {
		fillTable(filteredPeople, 'table');
	} else {
		alert('Sorry, looks like there is no one with that name.');
	}
}

function fillTable(array, tableID) {
	let concat = '';
	array.map(function(object) {
		concat += `<tr>`;
		for (let i in object) {
			concat += `<td>${object[i]}</td>`;
		}
		concat += `</tr>`;
	});
	document.getElementById(tableID).innerHTML = '';
	document.getElementById(tableID).innerHTML = concat;
}

fillTable(people, 'table');

const btnTwo = document.getElementById('btnTwo');
// const firstDiv = document.querySelector('.hidden');

// btnTwo.addEventListener('click', function() {
// 	firstDiv.classList.toggle('hidden');
// 	const arrDataTwo = document.getElementById('arr_dataTwo');
// 	const seeAllPeople = people.map(function(el) {
// 		arrDataTwo.innerHTML += `<tr>
// 		<td>${el.id}</td>
// 		<td>${el.firstName}</td>
// 		<td>${el.lastName}</td>
// 		<td>${el.gender}</td>
// 		<td>${el.dob}</td>
// 		<td>${el.height}</td>
// 		<td>${el.weight}</td>
// 		<td>${el.eyeColor}</td>
// 		<td>${el.occupation}</td>
// 		<td>${el.parents}</td>
// 		<td>${el.currentSpouse}</td>
// 		</tr>`;
// 	});
// 	return seeAllPeople;
// });
