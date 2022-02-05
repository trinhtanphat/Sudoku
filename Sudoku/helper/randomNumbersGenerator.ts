//generate 9 (upper limit) random numbers, return as array
export const randomNumbersGenerator = (upperLimit = 9): number[] => {
  const resultArr: number[] = [];
  while (resultArr.length < upperLimit) {
    const num = Math.floor(Math.random() * upperLimit + 1);
    if (!resultArr.includes(num)) resultArr.push(num);
  }
  return resultArr;
};
