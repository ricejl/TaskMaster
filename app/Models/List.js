export default class List {
    //TODO You will need to create a constructor 
    //and the methods needed to create the view template for this model
    constructor(data) {
        this.name = data.name;
        this.tasks = data.tasks || [];
    }

    getTasks(listIndex) {
        let template = "<ul class='p-0'>";
        this.tasks.forEach((T, i) => {
            template += `
            <li class="align-items-center d-flex justify-content-between p-1"><span>${T}</span><i class="text-dark action fa fa-fw fa-times" onclick="app.controllers.listController.removeTask(${listIndex}, ${i})"></i></li>
            `;
        });
        template += "</ul>";
        return template;
    }

    getTaskForm(index){
        return `
        <form onsubmit="app.controllers.listController.addTask(event, '${index}')">
            <div class="input-group mb-3">
                <input type="text"
                name="taskName"
                class="form-control"
                placeholder="Task"
                required
                aria-label="Task"
                aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary"
                    type="submit"
                    id="button-addon2">+</button>
                </div>
            </div>
        </form>`
    }

    getTemplate(index) {
        return `
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header d-flex justify-content-between align-items-center">${this.name}
                <i class="action fa fa-fw fa-trash text-danger" onclick="app.controllers.listController.removeList(${index})"></i>
            </div>
            <div class="card-body">
                ${this.getTasks(index)}
                ${this.getTaskForm(index)}
            </div>
        </div>
        `;
    }
}