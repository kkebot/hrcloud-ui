export const xclude = (obj, keys) => {
  return filter(obj, (k, v) => keys.indexOf(k) === -1)
};

export const filter = (obj, predicate) => {
  let result = {};
  forEach(obj, (key, value) => predicate(key, value) && (result[key] = value));
  return result
};

const emptyValues = ['', null, undefined]
export const filterEmptyValues = (obj) => {
  return filter(obj, (k, v) => !emptyValues.includes(v))
}

export const forEach = (obj, callback) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(key, obj[key])
    }
  }
};

// TODO Bug
// export const date2str = (d, format) => {
//   var z = {
//     M: d.getMonth() + 1,
//     d: d.getDate(),
//     h: d.getHours(),
//     m: d.getMinutes(),
//     s: d.getSeconds()
//   };
//   format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
//     return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
//   });
//
//   return format.replace(/(y+)/g, function(v) {
//     return d.getFullYear().toString().slice(-v.length)
//   });
// };
