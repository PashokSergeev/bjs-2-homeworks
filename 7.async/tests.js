describe('0. Домашнее задание к лекции 7 «Асинхронность»', () => {
  let clock;

  beforeEach(function(){
    clock = new AlarmClock();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
  })

  it('1. необходимо создавать объект будильник', () => {
    expect(clock).toBeTruthy();
  });

  it('2. необходимо создавать добавлять звонок', () => {
    const callback = f => f;
    clock.addClock("16:45", callback);
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection[0].canCall).toBe(true);
    expect(clock.alarmCollection[0].time).toBe("16:45");
    expect(clock.alarmCollection[0].callback).toBe(callback);
  });

  it('3. id интервала должно отсутствовать до запуска', () => {
    expect(clock.intervalId).toBeNull();
  });

  it('4. необходимо запускать и останавливать будильник', () => {
    clock.addClock("16:45", f => f);
    clock.start();
    expect(clock.intervalId).toBeDefined();
    clock.stop();
  });

  it('5. будильник должен возвращать время в формате HH:MM', () => {
    expect(clock.getCurrentFormattedTime()).toEqual(new Date().toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
    }));
  });

  it('6. будильник должен создавать интервал, а затем его удалять', () => {
    clock.start();
    expect(clock.intervalId).toBeDefined();
    clock.stop();
    expect(clock.intervalId).toBeNull();
  });

  it('7. будильник должен удалять звонки и интервал при очистке звонков', () => {
    const callback = f => f;
    clock.addClock("16:45", callback);
    expect(clock.alarmCollection.length).toEqual(1);
    clock.start();
    expect(clock.intervalId).toBeDefined();
    clock.clearAlarms();
    expect(clock.intervalId).toBeNull();
    expect(clock.alarmCollection.length).toEqual(0);
  });

  it('8. будильник не должен несколько интервалов', () => {
    clock.start();
    const intervalId = clock.intervalId;
    clock.start();
    expect(intervalId).toEqual(clock.intervalId);
  });

  it('9. будильник должен удалять звонки по времени', () => {
    const callback = f => f;
    clock.addClock("16:45", callback);
    clock.addClock("16:45", callback);
    clock.addClock("16:46", callback);
    clock.removeClock("16:45");
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection).toEqual([{time: "16:46", callback, canCall: true}]);
  });

  it('10. будильник не должен удалять звонки отсутствующему времени', () => {
    const callback = f => f;

    clock.addClock("16:46", callback);
    clock.removeClock("17:00");
    expect(clock.alarmCollection.length).toEqual(1);
    expect(clock.alarmCollection).toEqual([{time: "16:46", callback, canCall: true}]);
  });

  it('11. будильник должен затем очищать все звонки', () => {
    clock.addClock("16:45", f => f);
    clock.addClock("16:45", f => f);
    clock.addClock("16:45", f => f);
    expect(clock.alarmCollection.length).toEqual(3);

    clock.clearAlarms();
    expect(clock.alarmCollection.length).toEqual(0);
  });

  it('12. будильник должен выбрасывать объект ошибки, если время не было передано', () => {
    expect(() => clock.addClock(null, f => f)).toThrow();
  });

  it('13. будильник должен выбрасывать объект ошибки, если колбек не был передан', () => {
    expect(() => clock.addClock("16:45")).toThrow();
  });

  it('14. будильник должен восстанавливать возможность запуска звонков', () => {
    clock.addClock("16:45", f => f);
    clock.addClock("16:45", f => f);
    clock.addClock("16:45", f => f);
    
    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(true);
    clock.alarmCollection.forEach(alarm => alarm.canCall = false);
    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(false);
    clock.resetAllCalls();
    expect(clock.alarmCollection.every(alarm => alarm.canCall)).toBe(true);
  });

  it('15. будильник должен запускать интервал, который не запустит колбек', (done) => {
    clock.addClock("16:45", f => f);
    clock.getCurrentFormattedTime = () => "17:00";
    clock.start();

    setTimeout(() => {
      expect(clock.alarmCollection[0].canCall).toBe(true);
      done();
    }, 1000);
  });

  it('16. будильник должен запускать интервал, который запустит колбек', (done) => {
    let flagToCall = false;
    clock.addClock("16:45", () => flagToCall = true);
    clock.getCurrentFormattedTime = () => "16:45";
    clock.start();

    setTimeout(() => {
      expect(clock.alarmCollection[0].canCall).toBe(false);
      expect(flagToCall).toBe(true);
      done();
    }, 1000);
  });
});