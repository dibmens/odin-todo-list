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
    let archiveButton = document.querySelector(".button-archive");
    let clearDataButton = document.querySelector(".button-clear-data");

    menuButton.addEventListener("click", () => {
        menuWindow.classList.contains("hidden") ? 
            menuWindow.classList.remove("hidden") :
            menuWindow.classList.add("hidden");
    });

    homeButton.addEventListener("click", ()=> {
        loadLandingPage();
    });

    archiveButton.addEventListener("click", ()=> {
        loadArchive();
    });

    clearDataButton.addEventListener("click", ()=> {

        let confirmationWindow = document.createElement(`dialog`);
        confirmationWindow.classList.add(`confirmation-window`)
        confirmationWindow.innerHTML = `
            <p>Delete all Active and Archived projects?</p>
            <div>
                <button class="confirm-button">DELETE</button>
                <button class="cancel-button">CANCEL</button>
            </div>
            `;
        document.querySelector(`.header`).append(confirmationWindow);
        confirmationWindow.showModal();

        let confirm = document.querySelector(`.confirm-button`);
        let cancel = document.querySelector(`.cancel-button`);

        confirm.addEventListener(`click`, ()=> {
            localStorage.clear();
            location.reload();
        });

        cancel.addEventListener(`click`, ()=> {
            confirmationWindow.remove();
        });

    });

}


function loadArchive(){
    let archiveWindow = document.createElement(`dialog`)
    let confirmButton = document.createElement(`button`);
    archiveWindow.classList.add(`archive-window`);
    confirmButton.classList.add(`confirm-button`);
    confirmButton.innerText = `CLOSE`;
    archiveWindow.innerHTML = `
        <h2>Project Archive</h2>
    `


    Project.getArchivedProjects().forEach((project) => {
        let projectTitle = document.createElement(`div`);
        projectTitle.classList.add(`archived-project`);
        projectTitle.innerHTML =  `
            <h4>${project.getProjectName()}</h4>
        `

        project.getOutbox().forEach((task)=>{
            let taskEntry = document.createElement(`div`);
            taskEntry.classList.add(`archived-task`);
            taskEntry.innerHTML = `
                <p class="archived-task-date">${task.deadline}</p>
                <p class="archived-task-title">${task.task}</p>
            `;
            projectTitle.append(taskEntry);
        });

        archiveWindow.append(projectTitle);
        archiveWindow.append(confirmButton);
    });

    document.querySelector(`.header`).append(archiveWindow);
    archiveWindow.showModal();

    confirmButton.addEventListener(`click`, ()=> {
        archiveWindow.remove();
    })

}