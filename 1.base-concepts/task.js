"use strict";

function solveEquation(a, b, c) {
    let arr = [];

    let d = b ** 2 - 4 * a * c;
    if (d > 0) {
        arr.push((-b + Math.sqrt(d)) / (2 * a));
        arr.push((-b - Math.sqrt(d)) / (2 * a));
    } else if (d === 0) {
        arr.push(-b / (2 * a));
    }

    return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    percent = percent / 100 / 12;
    let credit = amount - contribution;
    let payment = credit * (percent + (percent / (((1 + percent) ** countMonths) - 1)));
    if (credit === 0) {
        return 0;
    } else {
        return parseFloat((contribution + payment * countMonths).toFixed(2));
    }
}