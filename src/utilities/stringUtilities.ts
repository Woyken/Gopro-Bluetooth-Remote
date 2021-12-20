export function pad(num: number, size: number): string {
    let str = num.toString(10);
    while (str.length < size) str = `0${str}`;
    return str;
}
