export const urlencodedHeader = {
  'Content-type': 'application/x-www-form-urlencoded'
}

export const firstDayOfMonth = (date) => {
  date.setHours(0,0,0,0);
  date.setDate(1);

  return date;
}

export const obj2form = (obj) => {
  const params = new FormData();
  for(let key in obj)
    if (obj[key] !== null && obj[key] !== undefined)
      params.append(key, obj[key])
  return params
}
