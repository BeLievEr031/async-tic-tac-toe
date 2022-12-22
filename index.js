let t = new Date();
console.log(t.getTime());
let date = new Date(t.getTime());
let dateArr = date.toDateString().split(" ");
const newDate =
  dateArr[2] == "1"
    ? dateArr[2] + "st"
    : dateArr[2] + "th " + dateArr[1] + " " + dateArr[3];
const meridiem = date.toLocaleString().split(" ")[2];
const [hr, minute] = date.toLocaleString().split(" ")[1].split(":");
const time = [hr, minute].join(":") + " " + meridiem;

console.log(newDate, time);
