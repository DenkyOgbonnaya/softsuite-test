export const formatDate = (dateString: string) => {
    if(!dateString) return ''
  const event = new Date(dateString);

  const [day, month, date, year, _] = event.toString().split(" ");
  const time = event.toLocaleTimeString()

  return `${date}-${event.getMonth()+1}-${year} || ${time}`;
};

export const formatDateLocale = (dateString: string) => {
  if(!dateString) return ''
const event = new Date(dateString);

const [month, day, year] = event.toLocaleDateString().split("/");

return `${month}/${day}/${year}`;
};
