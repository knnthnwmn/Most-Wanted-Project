"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      mainMenu(searchResults, people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info": 
      alert(displayPerson(person));
      // TODO: get person's info
    break;
    case "family":
      let immediateFamily = []
        immediateFamily = getImmediateFamily(person, people);
        if (immediateFamily.length > 1) {
          displayPeople(immediateFamily)
        }
      else if (immediateFamily === 1) {
        displayPeople(immediateFamily[0])
      }
      else (person, people);
    break;
    // TODO: get person's family
    
  case "descendants":
    // TODO: get person's descendants
    let descendantsFamily = []
      descendantsFamily = getDescendents(person, people);
      if (descendantsFamily.lenth > 0) {
        console.log("heres a list of your descendents");
        displayPeople(descendantsFamily)
      }
      else {
        alert("this person has no descendants");
        mainMenu(person, people);
      }
    break;
    
    case "restart":
      app(people); 
      break;

    case "quit":
      return; 
    
      default:
      return mainMenu(person, people); 
    }
    
    mainMenu(person, people); // ask again
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  });
  // TODO: find the person using the name they entered
   return foundPerson;
}

function searchByTrait(people){
 let characteristic = promptFor("What characteristc would you like to search by?", chars)
 let searchResults;
 
  switch(characteristic){
    case "gender":
    searchResults = searchByGender(people)
    break;
    case "dob":
    searchResults = searchByDob(people);
    break;
    case "height":
      searchResults = searchByHeight(people);
      break;
    case "weight":
    searchResults = searchByWeight(people);
      break;
    case `eye color`:
    searchResults = searchByEyeColor(people);
      break;
    case "quit":
        return; // stop execution
      default:
        return searchByTrait(characteristic);
  }
 
  alert(searchResults);
}





function searchByGender(people){
  let gender = promptFor("Is this person a 'male' or 'female'?", chars);
  let foundGender;
  let foundPerson; 
   foundGender = people.filter(function(person){
  for(let i = 0; i <= people.length; i++){
    if(person.gender === gender){
      return foundPerson +=  person.firstName + " " + person.lastName +"\n";

    }
    else{
      return false;
      }
    }
})
   return foundPerson;
}


function searchByEyeColor(people){
  let eyeColor = promptFor("Please enter the individuals eye color?", traits);
  let foundPerson;
  let foundEyeColor;
    foundEyeColor = people.filter(function(person){
  for(let i = 0; i <= people.length; i++){
    if (person.eyeColor === eyeColor) {
      return foundPerson +=  person.firstName + " " + person.lastName +"\n";
    }
    else {
      return false;
    }
  }
})
  return foundPerson;
}


function searchByHeight(people){
  let height = promptFor("Please enter the individuals hieght?", chars);
  let foundPerson;
  let foundHeight;
    foundHeight = people.filter(function(person){
  for(let i = 0; i <= people.length; i++){
    if(person.height == height) {
      return foundPerson +=  person.firstName + " " + person.lastName +"\n";
    }
    else {
      return false;
    }
  }
  })
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("Please enter the individuals weight?", chars);
  let foundPerson;
  let foundWeight;
    foundWeight = people.filter(function(person){
  for(let i = 0; i <= people.length; i++){
    if(person.weight == weight) {
      return foundPerson +=  person.firstName + " " + person.lastName +"\n";
    }
    else {
      return false;
    }
  }
  })
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("Please enter the individuals weight?", chars);
  let foundPerson;
  let foundOccupation
    foundOccupation = people.filter(function(person){
    for(let i = 0; i <= people.length; i++){
    if(person.occupation === occupation) {
      return foundPerson +=  person.firstName + " " + person.lastName +"\n";
    } 
    else {
      return false;
    }
    }
  })
  return foundPerson;
}



function descendantInfo(person, people, getAllDescendants){
	let descendantsArray = people.filter(function(el){
		for(let i = 0; i < el.parents.length; i++){
			if(person.id === el.parents[i]){
				return true;
			}
		}
	});
	if (getAllDescendants){
		for(let j = 0; j < descendantsArray.length; j++){
			descendantsArray.push.apply(descendantsArray, descendantInfo(descendantsArray[j], people, true));
		}
  }
    return descendantsArray;
}


function immediateFamily (person, people) {
  let family = [];
  if (person.parents[0] !== undefined){
    for (let i = 0; i < person.parents.length; i++){
      let parentId = person.parents[i];
      for (let i = 0; i < people.length; i++){
        if (people[i].id === parentId){
          people[i].Relation = "Parent";
          family.push(people[i]);
          
        }
      }
    }
  }
  let spouse = people.filter(function (el){
    if(el.id === person.currentSpouse)
    return true;
  });
  for (let i = 0; i < spouse.length; i++){
    spouse[i].Relation = "Spouse"
    family.push(spouse[i]);
  }
  let kids = people.filter(function (el){
    for (let i = 0; i < el.parents.length; i++){
      if (el.parents[i] === person.id){
        return true;
      }
    }
  });
  for (let i = 0; i < kids.length; i++){
    kids[i].Relation = "Child";
    family.push(kids[i]);
  }
  displayObjects(family, "Relation: ");
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo;
  personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";  
  personInfo += "Eye color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation:" + person[0].occupation + "\n";
  personInfo += "Parents: " + person[0].parents + "\n";
  personInfo += "Current spouse: " + person[0].curretSpouse + "\n";
    return personInfo;
  }
  // TODO: finish getting the rest of the information to display
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function traits(input){
  return input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height" 
  || input.toLowerCase() == "weight" || input.toLowerCase() == "eye color" || input.toLowerCase() == "occupation";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
