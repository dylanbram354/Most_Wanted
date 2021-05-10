'use strict';

//Dynamic table construction
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

function createCustomTable(table, headingsArray, objectArray){
    createThead(table, headingsArray);
    createTable(table, objectArray);
}

//constructing tables with text
function fillTableCustomHeadings(array, tableID){
    let heading = '<thead>';
    for (let keys in array[0]){
        heading += `<th>${keys}</th>`
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
	document.getElementById(tableID).innerHTML = heading + body;
}

//Display all people
const btnTwo = document.getElementById('btnTwo');
const firstDiv = document.querySelector('.hidden');

btnTwo.addEventListener('click', function() {
	firstDiv.classList.toggle('hidden');
	fillTable(people, "all-people");
});

//Search functions
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
            //&& (person.parents ==parentsInput || parentsInput == "") // problem with array equality?
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


function searchDescendants(idInput){
    let descendants = [];
    let children = people.filter(function(person){
        if (person.parents.includes(Number(idInput))){
            descendants = descendants.concat(searchDescendants(person["id"]));
            return true
        }
        return false
    })

    descendants = descendants.concat(children);
    return descendants;
}

function fillDescendantSearchTable(){
    let searchInput = document.forms['descendant-search']['id'].value;
    let results = searchDescendants(searchInput);
    fillTable(results, "descendant-table");
}

function findObjectByIdNum(idNumber){
    let personObject = people.filter(function(person){
        if (person.id == idNumber){
            return true
        }
        return false
    })
    personObject = personObject[0];
    return personObject;
}

function familyObjectMaker(personObject,relationship){
    let newObject = {
        "First Name":personObject.firstName,
        "Last Name":personObject.lastName,
        "Relationship":relationship
    }
    return newObject;
}
function findParents(personObject){
    let parentsIDArray = personObject['parents'];
    let parentsObjectArray = [];
    people.filter(function(person){
        if (parentsIDArray.includes(person.id) && person.gender == "male"){
            let fatherObject = familyObjectMaker(person, "Father");
            parentsObjectArray.push(fatherObject);
            return true;
        }
        else if (parentsIDArray.includes(person.id) && person.gender == "female"){
            let motherObject = familyObjectMaker(person, "Mother");
            parentsObjectArray.push(motherObject);
            return true;
        }
        return false;
    })
    return parentsObjectArray;
}


function findSiblings(personObject){
    let siblingsArrayNew = [];
    let parentsIDArray = personObject.parents;
    let siblingsArrayOld = people.filter(function(person){
        if (person.parents.length == 0 || person == personObject){
            return false;
        }
        else if (person.parents.length == 1 && parentsIDArray.includes(person.parents[0])){
            return true;
        }
        else if (person.parents.length == 2 && (parentsIDArray == person.parents || person.parents.includes(parentsIDArray[0]) || person.parents.includes(parentsIDArray[1])))
            return true;
    })
    for (let person of siblingsArrayOld){
        if (person.gender == 'male'){
            let brotherObject = familyObjectMaker(person, "Brother");
            siblingsArrayNew.push(brotherObject);
        }
        else{
            let sisterObject = familyObjectMaker(person, "Sister");
            siblingsArrayNew.push(sisterObject);
        }
    }
    return siblingsArrayNew;
}

function findSpouse(personObject){
    let spouseArray=[];
    people.filter(function(person){
        if (personObject.currentSpouse == person.id && person.gender){
            if (person.gender =='male'){
                spouseArray.push(familyObjectMaker(person,'Husband'));
            }
            else if (person.gender == 'female'){
                spouseArray.push(familyObjectMaker(person,"Wife"));
            }
            return true;
        }
    })
    return spouseArray;
};

function findChildren(personObject){
    let childrenArray = [];
    people.filter(function(person){
        if (person.parents.includes(personObject.id)){
            if (person.gender =='male'){
                childrenArray.push(familyObjectMaker(person,'Son'));
            }
            else if (person.gender == 'female'){
                childrenArray.push(familyObjectMaker(person,"Daughter"));
            }
            return true;
        }
    })
    return childrenArray;
}


function familySearch(idNumber){
    let personObject = findObjectByIdNum(idNumber);
    let parents = findParents(personObject);
    let siblings = findSiblings(personObject);
    let spouse = findSpouse(personObject);
    let children = findChildren(personObject);
    let familyArray = parents.concat(siblings.concat(spouse.concat(children)));

    let familyTable = document.getElementById('family-table');
    createCustomTable(familyTable, Object.keys(familyArray[0]),familyArray);
    //fillTableCustomHeadings(familyArray, 'family-table');
    return familyArray;
}

