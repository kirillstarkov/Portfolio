function Human ({name,surname,age}){
	this.name = name;
	this.surname = surname;
	this.age = age;
}

function Teacher ({group, ...info}){
	Human.call(this, info);
	this.group = group;	
}

function Student ({rating, ...info}) {
	Human.call(this, info);
	this.rating = rating;
}

function findMaxMark (arr) {
	arr.sort((a,b) => a.maxMark(a.rating) > b.maxMark(b.rating) ? -1 : 1);
	return arr[0];
}

function getListOfNamesByAverageMark(arr) {
	return arr.sort((a,b) => a.averageMark(a.rating) > b.averageMark(b.rating) ? -1 : 1);
}


function getFullName() {
	return this.name + " " + this.surname;
}

function setFullName(fullName){
	[this.name, this.surname] = fullName.split(" ");
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

Human.prototype.getFullName = getFullName;
Human.prototype.setFullName = setFullName;

Teacher.prototype = Object.create(Human.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.namesByAverageMark = getListOfNamesByAverageMark;
Teacher.prototype.getStudentByName = function getStudentByName(name) {
	return group.find(i => i.name == name);	
}
Teacher.prototype.deleteStudentByName = function deleteStudentByName(name){
	return group.splice(group.indexOf(group.find(i => i.name == name), 0), 1);
}
Teacher.prototype.updateStudentByName = function updateStudentByName(name, info){
	group.splice(group.indexOf(group.find(i => i.name == name), 0), 1, new Student (info));
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype.averageMark = averageMark;
Student.prototype.maxMark = maxMark;
Student.prototype.minMark = minMark;
Student.prototype.getFullName = function getFullNameStdnt() {
	return this.name + " " + this.surname + " - is student";
}


let group = [];
for (i = 0; i < 5; i++){
	group[i] = new Student({
					name: `Student ${i}`, 
					rating: range(),
					surname: `Surname ${i}`, 
					age: 20 + i,
	});
}

// console.log(t.updateStudentByName('Student 1',{
// 	name: "Nick", 
// 	rating: range(),
// 	surname: 'Mark', 
// 	age: 23
// }));

