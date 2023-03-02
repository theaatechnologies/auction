
export function subtractSeconds(numOfSeconds: number, date = new Date()) {
    date.setSeconds(date.getSeconds() - numOfSeconds);
    return date;
}

export function plusSeconds(numOfSeconds: number, date = new Date()) {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    return date;
}