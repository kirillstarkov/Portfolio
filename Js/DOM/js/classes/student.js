import Human from './human.js';
export default class Student extends Human {
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