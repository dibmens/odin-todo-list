import _ from 'lodash';
import './style.css';
import loadLandingPage from './landingPage';
import Project from './userProjects';
import loadProjectPage from './projectPage';




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

    document.querySelector(`.content`).addEventListener(`mouseover`, ()=> {
        menuWindow.classList.add(`hidden`);
    })

}


function loadArchive(){
    let archiveWindow = document.createElement(`dialog`);
    let confirmButton = document.createElement(`button`);
    let emptyPrompt = document.createElement(`div`);
    archiveWindow.classList.add(`archive-window`);
    confirmButton.classList.add(`confirm-button`);
    confirmButton.innerText = `CLOSE`;
    archiveWindow.innerHTML = `<h2>PROJECT ARCHIVE</h2>`;
    emptyPrompt.innerHTML = `You haven't completed any projects yet`

    if(Project.getArchivedProjects().length < 1){
        archiveWindow.append(emptyPrompt);
    }

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
        
    });

    archiveWindow.append(confirmButton);

    document.querySelector(`.header`).append(archiveWindow);
    archiveWindow.showModal();

    confirmButton.addEventListener(`click`, ()=> {
        archiveWindow.remove();
    })

}

menuActions();
loadProjectPage();
loadLandingPage();
