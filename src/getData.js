const getDate = () => {
  let d = new Date();
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let zeroFormatMonth;

  if (String(month).length === 1) {
    zeroFormatMonth = "0" + (month + 1);
  } else {
    zeroFormatMonth = month + 1;
  }
  return `${date}.${zeroFormatMonth}.${year}`;
};
export default getDate;