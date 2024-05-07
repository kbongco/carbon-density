const getDateOneWeekAgo = (todayDateISO: string) => {
  const oneWeekAgo = new Date(todayDateISO).getTime() - 7 * 24 * 60 * 60 * 1000; // Subtracting milliseconds for one week
  return oneWeekAgo.toString();
};
