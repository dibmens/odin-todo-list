import _ from 'lodash';
import './style.css';
import loadLandingPage from './landingPage';
import Project, { activeProjects } from './userProjects';
import loadProjectPage from './projectPage';


loadLandingPage(); 
// loadProjectPage();

let saturday = new Project(`Saturday`);
console.log(saturday.getProjectName());

saturday.createTask("Do laundry", 15, 3);
saturday.createTask("Do coding", 360, 5);
saturday.createTask("Daily exercise", 15, 4);
saturday.createTask("Read 3 chapters", 120, 2);
saturday.createTask("French lesson", 5, 1);


// saturday.sortInbox("time");


// console.log(saturday.getInbox());

// saturday.sortInbox("time");

// console.log(saturday.getInbox().reverse());



// function isSorted(){
//     let testArray = [];
//     let inbox = [1,2,3,4,10,11];
//     for(let i = 0; i < inbox.length-1; i++){
//         testArray.push(inbox[i] < inbox[i+1])
//     };
//     return testArray.every((element) => element === true);
// }

// console.log(isSorted());