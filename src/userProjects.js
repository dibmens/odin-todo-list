export default class Project {
    #name;
    #inbox;
    #outbox;
    #active;
    
    constructor(name){
        this.#name = name;
        this.#active = true;
        this.#inbox = [];
        this.#outbox = [];
    }

    #addNote(task,time,priority,stamp = null){
        return {
            task,
            time,
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

    stampNote(stamp = "Done"){
        if(this.getInbox().length > 0){
            let finishedTask = this.getInbox().pop();
            finishedTask.stamp = stamp;
            this.getOutbox().push(finishedTask);
        };
    }

}

const activeProjects = [];

export function createProject(name){
    let newProject = new Project(name);
    activeProjects.push(newProject);
}

export function getActiveProjects(){
    return activeProjects;
}