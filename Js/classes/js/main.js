function range(){
	return Array.from({length: 5}, (v,k) => Math.round( Math.random() * 10 ));
}

function findMaxMark (arr) {
	arr.sort((a,b) => a.maxMark(a.rating) > b.maxMark(b.rating) ? -1 : 1);
	return arr[0];
}

class Human {
	constructor({name,surname,age}) {
		this.name = name;
		this.surname = surname;
		this.age = age;
	}

	getFullName() {
		return this.name + " " + this.surname;
	}

	setFullName(fullName){
		[this.name, this.surname] = fullName.split(" ");
	}
}

class Teacher extends Human {
	constructor ({group, ...info}){
		super(info);
		this.group = group;
	}

	getListOfNamesByAverageMark() {
		return this.group.sort((a,b) => a.averageMark(a.rating) > b.averageMark(b.rating) ? -1 : 1);
	}

	getStudentByName(name) {
		return this.group.find(i => i.name == name);	
	}

	deleteStudentByName(name){
		return this.group.filter( student => student.name != name );
	}

	updateStudentByName(name, info){
		this.group.splice(group.indexOf(group.find(i => i.name == name), 0), 1, new Student (info));
	}
}

class Student extends Human {
	constructor ({rating, ...info}){
		super(info);
		this.rating = rating;
	}

	getFullName() {
		return this.name + " " + this.surname + " - is student";
	}

	averageMark(){
		return this.rating.reduce((a,b)=> (a + b)) / this.rating.length;
	}

	maxMark(){
		return Math.max.apply(null, this.rating);
	}

	minMark(){
		return Math.min.apply(null, this.rating);
	}

}

class StoreService {
    constructor(initialValue = []) {
        this.store = initialValue;
    }

    addToStore(item){
        this.store.push(item);
    }

    removeItem(id) {
        this.store = this.store.filter( item => item.id != id);
    }
}

class ListItem extends StoreService{
    constructor(container, initialValue) {
        super(initialValue);

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

        this.addToStore(human)
    }

    removeById(id) { 
        let child = this.HTMLContainer.querySelector(`[data-id ="${id}"]`)
        this.HTMLContainer.removeChild(child);
        this.removeItem()
    }

    createItem(name, lastName, id) {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.dataset.id = id;
        div.textContent = `${name} ${lastName}`
        return div;
    }

}

const Validator = {
    errors: {},
    validators: {
        isNotEmpty: {
            validate(value) {       
                return value !== "";
            },
            message: "This field should not be blank",
            errorType: 'required'
        },

        isNumber: {
            validate(value) {       
                return !isNaN(value);
            },
            message: "This field should be a number",
            errorType: 'number'
        }
    },
    validate(config, form) {
        if(!(form instanceof HTMLFormElement)) {
            throw {
                name: 'ValidationError',
                message: 'You should pass HTML Form'
            }
        }
        this.errors = {};

        let elements = form.elements;

        for( const [inputName, validators] of Object.entries(config)) {
         

            if(!validators?.length) {
                throw {
                    name: 'ValidationError',
                    message: `No handler to validate ${inputName}`
                }
            }

            if(!elements[inputName]) {
                throw {
                    name: 'ValidationError',
                    message: `${inputName} does not exist in the ${form.name}`
                } 
            }
            
            let value = elements[inputName].value;
         

            validators.forEach(({validate, message, errorType}) => {
                
                if(!validate(value)) {
                    this.errors[inputName] = {...this.errors[inputName], [errorType]: message};
                }
            })
        }

        return this.hasErrors();
    },

    hasErrors() {
        return !Object.keys(this.errors).length != 0;
    }
}

Validator.validators.maxLength = function(length) {
    return {
        validate(value) {       
            return value.length <= length;
        },
        message: `This field should not be more then ${length}`,
        errorType: 'maxLength'
    }
}

const isNotEmpty = Validator.validators.isNotEmpty;
const isNumber = Validator.validators.isNumber;
const maxLength = Validator.validators.maxLength;

const formGroupConfig = {
    "first-name": [isNotEmpty, maxLength(16)],
    "last-name": [isNotEmpty, maxLength(20)],
    "age": [isNotEmpty, isNumber]
};

let humanContainer = document.getElementById('human-container');
const humanList = new ListItem(humanContainer);

let btnAddStart = document.getElementById('btn-add-start');
let btnAddEnd = document.querySelector('#btn-add-end');
let btnRemove = document.querySelector('#btn-remove');

btnRemove.onclick = function () {
    humanList.removeById(5);
}

btnAddEnd.onclick = function () {
    let id = ++Human.count;

    humanList.add(
        new Human({
            firstName: `name: ${id}`,
            lastName: `surname: ${id}`,
            id
        }),
        'end'
    )
}

btnAddStart.onclick = function () {
    let form = document.querySelector('#human-form');
    const VALID = Validator.validate(formGroupConfig, form);
    
    if(!VALID) {
        console.log(Validator.errors);
        Object.entries(Validator.errors).forEach(([name, error]) => {
            console.log(name, error);
            let messageError = form.querySelector(`[data-for="${name}"]`);
            form.elements[name].classList.add('error');
            messageError.innerHTML = Object.values(error || {}).map(message => `<span>${message}</span>`).join('')
            messageError.style.display = 'block';
        } )
    } else {
        // ...
        humanList.add(
            new Human({
                firstName: `name: ${id}`,
                lastName: `surname: ${id}`,
                id
            }),
            'start'
        )
    }
}

// let group = [];
// for (i = 0; i < 5; i++){
// 	group[i] = new Student({
// 		name: `Student ${i}`, 
// 		rating: range(),
// 		surname: `Surname ${i}`, 
// 		age: 20 + i,
// 	});
// }


// let h = new Human({
// 	name: "Elis",
// 	surname: "Dickson",
// 	age: 23,
// });

// let t = new Teacher({
// 	name: "David",
// 	surname: "Billson",
// 	age: 54, 
// 	group: group,
// });

// let s = new Student({
// 	name: "Nick",
// 	surname: "Debill",
// 	age: 23,
// 	rating: range(),
// });

// console.log(h);
// console.log(t);
// console.log(s);
