import Project from "./userProjects";

export let activeProject = new Project(`Friday Chores`);

export default function loadProjectPage(){

    // load the project interface

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
    
};
    // Projects.forEach((project) => {
    //     let projectIcon = `
    //         <button class="project-button">
    //             <div class="project-button-icon"></div>
    //             <div class="project-button-title">${project.project}</div>
    //         </button>`;

    //     document.querySelector(`.project-bar`).insertAdjacentHTML(`afterbegin`, projectIcon);
    // });
// };

// Load current active project into inbox and outbox

export function loadTasks(){
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
        note.classList.add(`${note.stamp}`);
        note.innerText = `${task.task}`;
        inbox.append(note);
    });
}

// Sort inbox tasks by time

// export function sortByTime(){
//     document.querySelector('.sort-time').addEventListener('click', ()=> {
//         let inboxTasks = openProject.tasks.filter((task) => task.status == `active`);
//         inboxTasks.sort((a,b) => a.time < b.time ? 1 : -1);
//         loadTasks();
//     });
// };

// export function finishTask(){
//     let inbox = document.querySelector(`.inbox`);
//         document.querySelector('.stamp-void').addEventListener('click', ()=> {
//         if(inbox.innerHTML){openProject.tasks.forEach((task) => {
//             if(inbox.lastChild.innerText == task.task){
//                 task.status = `void`;
//             }
//         });
//         loadTasks();
//         }
//     });
// }



// document.querySelector(`.new-note`).addEventListener('click',()=> {
    
// })


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
                <button class="form-button save" type="submit">CREATE</button>
                <button class="form-button cancel" type="submit">CANCEL</button>
            </div>
        </form>
    </div>`
    document.querySelector(`.inbox`).insertAdjacentHTML('beforeend', newNote);

    // document.querySelectorAll(`.form-button`).forEach(button =>
    //     button.addEventListener(`click`, (event) => {
    //         event.preventDefault();
    //         if(button.classList.contains(`.save`)){
    //             alert(`oy!`);
    //             createNote();
    //             console.log(activeProject);
    //         }
    //     })
    // )


    document.querySelector(`.save`).addEventListener(`click`, (event) =>{
        event.preventDefault();
        createNote();
        console.log(activeProject.getInbox())
    } )

};

export function createNote(){
    let form = document.querySelector(`.note-form`);
    activeProject.createTask(form[0].value, form[1].value, form[2].value);
    form.reset();
    loadTasks();
}

export function projectTools(){
    document.querySelectorAll(`.tool`).forEach(button => 
        button.addEventListener(`click`, () => {
            if(button.classList.contains(`new-note`)){
                openNoteForm();
            }
            
        }) )
}

