class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    get state() {
        return this._state;
    }

    fix() {
        this.state *= 1.5;
    }

}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';

    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        const foundBook = this.books.find(book => book[type] === value);
        return foundBook !== undefined ? foundBook : null;
    }

    giveBookByName(bookName) {
        const foundBook = this.books.find(book => book.name === bookName);
        if (foundBook) {
            this.books = this.books.filter(book => book.name !== bookName);
            return foundBook;
        } else {
            return null;
        }
    }
}

class Student {
    constructor(name) {
        this.name = name;
        this.marks = {};
    }

    addMark(mark, subject) {
        if (mark > 5 || mark < 2) {
            return;
        }
        const foundSubject = this.marks[subject];
        if (foundSubject) {
            this.marks[subject].push(mark);
        } else {
            this.marks[subject] = [mark]
        }
    }

    getAverageBySubject(subject) {
        const foundSubject = this.marks[subject];
        if (foundSubject) {
            let sum = foundSubject.reduce((a, b) => a + b, 0);
            return sum / foundSubject.length;
        } else {
            return 0;
        }
    }

    getAverage() {
        const keys = Object.keys(this.marks);
        if (keys.length === 0) {
            return 0;
        }
        let sum = 0;
        let count = 0;
        for (let key of keys) {
            sum += this.marks[key].reduce((a, b) => a + b, 0) / this.marks[key].length;
            console.log('sum: ' + sum)
            count++;
        }
        return sum / count;
    }
}