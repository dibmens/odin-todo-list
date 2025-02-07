
import Projects from './data/projects.json';

export default function loadProjectPage(){
    let content = document.querySelector(`.content-page`);
    let openProject = Projects[0]; 

    let projectPage = `
    <div class="open-project-title">
        ${openProject.project.toUpperCase()}
    </div>
    <div class="open-project">
        <div class="box-wrapper">
            <div class="inbox box">
                <!-- current task notes <div class="task">Take out the trash 1</div>-->
            </div>
            <div class="inbox-status">
                INBOX (3)
            </div>
        </div>
        <div class="box-wrapper">
            <div class="outbox box">
                <!-- completed task notes <div class="task">Take out the trash 1</div>-->
            </div>
            <div class="outbox-status">
                OUTBOX (80%)
            </div>
        </div>
    </div>
    <div class="project-bar">
       <!-- project folder <button class="project-button">12
        <div class="project-button-icon"></div>
        <div class="project-button-title">Shopping List</div>
       </button> -->
       
       <button class="project-button add-new">
        <div class="project-button-icon add-new"></div>
        <div class="project-button-title add-new">New Project</div>
       </button>
    </div>
    <div class="tool-bar">
        <button class="tool edit-project"></button>
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
    
Projects.forEach((project) => {
    let projectIcon = `
        <button class="project-button">
            <div class="project-button-icon"></div>
            <div class="project-button-title">${project.project}</div>
        </button>`;

    document.querySelector(`.project-bar`).insertAdjacentHTML(`afterbegin`, projectIcon);
});

openProject.tasks.forEach((task) => {
    let note = `<div class="task">${task.task}</div>`;
    if(task.status == "active"){
        document.querySelector(`.inbox`).insertAdjacentHTML(`beforeend`, note);
    } else {
        document.querySelector(`.outbox`).insertAdjacentHTML(`beforeend`, note);
    };
});

}