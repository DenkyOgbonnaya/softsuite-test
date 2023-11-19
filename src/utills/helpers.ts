export const cleanNumber = (number: string) => {
    if (String(number).includes(",")) {
      return String(number).split(",").join("");
    }
    return number;
  };
  export const formatAmount = (num: number | string) => {
    if (!num) return 0;
    const cleanNum = cleanNumber(num.toString());
    const numb = Number(cleanNum);
    return String(numb.toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };