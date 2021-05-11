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

function searchByMultiple() {
	let idInput = parseInt(document.forms['all-criteria']['id'].value);
	let firstNameInput = document.forms['all-criteria']['fname'].value;
	let lastNameInput = document.forms['all-criteria']['lname'].value;
	let genderInput = document.forms['all-criteria']['gender'].value;
	let dobInput = document.forms['all-criteria']['dob'].value;
	let heightInput = parseInt(document.forms['all-criteria']['height'].value);
	let weightInput = parseInt(document.forms['all-criteria']['weight'].value);
	let eyeColorInput = document.forms['all-criteria']['eyeColor'].value;
	let occupationInput = document.forms['all-criteria']['occupation'].value;
	// let parentsInput = document.forms['all-criteria']['parents'].value;
	//     if (parentsInput !== ""){
	//         parentsInput = parentsInput.split(',');
	//         let parentsInputNumArray = [];
	//         for (let i=0; i<parentsInput.length; i++){
	//             parentsInputNumArray.push(parseInt(parentsInput[i]))
	//         }
	//         parentsInput = parentsInputNumArray;
	//         console.log(parentsInput);
	//     }
	let currentSpouseInput = parseInt(document.forms['all-criteria']['currentSpouse'].value);

	let filteredPeople = people.filter(function(person) {
		if (
			(person.id === idInput || isNaN(idInput)) &&
			(person.firstName === firstNameInput || firstNameInput == '') &&
			(person.lastName === lastNameInput || lastNameInput == '') &&
			(person.gender === genderInput || genderInput == '') &&
			(person.dob === dobInput || dobInput == '') &&
			(person.height == heightInput || isNaN(heightInput)) &&
			(person.weight == weightInput || isNaN(weightInput)) &&
			(person.eyeColor === eyeColorInput || eyeColorInput == '') &&
			(person.occupation == occupationInput || occupationInput == '') &&
			//&& (person.parents ==parentsInput || parentsInput == "") // problem with array equality?
			(person.currentSpouse == currentSpouseInput || isNaN(currentSpouseInput))
		) {
			return true;
		}
		return false;
	});
	if (filteredPeople.length > 0) {
		fillTable(filteredPeople, 'multi-search-table');
	} else {
		alert('Sorry, looks like there is no one who matches that search.');
	}
}

function searchDescendants(idInput) {
	let descendants = [];
	let children = people.filter(function(person) {
		if (person.parents.includes(Number(idInput))) {
			descendants = descendants.concat(searchDescendants(person['id']));
			return true;
		}
		return false;
	});

	descendants = descendants.concat(children);
	return descendants;
}

function fillDescendantSearchTable() {
	let searchInput = document.forms['descendant-search']['id'].value;
	let results = searchDescendants(searchInput);
	fillTable(results, 'descendant-table');
}

function familySearch(idNumber) {
	let familyIDs = [];
	let personObject = people.filter(function(person) {
		if (person.id == idNumber) {
			return true;
		}
		return false;
	});
	personObject = personObject[0];
	let parentsIDArray = personObject.parents;
	let spouseID = personObject['currentSpouse'];
	let siblingsIDArray = [];
	for (let i = 0; i < parentsIDArray.length; i++) {
		people.filter(function(person) {
			if (person.parents.includes(parentsIDArray[i]) && person.id !== Number(idNumber)) {
				siblingsIDArray.push(person.id);
				return true;
			}
			return false;
		});
	}

	// family = siblingsObjectArray.concat(spouseAndParents);
	// console.log(family);
	// fillTable(family, 'parents-table');
}

function fillTable(array, tableID) {
	let heading = `<thead><tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Gender</th>
        <th>DoB</th>
        <th>Height</th>
        <th>Weight</th>
        <th>Eye Color</th>
        <th>Occupation</th>
        <th>Parents</th>
        <th>Current Spouse</th>
    </tr></thead>`;
	let body = '';
	array.map(function(object) {
		body += `<tbody><tr>`;
		for (let i in object) {
			body += `<td>${object[i]}</td>`;
		}
		body += `</tr></tbody>`;
	});
	document.getElementById(tableID).innerHTML = '';
	document.getElementById(tableID).innerHTML = heading + body;
}

const btnTwo = document.getElementById('btnTwo');
const firstDiv = document.querySelector('.hidden');

btnTwo.addEventListener('click', function() {
	firstDiv.classList.toggle('hidden');
	fillTable(people, 'all-people');
});

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

// const me = [ { 'First Name': 'Eric', 'Last Name': 'Dude' } ];
// const table = document.querySelector('table');
// let data = Object.keys(me[0]);

// createTable(table, me);
// createThead(table, data);

// const table = document.querySelector('table').forEach(e => { e.remove });
