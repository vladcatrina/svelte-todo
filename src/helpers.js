export function parseDate(date) {
  date = new Date(date); 
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
}

const MINUTE = 60000;
const HOUR = 3600000;
const DAY = 86400000;

export function expressTime(date) {
  if (date < MINUTE) {
    return {
      en: "less than 1 minute",
      ro: "mai puțin de 1 minut",
    };
  }
  if (date < HOUR) {
    let minutes = Math.floor(date / MINUTE);
    return {
      en: `${minutes} minute${minutes > 1 ? "s" : ""}`,
      ro: `${minutes} ${minutes >= 20 ? "de" : ""} minut${
        minutes > 1 ? "e" : ""
      }`,
    };
  }
  if (date < DAY) {
    let hours = Math.floor(date / HOUR);
    return {
      en: `${hours} hour${hours > 1 ? "s" : ""}`,
      ro: `${hours} ${hours >= 20 ? "de" : ""} or${hours > 1 ? "e" : "ă"}`,
    };
  }
  let days = Math.floor(date / DAY);
  return {
    en: `${days} day${days > 1 ? "s" : ""}`,
    ro: `${days} ${days >= 20 ? "de" : ""} zi${days > 1 ? "le" : ""}`,
  };
}

export function calculateAge(date, now) {
  date = new Date(date); //provizoriu
  const age = expressTime(now - date);
  
  return {
    en: `${age.en} ago`,
    ro: `acum ${age.ro}`
  };
}

export function filterByType(ftype) {
  return ({ type, completed }) => type === ftype && !completed;
}

export function isNumber(arg) {
  return parseInt(arg).toString() === arg.toString();
}

export function swap(arr, firstIndex, secondIndex) {
  let newArr = [...arr];
  let aux;
  aux = { ...newArr[firstIndex] };
  newArr[firstIndex] = { ...newArr[secondIndex] };
  newArr[secondIndex] = { ...aux };
  return newArr;
}

export function setLocalStorage(keyString) {
  return function start(set) {
    const local = window.localStorage.getItem(keyString);
    if (local) {
      set(JSON.parse(local));
    }
  }
}