var ca = process.env.SECRET;
// var base64Url = ca.split('.')[1];
// var decodedValue = JSON.parse(window.atob(base64Url));
// console.log(decodedValue)

var items = String(ca).split('\n');
console.log(items)
