import Project from "./userProjects";
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
                <div class="task-menu">
                    <form class="form-wrap" action="">
                        <div class="form-title">NEW TASK</div>
                        <div class="form-member task-box">
                            <label class="form-label" for="input-task">Task</label>
                            <input id="input-task" required>
                        </div>
                        <div class="form-member time-box">
                            <label class="form-label" for="input-time">Time</label>
                            <input id="input-time" list="time">
                            <datalist id="time">
                                <option value="Short">5-15 Minutes</option>
                                <option value="Medium">60-90 Minutes</option>
                                <option value="Long">Couple Hours</option>
                                <option value="Dedicated">Working Day</option>
                                <option value="Long-term">Multiple Days</option>
                            </datalist>
                        </div>
                        <div class="form-member importance-box">
                            <label class="form-label" for="input-importance">Importance</label>
                            <input id="input-importance" list="importance">
                            <datalist id="importance">
                                <option value="Low">Can be postponed</option>
                                <option value="Medium">Sooner or later</option>
                                <option value="High">A must-do</option>
                            </datalist>
                        </div>
                        <button class="form-button" type="submit">CREATE</button>
                    </form>
                </div>
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

// export function loadTasks(){
//     let inbox = document.querySelector(`.inbox`);
//     let outbox = document.querySelector(`.outbox`);

//     inbox.innerHTML = ``;
//     outbox.innerHTML = ``;

//     openProject.tasks.forEach((task) => {
//         let note = document.createElement(`div`);
//         note.classList.add(`task`)
//         note.innerText = `${task.task}`;
//         if(task.status == "active"){
//             inbox.append(note);
//         } else {
//             outbox.prepend(note);
//             if(task.status == "done"){
//                 note.classList.toggle(`done`);
//             } else {
//                 note.classList.toggle(`void`);
//             };
//         };
    
//     });

    // console.log(document.querySelector(`.inbox`).lastChild.innerText)
    // console.log(document.querySelector(`.inbox`))
    // console.log(openProject.tasks.filter((task) => task.status == `active`))
// }

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