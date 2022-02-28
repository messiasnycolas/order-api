export function getCurrentTime(): string {
    return new Date().toTimeString().split(' ')[0];
}