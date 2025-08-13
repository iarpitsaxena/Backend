const obj = {
  a: 1,
  b: 2,
  sum() {
    return this.a + this.b;
  },
};


const res = obj.sum;
console.log(res());
// console.log(obj.sum());
