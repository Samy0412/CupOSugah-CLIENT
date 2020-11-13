export default  function formatDate(x){
  let Y = new Date(x);
  let date = JSON.stringify(Y);
  date = date.slice(1, 11);
  // let [date, month, year] = x.toLocaleDateString().split("/");
  // return `${year}-${month}-${date}`;
  return date;
}; 
  

