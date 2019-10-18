import List from "../models/List.js";

//Private
let _state = {
    lists: []
}


//Public
export default class ListService {
    //TODO  Here is where we handle all of our data manipulation, 
    //given the information you need in the controller, 
    //what methods will be required to support that functionality?

    addList(newList) {
        _state.lists.push(new List(newList));
        this.saveLists();
    }

    addTask(task, listIndex) {
        _state.lists[listIndex].tasks.push(task)
        this.saveLists();
    }

    removeList(listIndex) {
        _state.lists.splice(listIndex, 1);
        this.saveLists();
    }

    removeTask(listIndex, taskIndex) {
        _state.lists[listIndex].tasks.splice(taskIndex, 1);
        this.saveLists();
    }

    get Lists() {
        return _state.lists.map(L => new List(L));
    }

    constructor() {
        this.getLists();
    }

    //NOTE You will need this code to persist your data into local storage, these methods should not require changing

    //NOTE call saved list everytime you change the list collection in any way
    saveLists() {
        localStorage.setItem('lists', JSON.stringify(_state.lists))
    }

    //NOTE this method will get the lists from local storage at the start of the app
    getLists() {
        let saved = JSON.parse(localStorage.getItem('lists'))
        if (saved) {
            _state.lists = saved;
        }
    }
}
