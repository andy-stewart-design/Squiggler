export const map = (n, start1, end1, start2, end2) => {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
};

export const getRandom = (n, min = 0) => {
  let numbers = [];
  for (let i = 0; i < n; i++) {
    let number = 0;
    while (number <= min) {
      number = Math.random();
    }
    numbers.push(number);
  }
  return numbers;
};
