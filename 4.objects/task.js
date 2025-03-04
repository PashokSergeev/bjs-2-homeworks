function Student(name, gender, age) {
    let marks = [];
    this.name = name;
    this.gender = gender;
    this.age = age;
    return {name, gender, age, marks};
}

Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
}

Student.prototype.addMarks = function (...marks) {
    this.marks = [...marks];
}

Student.prototype.getAverage = function () {

}

Student.prototype.exclude = function (reason) {

}


let student1 = new Student("Василиса", "женский", 19);
student1.setSubject("Algebra");
console.log(student1);