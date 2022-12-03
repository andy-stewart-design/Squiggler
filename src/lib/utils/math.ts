export const map = (
  n: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => {
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
  // const uIntArray = new Uint32Array(n);
  // const cryptoNums = [...crypto.getRandomValues(uIntArray)];
  // const randomNums = cryptoNums.map((n) =>
  //   n > 999999999 ? n / 10000000000 : n / 1000000000
  // );
  return numbers;
};
