import ListService from "../Services/ListService.js";

//Private
let _listService = new ListService()

//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
    let template = "";
    let lists = _listService.Lists;
    lists.forEach((list, i) => {
        template += list.getTemplate(i);
    });
    document.querySelector("#lists").innerHTML = template;
}


//Public
export default class ListController {
    constructor() {
        //NOTE: When the app first starts we want to pull any potential data out of memory
        _listService.getLists();
        //NOTE: After updating the store, we can automatically call to draw the lists.
        _drawLists();
    }

    //TODO: Your app will need the ability to create and delete both lists and listItems

    addList(event) {
        event.preventDefault();
        let formData = event.target;
        let newList = {
            name: formData.listName.value
        };
        formData.reset();
        _listService.addList(newList);
        _drawLists();
    }

    addTask(event, listIndex) {
        event.preventDefault();
        _listService.addTask(event.target.taskName.value, listIndex);
        _drawLists();
    }

    removeList(listIndex) {
        if (!window.confirm("Delete this list?")) {
            return;
        }
        _listService.removeList(listIndex);
        _drawLists();
    }

    removeTask(listIndex, taskIndex) {
        _listService.removeTask(listIndex, taskIndex);
        _drawLists();
    }

}