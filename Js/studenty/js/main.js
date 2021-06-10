function Student (name, rating) {
	this.name = name;
	this.rating = rating;
}

function range(){
	return Array.from({length: 5}, (v,k) => Math.round( Math.random() * 10 ));
}

function averageMark(arr){
	return arr.reduce((a,b)=> (a + b)) / arr.length;
}

function maxMark(arr){
	return Math.max.apply(null, arr);
}

function minMark(arr){
	return Math.min.apply(null, arr);
}

Student.prototype.averageMark = averageMark;
Student.prototype.maxMark = maxMark;
Student.prototype.minMark = minMark;

function findMaxMark(arr) {
	let stdntMax = new Student('Name', [0]);
	for (i = 0; i < 5; i++){
		if (stdntMax.rating < maxMark(arr[i].rating)){
			stdntMax.rating = maxMark(arr[i].rating);
			stdntMax.name = arr[i].name;
		}
	}
	return stdntMax;
}

let students = [];
for (i = 0; i < 5; i++){
	students[i] = new Student(`Student ${i}`,range());
}




