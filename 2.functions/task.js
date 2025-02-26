function getArrayParams(...arr) {
    if (arr.length === 0) {
        return 0;
    }
    let min = arr[0],
        max = arr[0],
        sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    let avg = parseFloat((sum / arr.length).toFixed(2));

    return {min: min, max: max, avg: avg};
}

function summElementsWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }
    return arr.reduce((sum, el) => sum + el, 0);
}

function differenceMaxMinWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }
    return Math.max.apply(null, arr) - Math.min.apply(null, arr);
}

function differenceEvenOddWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sumEvenElement = 0,
        sumOddElement = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumEvenElement += arr[i];
        } else {
            sumOddElement += arr[i];
        }
    }

    return sumEvenElement - sumOddElement;

}

function averageEvenElementsWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sumEvenElement = 0,
        countEvenElement = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumEvenElement += arr[i];
            countEvenElement++;
        }
    }

    return sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
    let maxWorkerResult = -Infinity;
    for (let arr of arrOfArr) {
        maxWorkerResult = Math.max(maxWorkerResult, func(...arr));
    }
    return maxWorkerResult;

}
