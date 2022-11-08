import { ProductData } from '../store/product';

type SearchFunction = (
  targetArray: ProductData[],
  value: string,
) => ProductData[];

const searchFunction: SearchFunction = (targetArray, value) => {
  if (value === '') {
    return [];
  }

  // 소문자, 대문자 상관없게 하기
  const regExpValue = new RegExp(value, 'i');
  return targetArray.filter((product) => {
    return regExpValue.test(product.title);
  });
};

export default searchFunction;
