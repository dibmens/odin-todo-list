export default class Project {
    #name;
    #inbox;
    #outbox;
    
    constructor(name){
        this.#name = name;
        this.#inbox = [];
        this.#outbox = [];
    }

    #taskNote(task,time,priority,stamp = null){
        return {
            task,
            time,
            priority,
            stamp
        }
    }

    getInbox(){
        return this.#inbox;
    }

    getOutbox(){
        return this.#outbox
    }

    showCompletion(){
        let taskTotal = this.getInbox().length + this.getOutbox().length;
        return Math.trunc(this.getInbox().length / taskTotal)*100;
    }

    addTask(task, time = 10, priority = 1){
        let newNote = this.#taskNote(task, time, priority);
        this.getInbox().push(newNote);
    }

    sortInbox(key){

        function isSorted(){
            let testArray = []

            for(i = 0; i < this.getInbox().length-1; i++){
                testArray.push(this.getInbox[i][key] < this.getInbox[i+1][key])
            }

            return testArray.every(element => element == true);
        }

        if(this.getInbox().length > 1){
            if(isSorted()){
                this.getInbox().sort((a,b) => a[key] > b[key] ? 1 : -1);
            } else {
                this.getInbox().sort((a,b) => a[key] < b[key] ? 1 : -1);
            };
        };    
    }

    stampTask(stamp){
        if(this.getInbox().length > 0){
            let doneTask = this.getInbox().pop();
            doneTask.stamp = stamp;
            this.getOutbox().push(doneTask);
        };
    }

}