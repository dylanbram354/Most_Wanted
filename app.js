'use strict';

//The first group of functions dynamically creates a custom table based on an array of objects.
//createThead takes in a variable referencing a particular table in the DOM, as well as an array of string/number elements that will become the table headings.
//createTable takes in that same table variable along with the array of objects, and fills the table body based on the object/key values.
//createCustomTable puts those two functions together to create the whole table.

function createThead(table, data) {
	table.innerHTML = '';
	let thead = table.createTHead();
	let row = thead.insertRow();

	for (let key of data) {
		let th = document.createElement('th');
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	}
}

function createTable(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		for (let key in element) {
			let cell = row.insertCell();
			let text = document.createTextNode(element[key]);
			cell.appendChild(text);
		}
	}
}

function createCustomTable(table, headingsArray, objectArray) {
	createThead(table, headingsArray);
	createTable(table, objectArray);
}

//This group of functions creates a table in the same way as the previous three, but it uses basic string concatenation to append the HTML code directly
//as opposed to using dynamic methods. fillTableCustomHeadings takes in a table id tag and an array of objects, and fills the table using the object keys as headings.
//fillTable is more specific to this particular project - the heading is hard-coded based on the given 'people' dataset. The only reason we did this was to give proper capitalization
//and puncuation to the table headings ("First Name" instead of "firstName", etc).

function fillTableCustomHeadings(array, tableID) {
	let heading = '<thead>';
	for (let keys in array[0]) {
		heading += `<th>${keys}</th>`;
	}
	heading += '</thead>';
	let body = '';
	array.map(function(object) {
		body += `<tbody><tr>`;
		for (let i in object) {
			body += `<td>${object[i]}</td>`;
		}
		body += `</tr></tbody>`;
	});
	document.getElementById(tableID).innerHTML = heading + body;
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
	document.getElementById(tableID).innerHTML = heading + body;
}

//This code block references a particular button from the DOM as well as a div with class 'hidden'.
//The addEventListener on btnTwo allows a user to toggle the visibility of the entire div,
//while also generating a table of all people in the dataset at the same time (using the fillTable function).

const btnTwo = document.getElementById('btnTwo');
const firstDiv = document.querySelector('.hidden');

btnTwo.addEventListener('click', function() {
	firstDiv.classList.toggle('hidden');
	fillTable(people, 'all-people');
});

//Remove this?
// function searchByLastName() {
// 	let lastNameInput = document.forms['nameForm']['lname'].value;
// 	let filteredPeople = people.filter(function(person) {
// 		if (person.lastName === lastNameInput) {
// 			return true;
// 		}
// 		return false;
// 	});

// 	if (filteredPeople.length > 0) {
// 		fillTable(filteredPeople, 'last-name-table');
// 	} else {
// 		alert('Sorry, looks like there is no one with that last name.');
// 	}
// }

//searchByMultiple allows a user to input as many criteria as they want in order to find matching people from the dataset.
//First, each possible input is assigned to a variable. Any numerical inputs are parsed as ints.
//Then, the dataset is filtered based on a long string of bools. For each person in the set, each criteria (object key/value) is checked against the search criteria.
//The || operators ensure that there aren't any false-negatives if a user leaves one or more search fields blank.
//The function then calls fillTable with the resulting dataset and generates the table.

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
			// && (person.parents === parentsInput || parentsInput == "") // "Search by Parents" is removed due to the complexity of comparing array equality
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

//searchDesendants is a recursive function that returns an array of a given person's descendants. It filters through the dataset, finding people who's array of parent-ID-numbers
//includes the given input ID number. As soon as it finds one, it is called again using that person's ID number, finding their children, and so on until there are no children to be found.
//With each call, an array of each person's children are concatenated to an array of descendants, with the end result being an array of all descendants of the original person.
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

//This is just another version of the searchDescendants function that we wrote for practice. Both functions take the same arguments and achieve the same result.
function searchDescendantsAlt(IDnum){
    let descendants = [];
    let children = people.filter(function(person){
        if (person.parents.includes(Number(IDnum))){
            return true;
        }
        return false
    })
    descendants = descendants.concat(children);
    if (children.length>0){
        for (let i = 0; i<children.length; i++){
            descendants = descendants.concat(searchDescendantsAlt(children[i].id));
        }
        return descendants;
    }
    return descendants;
}

//fillDescendantsSearchTable calls searchDescendantsAlt with a user input as the argument, then passes that into fillTable in order to create a table with the elements of the searchDescendants array.
function fillDescendantSearchTable() {
	let searchInput = document.forms['descendant-search']['id'].value;
	let results = searchDescendantsAlt(searchInput);
	fillTable(results, 'descendant-table');
}

//The next group of functions is used to display a given person's immediate family members. First, findObjectByIdNum accesses the particular object from the dataset based on their ID number,
//which the user will input. familyObjectMaker takes in an object from the dataset as well as their relationship to the original person (as a string), and creates a new object with only 3 keys.
//findParents, findSiblings, findSpouse, and findChildren take in the object-person in question and filter through the dataset to find the given relation. Depending on the found person's gender,
//they then call familyObjectMaker to create new objects that indicate the relationship to the original person (father, mother, sister, brother, etc). They then push those new objects
//to an array and return that array.

function findObjectByIdNum(idNumber) {
	let personObject = people.filter(function(person) {
		if (person.id == idNumber) {
			return true;
		}
		return false;
	});
	personObject = personObject[0];
	return personObject;
}

function familyObjectMaker(personObject, relationship) {
	let newObject = {
		'First Name': personObject.firstName,
		'Last Name': personObject.lastName,
		Relationship: relationship
	};
	return newObject;
}
function findParents(personObject) {
	let parentsIDArray = personObject['parents'];
	let parentsObjectArray = [];
	people.filter(function(person) {
		if (parentsIDArray.includes(person.id) && person.gender == 'male') {
			let fatherObject = familyObjectMaker(person, 'Father');
			parentsObjectArray.push(fatherObject);
			return true;
		} else if (parentsIDArray.includes(person.id) && person.gender == 'female') {
			let motherObject = familyObjectMaker(person, 'Mother');
			parentsObjectArray.push(motherObject);
			return true;
		}
		return false;
	});
	return parentsObjectArray;
}

function findSiblings(personObject) {
	let siblingsArrayNew = [];
	let parentsIDArray = personObject.parents;
	let siblingsArrayOld = people.filter(function(person) {
		if (person.parents.length == 0 || person == personObject) {
			return false;
		} else if (person.parents.length == 1 && parentsIDArray.includes(person.parents[0])) {
			return true;
		} else if (
			person.parents.length == 2 &&
			(parentsIDArray == person.parents ||
				person.parents.includes(parentsIDArray[0]) ||
				person.parents.includes(parentsIDArray[1]))
		)
			return true;
	});
	for (let person of siblingsArrayOld) {
		if (person.gender == 'male') {
			let brotherObject = familyObjectMaker(person, 'Brother');
			siblingsArrayNew.push(brotherObject);
		} else {
			let sisterObject = familyObjectMaker(person, 'Sister');
			siblingsArrayNew.push(sisterObject);
		}
	}
	return siblingsArrayNew;
}

function findSpouse(personObject) {
	let spouseArray = [];
	people.filter(function(person) {
		if (personObject.currentSpouse == person.id && person.gender) {
			if (person.gender == 'male') {
				spouseArray.push(familyObjectMaker(person, 'Husband'));
			} else if (person.gender == 'female') {
				spouseArray.push(familyObjectMaker(person, 'Wife'));
			}
			return true;
		}
	});
	return spouseArray;
}

function findChildren(personObject) {
	let childrenArray = [];
	people.filter(function(person) {
		if (person.parents.includes(personObject.id)) {
			if (person.gender == 'male') {
				childrenArray.push(familyObjectMaker(person, 'Son'));
			} else if (person.gender == 'female') {
				childrenArray.push(familyObjectMaker(person, 'Daughter'));
			}
			return true;
		}
	});
	return childrenArray;
}

//familySearch takes in an ID number (which will be input by the user) and calls the previous group of functions in order to generate arrays of people
//who are immediate family members. It then concatenates those arrays, and finally passes that array into the original createCustomTable function
//in order to generate a table with the results.

function familySearch(idNumber) {
	let personObject = findObjectByIdNum(idNumber);
	let parents = findParents(personObject);
	let siblings = findSiblings(personObject);
	let spouse = findSpouse(personObject);
	let children = findChildren(personObject);
	let familyArray = parents.concat(siblings.concat(spouse.concat(children)));

	let familyTable = document.getElementById('family-table');
	createCustomTable(familyTable, Object.keys(familyArray[0]), familyArray);
	// fillTableCustomHeadings(familyArray, 'family-table');
	return familyArray;
}

//===Reset button===
const btnThree = document.querySelector('.btnThree');

btnThree.addEventListener('click', () => {
	location.reload();
});

//Creating ID number dropdown lists for descendant and family searches

let sortedPeople = people.sort((a,b) =>{
    return a.id-b.id;
})

let sortedIdArray = [];
for (let i = 0; i<sortedPeople.length; i++){
    sortedIdArray.push(parseInt(sortedPeople[i].id));
}

let idList = '';
for (let i=0; i<sortedIdArray.length; i++){
	idList += `<option value=${sortedIdArray[i]}>`;
}

document.getElementById('idNum').innerHTML = idList;

