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
      break;
    case 'no':
      // TODO: search by traits
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

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      alert(person.firstName + " " + person.lastName + "Gender:" + person.gender + "DOB:" + person.dob + "Eye Color" + person.eyeColor + "Height:" + person.height + "Weight:" + person.weight + "Age:" + person.age + "Occupation" + person.occupation); 
    
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
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(people){
  let gender = promptFor("Is this person a 'male' or 'female'?", chars);
  let foundGender = people.filter(function(person){
    if(person.gender.toLowerCase() === gender.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundGender;

}

function searchByEyeColor(people){
  let eyeColor = promptFor("Please enter the individuals eyecolor?", chars);
  let foundEyeColor = people.filter(function(person){
    if (person.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundEyeColor;
}

function searchByHeight(people){
  let height = promptFor("Please enter the individuals hieght?", chars);
  let foundHeight = people.filter(function(person){
    if(person.height === height) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundHeight;
}

function searchByWeight(people){
  let weight = promptFor("Please enter the individuals weight?", chars);
  let foundWeight = people.filter(function(person){
    if(person.weight === weight) {
      return true;
    }
    else {
      return false;
    }
  });
  return foundWeight;
}

function searchByOccupation(people){
  let occupation = promptFor("Please enter the individuals weight?", chars);
  let foundOccupation = people.filter(function(person){
    if(person.occupation === occupation) {
      return true;
    } 
    else {
      return false;
    }
  });
  return foundOccupation;
}

function getDescendants(people, person){
  let foundDescendants = people.filter(function(person){
    if (people.person.lenth > 0) {
  return true;
}
    else {
  return false;
}
  
});

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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
