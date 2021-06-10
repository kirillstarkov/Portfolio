export default class Human {
    static count = 0;

    constructor({firstName, lastName, id, age}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.age = age;
    }

    getFullName() {
		return this.name + " " + this.surname;
	}

	setFullName(fullName){
		[this.name, this.surname] = fullName.split(" ");
	}
}