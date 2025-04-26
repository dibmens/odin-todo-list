import _ from 'lodash';
import './style.css';
import loadLandingPage from './landingPage';
import Project, { activeProjects, fetchProjects, getActiveProjects, storeProjects } from './userProjects';
import loadProjectPage from './projectPage';


menuActions();
// loadLandingPage();
loadProjectPage();




function menuActions(){
    let menuButton = document.querySelector(".settings");
    let menuWindow = document.querySelector(".menu-window");
    let homeButton = document.querySelector(".button-home");
    let clearDataButton = document.querySelector(".button-clear-data");

    menuButton.addEventListener("click", () => {
        menuWindow.classList.contains("hidden") ? 
            menuWindow.classList.remove("hidden") :
            menuWindow.classList.add("hidden");
    });

    homeButton.addEventListener("click", ()=> {
        loadLandingPage();
    });

    clearDataButton.addEventListener("click", ()=> {
        localStorage.clear();
        location.reload();
    });
}

