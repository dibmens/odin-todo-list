import Project, { createNewProject, getActiveProjects } from "./userProjects";

let activeProject = createNewProject(`Test Project`);
let otherProject = createNewProject(`Shopping List`);

activeProject.createTask(`Do laundry`, `30 minutes`, `Medium`);
activeProject.createTask(`Go shopping`, `Afternoon`, `If there's time`);
activeProject.createTask(`Code`, `Evening`, `Top Priority!!!`);

otherProject.createTask(`Milk`);
otherProject.createTask(`Menthol Cigarets`);
otherProject.createTask(`Laundry Detergent`);
otherProject.createTask(`Potato Chips`);



console.log(activeProject);


export default function loadProjectPage(){

    let content = document.querySelector(`.content-page`);
    let projectPage = `
    
    <div class="open-project-title">
        PROJECT TITLE
    </div>
    <div class="open-project">
        <div class="box-wrapper">
            <div class="inbox box">
                
                <!-- current task notes <div class="task">Take out the trash 1</div>-->
            </div>
            <div class="inbox-status">
                INBOX
            </div>
        </div>
        <div class="box-wrapper">
            <div class="outbox box">
                <!-- completed task notes <div class="task">Take out the trash 1</div>-->
            </div>
            <div class="outbox-status">
                OUTBOX
            </div>
        </div>
    </div>
    <div class="project-bar">
       
    </div>
    <div class="tool-bar">
        <button class="tool new-note"></button>
        <button class="tool sort-priority"></button>
        <button class="tool sort-time"></button>
        <button class="tool stamp-void"></button>
        <button class="tool stamp-done"></button>  
    </div>
    <div class="tool-bar">
        <button class="tool motivation"></button>
        <button class="tool archive-project"></button>
    </div>`;

    content.insertAdjacentHTML(`afterbegin`, projectPage);
    projectActions();
    loadTasks();
    loadProjects();
};

function loadProjects(){
    console.log(getActiveProjects());
    let projectBar = document.querySelector(`.project-bar`);
    let projectFolder = `
        <button class="project-button">
            <div class="project-button-icon"></div>
            <div class="project-button-title"></div>
            <div class="project-progress"></div>
        </button>`;
    let newProjectButton = `
        <button class="project-button add-new">
            <div class="project-button-icon add-new"></div>
            <div class="project-button-title add-new"></div>
            <div class="project-progress">ADD NEW</div>
       </button>`;
    projectBar.innerHTML = ``;
    projectBar.insertAdjacentHTML(`afterbegin`, newProjectButton);
    getActiveProjects().forEach((project) => {
        let inboxCount = project.getInbox().length;
        let outboxCount = project.getOutbox().length;
        projectBar.insertAdjacentHTML(`afterbegin`, projectFolder);
        document.querySelector(`.project-button-title`).innerText = 
            project.getProjectName();
        document.querySelector(`.project-progress`).innerText = 
            `${outboxCount} / ${inboxCount + outboxCount}`;
    })

    
}


function loadTasks(){
    let projectInbox = activeProject.getInbox();
    let projectOutbox = activeProject.getOutbox();
    let inbox = document.querySelector(`.inbox`);
    let outbox = document.querySelector(`.outbox`);

    inbox.innerHTML = ``;
    outbox.innerHTML = ``;

    projectInbox.forEach((task) => {
        let note = document.createElement(`div`);
        note.classList.add(`task`);
        note.innerText = `${task.task}`;
        inbox.append(note);
    });

    projectOutbox.forEach((task) => {
        let note = document.createElement(`div`);
        note.classList.add(`task`);
        note.classList.add(`${task.stamp}`.toLowerCase());
        // note.classList.add(`done`);
        note.innerText = `${task.task}`;
        outbox.append(note);
        console.log(task.stamp);
    });

    function displayInboxTaskCount(){
        let taskCounter = document.querySelector(`.inbox-status`);
        if(activeProject.getInbox().length >= 0){
            taskCounter.innerText = `INBOX (${activeProject.getInbox().length})`;
        }
    }

    function displayProjectTitle(){
        let titleDiv = document.querySelector(`.open-project-title`);
        let title = activeProject.getProjectName();
        titleDiv.innerText = title.toUpperCase();
    }

    displayProjectTitle();
    displayInboxTaskCount();

}

export function openNoteForm(){
    let newNote = `
    <div class="task-menu task">
        <form class="note-form" action="">
            <div class="form-title">NEW NOTE</div>
            <div class="form-member task-box">
                <label class="form-label" for="input-task">Task</label>
                <input id="input-task" required>
            </div>
            <div class="form-member time-box">
                <label class="form-label" for="input-time">Time</label>
                <input id="input-time" list="time">
                <datalist id="time">
                    <option value="5 - 15 Minutes">Quick</option>
                    <option value="30 - 45 Minutes">Short</option>
                    <option value="60 - 90 Minutes">Focused</option>
                    <option value="3 - 4 Hours">Dedicated</option>
                    <option value="All Day">Long</option>
                </datalist>
            </div>
            <div class="form-member importance-box">
                <label class="form-label" for="input-importance">Importance</label>
                <input id="input-importance" list="importance">
                <datalist id="importance">
                    <option value="Low">If time allows</option>
                    <option value="Medium">Sooner or later</option>
                    <option value="High">Essential</option>
                </datalist>
            </div>
            <div class="form-button-wrap">
                <button class="form-button create" type="submit">CREATE</button>
                <button class="form-button cancel" type="submit">CANCEL</button>
            </div>
        </form>
    </div>`

    document.querySelector(`.inbox`).insertAdjacentHTML('beforeend', newNote);

    let form = document.querySelector(`.note-form`);

    function createNote(){
        activeProject.createTask(form[0].value, form[1].value, form[2].value);
        form.reset();
        loadTasks();
        loadProjects();
        }

    // Create form button
    document.querySelector(`.create`).addEventListener(`click`, (event) => {
        event.preventDefault();
        if(form[0].value){
            createNote();
            console.log(activeProject.getInbox())
        } else {
            form.reportValidity();
        }
        
    });

    // Cancel form button
    document.querySelector(`.cancel`).addEventListener(`click`, (event) => {
        event.preventDefault();
        loadTasks();
    });
};

function projectActions(){
    document.querySelectorAll(`.tool`).forEach(button => 
        button.addEventListener(`click`, () => {
            if(button.classList.contains(`new-note`)){
                if(!document.querySelector(`.note-form`))
                openNoteForm();
            }
            if(button.classList.contains(`stamp-done`)){
                if(activeProject.getInbox().length > 0){
                    activeProject.stampNote(`Done`);
                    loadTasks();
                    loadProjects();
                }
            }

            if(button.classList.contains(`stamp-void`)){
                if(activeProject.getInbox().length > 0){
                    activeProject.stampNote(`Void`);
                    loadTasks();
                    loadProjects();
                }
            }
        }) )
}


