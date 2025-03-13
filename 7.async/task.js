class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }
        if (this.alarmCollection.find(item => item.time === time)) {
            console.warn('Уже присутствует звонок на это же время')
        }
        this.alarmCollection.push({time: time, callback: callback, canCall: true});

    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
    }

    getCurrentFormattedTime() {
        let time = new Date();
        return (time.getHours() + ":" + time.getMinutes());
    }

    start() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            return;
        }

        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach(elem => {
                if (elem.canCall && elem.time === this.getCurrentFormattedTime()) {
                    elem.canCall = false;
                    elem.callback();
                }
            })
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach((item) => {
            item.canCall = true;
        })
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}