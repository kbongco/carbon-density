
export const calculateStartDate = (selectedOptionValue: string): string => {
  const currentDate = new Date();
  let startDate = new Date();


  switch (selectedOptionValue) {
    case '24hours':
      startDate.setDate(currentDate.getDate() - 1);
      break;
    case '48hours':
      startDate.setDate(currentDate.getDate() - 2);
      break;
    case '1week':
      startDate.setDate(currentDate.getDate() - 7);
      break;
    case '1month':
      startDate.setMonth(currentDate.getMonth() - 1);
      break;
    case '2months':
      startDate.setMonth(currentDate.getMonth() - 2);
      break;
    case '3months':
      startDate.setMonth(currentDate.getMonth() - 3);
      break;
    case '4months':
      startDate.setMonth(currentDate.getMonth() - 4);
      break;
    case '5months':
      startDate.setMonth(currentDate.getMonth() - 5);
      break;
    case '6months':
      startDate.setMonth(currentDate.getMonth() - 6);
      break;
    case '7months':
      startDate.setMonth(currentDate.getMonth() - 7);
      break;
    case '8months':
      startDate.setMonth(currentDate.getMonth() - 8);
      break;
    case '9months':
      startDate.setMonth(currentDate.getMonth() - 9);
      break;
    case '10months':
      startDate.setMonth(currentDate.getMonth() - 10);
      break;
    case '11months':
      startDate.setMonth(currentDate.getMonth() - 11);
      break;
    case '1year':
      startDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    case '2years':
      startDate.setFullYear(currentDate.getFullYear() - 2);
      break;
    case '3years':
      startDate.setFullYear(currentDate.getFullYear() - 3);
      break;
    case '4years':
      startDate.setFullYear(currentDate.getFullYear() - 4);
      break;
    case '5years':
      startDate.setFullYear(currentDate.getFullYear() - 5);
      break;
    default:
      // Default to 24 hours if no valid option is selected
      startDate.setDate(currentDate.getDate() - 1);
      break;
  }

  const formattedStartDate = startDate.toISOString().split('T')[0];
  return formattedStartDate;
};

export const convertDateISO = (value: string) => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const convertISO = `${value}T${hours}:${minutes}:${seconds}Z`;

  return convertISO;
}
