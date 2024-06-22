const myIterable = {
  from: 1,
  to: 4
};

myIterable[Symbol.iterator] = function() {
  if (typeof this.from !== 'number' || typeof this.to !== 'number') {
    throw new Error(`'from' and 'to' properties must be numbers`);
  }
  if (this.to < this.from) {
    throw new Error(`'to' property must be greater than or equal to 'from' property`);
  }
  
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of myIterable) {
  console.log(num);
}

myIterable.from = 5;

try {
  for (let item of myIterable) {
    console.log(item); 
  }
} catch (error) {
  console.error(error.message);
}

myIterable.from = 'aaa';

try {
  for (let num of myIterable) {
    console.log(num);
  }
} catch (error) {
  console.error(error.message); 
}