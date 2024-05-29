
// ! Format TimeStamps
export function formatTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() returns 0-11, so we add 1
  const year = String(date.getUTCFullYear()).slice(-2); // get last 2 digits of the year

  return `${day}/${month}/${year}`;
}