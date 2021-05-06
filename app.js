'use strict';

function searchByName(){
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        if(person.firstName === firstNameInput && person.lastName === lastNameInput){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        console.log(filteredPeople);
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}

//Hi Eric!
//I kept the function pretty general so it can be reused if/when we change the "people" array

function makeTable(array){ //function that takes in array of objects
    let table = document.getElementById("table"); //linking to the table in index

    let headingsRow = document.getElementById("headings"); //linking to the row for headings
    let firstObject = array[0]; //grabbing the first element in the array 

    for (let i in firstObject){ //this goes through each "key" (descriptor; id firstname lastname etc.) in the object (the person)
        let newHeading = document.createElement("th"); //creates a new heading for each key
        headingsRow.appendChild(newHeading);
        newHeading.innerHTML = i; //adds the key to the heading
    }
    
    for (let i = 0; i<array.length; i++){ //loops through the array
        let newRow = document.createElement("tr");
        table.appendChild(newRow); //create a new row in the table for each element in the array (each person)

        let object = array[i];  //grabbing the currently "selected" person

        for (let e in object){ //loops through that person's "keys" (descriptors)
            let newCell = document.createElement("td"); //creates a new cell for each key
            newRow.appendChild(newCell);

            newCell.innerHTML = object[e]; //adds the value to the cell
        }
    }
}

makeTable(people);

//later on if we change the "people" array, we can use the same "makeTable" function to generate a new table with the new array

function addToTable(array){
    let table = document.getElementById("table");
    
    for (let i=0; i<array.length; i++){
        let newRow = document.createElement("tr");
        table.appendChild(newRow);
        let object = array[i];

        for (let e in object){
            let newCell = document.createElement("td");
            newRow.appendChild(newCell)

            newCell.innerHTML = object[e];
        }
    }
}

// let newPeople=[
//     {
// 		"id": 272822514,
// 		"firstName": "Billy",
// 		"lastName": "Bob",
// 		"gender": "male",
// 		"dob": "1/18/1949",
// 		"height": 71,
// 		"weight": 175,
// 		"eyeColor": "brown",
// 		"occupation": "programmer",
// 		"parents": [],
// 		"currentSpouse": 401222887
// 	},
// 	{
// 		"id": 401222887,
// 		"firstName": "Uma",
// 		"lastName": "Bob",
// 		"gender": "female",
// 		"dob": "4/1/1947",
// 		"height": 65,
// 		"weight": 162,
// 		"eyeColor": "brown",
// 		"occupation": "assistant",
// 		"parents": [],
// 		"currentSpouse": 272822514
// 	}
// ]

// addToTable(newPeople); //success!