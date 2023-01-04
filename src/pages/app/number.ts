import data from "../../data/data.json";

//const num: number;
const arrId: Array<number> = [];

for (let i = 0; i < data.products.length; i++) {
  //const newArr = data.products;
  arrId.push(data.products[i].id);

  // arrId[i] ? arrId.includes(num)
}

//const a = arrId;
//num = arrId[i: number];
// arrId.forEach((el) => {
//   el = num;
//  // num = el;
// });

//const num: number = num ? arrId.includes(num) : (num = 1234);
