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

    #addNote(task,deadline,priority,stamp = null){
        return {
            task,
            deadline,
            priority,
            stamp
        }
    }

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

    createTask(task, deadline = new Date(), priority = 2){
        let newNote = this.#addNote(task, deadline, priority);
        this.getInbox().push(newNote);
    };

    sortInbox(key){
        let inbox = this.getInbox();

        // console.log(inbox);

        // function isSorted(){
        //     let testArray = [];
        //     for(let i = 0; i < inbox.length-1; i++){
        //         testArray.push(inbox[i][key] < inbox[i+1][key])
        //     };
        //     return testArray.every((element) => element === true);
        // }

        if(inbox.length > 1){
            inbox.sort((a,b) => a[key] < b[key] ? 1 : -1);
        }; 

        // if(inbox.length > 1){
        //     if(isSorted()){
        //         inbox.sort((a,b) => a[key] > b[key] ? 1 : -1);
        //     } else {
        //         inbox.sort((a,b) => a[key] < b[key] ? 1 : -1);
        //     };
        // };   

        console.log(inbox);
    }

    // sortByDeadline(){
    //     let inbox = this.getInbox();
    //     if(inbox.length > 1){
    //         inbox.sort((a,b) => a["deadline"] < b["deadline"] ? 1 : -1);
    //     };
    // }

    // sortByPriority(){
    //     let inbox = this.getInbox();
    //     if(inbox.length > 1){
    //         inbox.sort((a,b) => {
    //             a["deadline"] < b["deadline"] ? 1 : -1;
    //         });
    //     };
    // }

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
