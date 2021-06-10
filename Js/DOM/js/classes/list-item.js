import Teacher from './../classes/teacher.js';

// export default class extends StoreService {}
export default class ListItem extends Teacher{
    constructor(container, ...info) {
        super(info);

        this.HTMLContainer = container;
    }

    add(human, place) {
        const {firstName, lastName, id} = human;

        let listItem = this.createItem(firstName, lastName, id);
       
        switch(place) {
            case 'start': {
                this.HTMLContainer.prepend(listItem);
            }break;
            default: {
                this.HTMLContainer.append(listItem);
            }
        }
        this.addToGroup(human)
    }

    removeById(id) { 
        let child = this.HTMLContainer.querySelector(`[data-id ="${id}"]`)
        this.HTMLContainer.removeChild(child);
    }

    createItem(name, lastName, id) {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.dataset.id = id;
        div.textContent = `${name} ${lastName} was added`
        return div;
    }

}
