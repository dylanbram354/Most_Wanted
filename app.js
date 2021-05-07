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
		fillTable(filteredPeople, "last-name-table");
	} else {
		alert('Sorry, looks like there is no one with that last name.');
	}
}

function searchByMultiple(){
    let idInput = parseInt(document.forms['all-criteria']['id'].value);
    let firstNameInput = document.forms['all-criteria']['fname'].value;
    let lastNameInput = document.forms['all-criteria']['lname'].value;
    let genderInput = document.forms['all-criteria']['gender'].value;
    let dobInput = document.forms['all-criteria']['dob'].value;
    let heightInput = parseInt(document.forms['all-criteria']['height'].value);
    let weightInput = parseInt(document.forms['all-criteria']['weight'].value);
    let eyeColorInput = document.forms['all-criteria']['eyeColor'].value;
    let occupationInput = document.forms['all-criteria']['occupation'].value;
    let parentsInput = document.forms['all-criteria']['parents'].value;
        if (parentsInput !== ""){
            parentsInput = parentsInput.split(' ');
            let parentsInputNumArray = [];
            for (let i=0; i<parentsInput.length; i++){
                parentsInputNumArray.push(parseInt(parentsInput[i]))
            }
            parentsInput = parentsInputNumArray;
        }
    let currentSpouseInput = parseInt(document.forms['all-criteria']['currentSpouse'].value);

    let filteredPeople = people.filter(function(person){
        if ((person.id === idInput || isNaN(idInput))
            && (person.firstName === firstNameInput || firstNameInput == "")
            && (person.lastName === lastNameInput || lastNameInput == "")
            && (person.gender === genderInput || genderInput == "")
            && (person.dob === dobInput || dobInput == "")
            && (person.height == heightInput || isNaN(heightInput))
            && (person.weight == weightInput || isNaN(weightInput))
            && (person.eyeColor === eyeColorInput || eyeColorInput == "")
            && (person.occupation == occupationInput || occupationInput == "")
            && (person.parents == parentsInput || parentsInput == "") //doesn't work for parents
            && (person.currentSpouse == currentSpouseInput || isNaN(currentSpouseInput))) 
            {
                return true;
            }
            return false;
    })
    if (filteredPeople.length > 0) {
		fillTable(filteredPeople, "multi-search-table");
	} else {
		alert('Sorry, looks like there is no one who matches that search.');
	}
}

function fillTable(array, tableID) {
    let heading = 
    `<thead><tr>
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
    </tr></thead>`
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
	fillTable(people, "all-people");
});

