export default class Project {
    #name;
    #active;
    #inbox;
    #outbox;
    
    constructor(name, active = true, inbox = [], outbox = []){
        this.#name = name;
        this.#active = active;
        this.#inbox = inbox;
        this.#outbox = outbox;
    }

    static #activeProjects = [];
    static #archivedProjects = [];

    static getActiveProjects(){
        return Project.#activeProjects;
    }

    static getArchivedProjects(){
        return Project.#archivedProjects;
    }

    static createNewProject(name){
        let newProject = new Project(name);
        Project.getActiveProjects().push(newProject);
        // console.log(Project.saveProjects(Project.getActiveProjects()));
        // console.log(newProject.stringifyProject());
        return newProject;
    }

    static saveUserProjects(){
        let userProjects = Project.#activeProjects.concat(Project.#archivedProjects);
        let convertedProjects = [];

        userProjects.forEach((object) => {
            let savedObject = {
                "name": object.#name,
                "active": object.#active,
                "inbox": object.#inbox,
                "outbox": object.#outbox
            };
            convertedProjects.push(savedObject);   
        });

        localStorage.setItem("userProjects", JSON.stringify(convertedProjects));
    }

    static fetchUserProjects(){
        if(localStorage.getItem("userProjects")){
            let fetchedProjects = JSON.parse(localStorage.getItem("userProjects"));
            Project.#activeProjects = [];
            Project.#archivedProjects = [];

            fetchedProjects.forEach((object) => {
                let project = new Project(
                    object.name,
                    object.active,
                    object.inbox,
                    object.outbox
                )

                if(object.active){
                    Project.#activeProjects.push(project)
                } else {
                    Project.#archivedProjects.push(project)
                }
            });
        } 
    }

    #addNote(task,time,priority,stamp = null){
        return {
            task,
            time,
            priority,
            stamp
        }
    }

    // stringifyProject(){
    //     return JSON.stringify({
    //         "name": this.#name,
    //         "active": this.#active,
    //         "inbox": this.#inbox,
    //         "outbox": this.#outbox
    //     });

    // }

    getProjectName(){
        return this.#name;
    };

    getProjectActivity(){
        return this.#active;
    }

    toggleProjectActivity(){
        this.#active == true ? this.#active = false : this.#active = true;
    }

    getInbox(){
        return this.#inbox;
    };

    getOutbox(){
        return this.#outbox;
    };

    showCompletion(){
        let taskTotal = this.getInbox().length + this.getOutbox().length;
        return Math.trunc(this.getInbox().length / taskTotal)*100;
    };

    createTask(task, time = 10, priority = 1){
        let newNote = this.#addNote(task, time, priority);
        this.getInbox().push(newNote);
    };

    sortInbox(key){
        let inbox = this.getInbox();

        function isSorted(){
            let testArray = [];
            for(let i = 0; i < inbox.length-1; i++){
                testArray.push(inbox[i][key] < inbox[i+1][key])
            };
            return testArray.every((element) => element === true);
        }

        if(inbox.length > 1){
            if(isSorted()){
                inbox.sort((a,b) => a[key] > b[key] ? 1 : -1);
            } else {
                inbox.sort((a,b) => a[key] < b[key] ? 1 : -1);
            };
        };   
    }

    stampNote(stamp = "done"){
        if(this.getInbox().length > 0){
            let finishedTask = this.getInbox().pop();
            finishedTask.stamp = stamp;
            this.getOutbox().push(finishedTask);
        };
    }

    pickTask(index){
        let pickedTask = this.getInbox().slice(index,index+1);
        this.getInbox().splice(index,1);
        this.getInbox().push(...pickedTask);
    }

}

// export function getActiveProjects(){
//     return Project.activeProjects;
// }

// export function createNewProject(name){
//     let newProject = new Project(name);
//     Project.getActiveProjects().push(newProject);
//     console.log(newProject);
//     console.log(JSON.parse(newProject.stringifyProject()));
//     return newProject;
// }



// function updateLocalStorage(){
//     let json = JSON.stringify(getActiveProjects());
//     localStorage.setItem("activeProjects", json);
// }

// export function fetchProjects(){
//     if(localStorage.userProjects){
//         activeProjects = JSON.parse(localStorage.getItem("userProjects"));
//     }
// }

// export function storeProjects(){
//     console.log("shit");
//     localStorage.clear();
//     let userProjects = [];
//     getActiveProjects().forEach((project) => {
//         userProjects.push(project.getProject())
//     });
//     let json = JSON.stringify(userProjects);
//     localStorage.setItem("userProjects", json);
//     console.log(localStorage.getItem("userProjects"));
// }


// function storeUserProjects()

// function getActiveProjects2(){
//     let storedProjects = [];
//     let fetchedProjects = JSON.parse(localStorage.getItem("userProjects"))
//     if(fetchProjects){
//         fetchedProjects.forEach((project)=> {
//             let newProject = new Project(
//                 project.name, 
//                 project.active,
//                 project.inbox,
//                 project.outbox
//             )
//             storeProjects.push(newProject)
//         });
//         return storedProjects;
//     } else {
//         return activeProjects;
//     }
// }

