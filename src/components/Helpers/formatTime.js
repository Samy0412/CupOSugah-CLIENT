export default function formatTime(x){
  let [hour, minute, second] = x.toLocaleTimeString().slice(0, 7).split(":");
  return `${hour}:${minute}:${second}0`;
};
