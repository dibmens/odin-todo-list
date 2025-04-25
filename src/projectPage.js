import Project from "./userProjects";

let openProject;

export default function loadProjectPage(){

    let content = document.querySelector(`.content`);
    let projectPage = `
    <div class="project-wrapper">
        <div class="open-project-title"></div>
        <div class="open-project">
            <div class="box-wrapper">
                <div class="inbox box">
                </div>
                <div class="inbox-status">
                    INBOX
                </div>
            </div>
            <div class="box-wrapper">
                <div class="outbox box">
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
        </div>
    </div>`;
    
    content.innerHTML = ``;
    content.insertAdjacentHTML(`afterbegin`, projectPage);

    Project.fetchUserProjects();
    loadTasks();
    loadProjects();
    projectActions();
};

function loadProjects(){
    
    let projectBar = document.querySelector(`.project-bar`);
    projectBar.innerHTML = ``;
    Project.getActiveProjects().forEach((project,index) => {
        let inboxCount = project.getInbox().length;
        let outboxCount = project.getOutbox().length;
        let projectButton = document.createElement(`button`);
        projectButton.classList.add(`project-button`);
        projectButton.innerHTML = `
            <div class="project-button-icon"></div>
            <div class="project-button-title">
                ${project.getProjectName()}
            </div>
            <div class="project-progress">
                ${outboxCount} / ${inboxCount + outboxCount}
            </div>`;
        projectBar.append(projectButton);
    });

    let newProjectButton = document.createElement(`button`);
    newProjectButton.classList.add(`new-project-button`);
    newProjectButton.innerHTML = `
        <div class="project-button-icon add-new"></div>
        <div class="project-button-title" style="color:green">NEW</div>
        <div class="project-progress" >
            PROJECT
        </div>`;

    projectBar.append(newProjectButton);

    projectButtonActions();
    
}

function projectButtonActions(){
    let folders = document.querySelectorAll(`.project-button`);
    let newFolderButton = document.querySelector(`.new-project-button`);
    folders.forEach((button, index) => 
        button.addEventListener(`click`, () => {                
            openProject = Project.getActiveProjects()[index];
            loadTasks();
            folders.forEach(folder => folder.firstElementChild.classList.remove(`open`));
            button.firstElementChild.classList.add(`open`);
        })
    );
    newFolderButton.addEventListener(`click`, () => {
        openProjectForm();
    })
}

function loadTasks(){
    
    if(openProject){
        let projectInbox = openProject.getInbox();
        let projectOutbox = openProject.getOutbox();
        let inbox = document.querySelector(`.inbox`);
        let outbox = document.querySelector(`.outbox`);

        inbox.innerHTML = ``;
        outbox.innerHTML = ``;
        
        projectInbox.forEach((task) => {
            let note = document.createElement(`div`);
            let deadline = document.createElement(`div`);
            let dueDate = new Date(task.deadline);
            let priority = document.createElement(`div`);
            let importance = 
                task.priority == 1? "Low Priority"
                :task.priority == 2? "" : "Top Priority!";
            
            note.classList.add(`task`);
            note.classList.add(`note-view`);
            deadline.classList.add(`task-deadline`);
            priority.classList.add(`task-priority`);
            note.innerText = `${task.task}`;
            deadline.innerText = `by ${dueDate.toDateString().slice(4,10)}`;
            priority.innerText = `${importance}`;
            inbox.append(note);
            note.append(deadline);
            note.append(priority);
        });

        projectOutbox.forEach((task) => {
            let note = document.createElement(`div`);
            note.classList.add(`task`);
            note.classList.add(`note-view`);
            note.classList.add(`${task.stamp}`.toLowerCase());
            note.innerText = `${task.task}`;
            outbox.append(note);
        });

        function displayInboxTaskCount(){
            let taskCounter = document.querySelector(`.inbox-status`);
            if(openProject.getInbox().length >= 0){
                taskCounter.innerText = `INBOX (${openProject.getInbox().length})`;
            }
        }

        function displayProjectTitle(){
            let titleDiv = document.querySelector(`.open-project-title`);
            let title = openProject.getProjectName();
            titleDiv.innerText = title.toUpperCase();
        }

        function toggleList(){
            let taskList = document.querySelectorAll(`.task`);
            taskList.forEach((task,index) => {
                task.addEventListener(`click`, () => {
                    if(task.classList.contains(`note-view`)){
                        taskList.forEach((task) => {
                            task.classList.replace(`note-view`,`list-view`);
                        })
                    } else {
                        openProject.pickTask(index);
                        Project.saveUserProjects();
                        loadTasks();
                        loadProjects();
                    }
                })
            })
        }

        displayProjectTitle();
        displayInboxTaskCount();
        toggleList();
    }

}

function openNoteForm(){
    let date = new Date();
    let newNote = `
    <div class="task-menu task">
        <form class="note-form" action="">
            <div class="form-title">NEW NOTE</div>
            <div class="form-member task-box">
                <label class="form-label" for="input-task">Task</label>
                <input id="input-task" required>
            </div>
            <div class="form-member deadline-box">
                <label class="form-label" for="input-deadline">Due Date</label>
                <input type="date" id="input-deadline" 
                min="${date.toISOString().split("T")[0]}"
                value="${date.toISOString().split("T")[0]}">
            </div>
            <div class="form-member priority-box">
                <label class="form-label" for="input-priority">Priority</label>
                <select id="input-priority">
                    <option value="1">Low</option>
                    <option selected value="2">-</option>
                    <option value="3">High</option>
                </select>
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
        openProject.createTask(form[0].value, form[1].value, form[2].value);
        form.reset();
        Project.saveUserProjects();
        loadTasks();
        loadProjects();
        }

    // Create form button
    document.querySelector(`.create`).addEventListener(`click`, (event) => {
        event.preventDefault();
        if(form[0].value){
            createNote();
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
                if(openProject.getInbox().length > 0){
                    openProject.stampNote(`Done`);
                    Project.saveUserProjects();
                    loadTasks();
                    loadProjects();
                    
                }
            }

            if(button.classList.contains(`stamp-void`)){
                if(openProject.getInbox().length > 0){
                    openProject.stampNote(`Void`);
                    Project.saveUserProjects();
                    loadTasks();
                    loadProjects();
                }
            }

            if(button.classList.contains(`archive-project`)){
                localStorage.clear();
                Project.saveUserProjects();
            }

            if(button.classList.contains(`motivation`)){
                Project.fetchUserProjects();
                loadProjectPage();
            }
        }) 
    );
}

function openProjectForm(){
    let content = document.querySelector(`.content`);
    let dialogWindow = document.createElement(`dialog`);
    let currentTitle = document.querySelector(`.open-project-title`).innerText;
    let form = document.createElement(`form`);
    form.classList.add(`project-form`);
    form.innerHTML = `
            <label for="project title">Enter Project Title</label>
            <input id="project-title" placeholder="My Project" required >
            <div class="form-button-wrap">
                <button class="form-button create-project">CREATE</button>
                <button class="form-button cancel-project">CANCEL</button>
            </div>`;
    dialogWindow.append(form);
    content.append(dialogWindow);
    dialogWindow.showModal();

    form[1].addEventListener(`click`, (event) => {
        event.preventDefault();
        if(form[0].value){
            dialogWindow.close();
            Project.createNewProject(form[0].value);
            Project.saveUserProjects();
            loadTasks();
            loadProjects();
            let projectFolders = document.querySelectorAll(`.project-button`);
            projectFolders[projectFolders.length-1].click();
        } else {
            form.reportValidity();
        }
    });

    form[2].addEventListener(`click`, (event) => {
        event.preventDefault();
        dialogWindow.close();
    });
}