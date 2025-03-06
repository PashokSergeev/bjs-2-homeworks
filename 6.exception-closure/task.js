function parseCount(number) {
    number = Number.parseFloat(number);
    if (number) {
        return number;
    } else {
        throw new Error('Невалидное значение');
    }
}

function validateCount(number) {
    try {
        return parseCount(number);
    } catch (error) {
        return error;

    }

}

class Triangle {
    constructor(side1, side2, side3) {
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        if (this.side1 + this.side2 < this.side3 || this.side1 + this.side3 < this.side2 || this.side2 + this.side3 < this.side1) {
            throw new Error('Треугольник с такими сторонами не существует')
        }
    }

    get perimeter() {
        if (this.side1 + this.side2 < this.side3 || this.side1 + this.side3 < this.side2 || this.side2 + this.side3 < this.side1) {
            return 'Ошибка! Треугольник не существует';
        }
        return Number.parseFloat((this.side1 + this.side2 + this.side3).toFixed(3));
    }

    get area() {
        if (this.side1 + this.side2 < this.side3 || this.side1 + this.side3 < this.side2 || this.side2 + this.side3 < this.side1) {
            return 'Ошибка! Треугольник не существует';
        }
        const p = 0.5 * (this.side1 + this.side2 + this.side3);
        return Number.parseFloat(Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3)).toFixed(3));
    }
}

function getTriangle(side1, side2, side3) {
    try {
        return new Triangle(side1, side2, side3);
    } catch (e) {
        return {
            get area() {
                return "Ошибка! Треугольник не существует"
            },
            get perimeter() {
                return "Ошибка! Треугольник не существует"
            },
        }
    }
}