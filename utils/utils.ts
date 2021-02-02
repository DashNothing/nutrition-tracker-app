export function sameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function dateWithoutTime(date: Date) {
  let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(1);

  return newDate;
}

export function dateTimeReviver(key: any, value: any) {
  const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var a;
  if (typeof value === "string") {
    a = reISO.exec(value);
    if (a) {
      return new Date(value);
    }
  }
  return value;
}
