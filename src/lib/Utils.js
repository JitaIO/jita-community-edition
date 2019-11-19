export const getNow = function(){
    const time = new Date();
    const now = {
        year: time.getUTCFullYear(),
        month: time.getUTCMonth() + 1,
        day: time.getUTCDate(),
        hour: time.getUTCHours(),
        minute: time.getUTCMinutes(),
        second: time.getUTCSeconds(),
        millisecond: time.getUTCMilliseconds()
    }
    return {
        ...now,
        "formatted": `${now.year}-${now.month}-${now.day}T${now.hour}:${now.minute}:${now.second}.${now.millisecond}Z`
    }; 
}