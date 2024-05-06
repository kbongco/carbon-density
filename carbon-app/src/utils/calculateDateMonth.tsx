export default function getDateOneMonthAgo(currentDate: string) {
  const current = new Date(currentDate);
  let year = current.getFullYear();
  let month = current.getMonth() - 1;
  
  if (month === -1) {
    // Adjust the year if the month becomes negative
    year--;
    month = 11; // December
  }

  const oneMonthAgo = new Date(year, month, current.getDate());
  return oneMonthAgo.toISOString().slice(0, 10);
}
