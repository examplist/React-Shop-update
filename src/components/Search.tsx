import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductData } from '../store/product';

export default function Search() {
  const [searchArray, setSearchArray] = useState<ProductData[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const productData = useSelector((state: any) => state.productStore.all);
  const searchBarWhenNarrow = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    // 소문자, 대문자 상관없게 하기
    const regExpValue = new RegExp(value, 'i');
    const filtered = productData.filter((product: ProductData) => {
      return regExpValue.test(product.title);
    });

    value === '' && setSearchArray([]);
    value !== '' && setSearchArray(filtered);
  };

  const onFocusHandler = () => {
    setIsSearch(true);
  };

  const onBlurHandler = () => {
    setIsSearch(false);
  };

  const toggleSearch = () => {
    searchBarWhenNarrow.current?.classList.toggle('invisible');
    searchBarWhenNarrow.current?.classList.toggle('translate-y-full');
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-circle sm:hidden"
        onClick={toggleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {/* 좁을 때 */}
      <input
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        type={'search'}
        placeholder="검색"
        className="input absolute w-full h-full rounded-none border border-slate-400 left-0 z-[-10] invisible sm:hidden transition ease-in-out duration-300"
        id="search"
        ref={searchBarWhenNarrow}
      />
      {searchArray.length > 0 && (
        <ul
          className={`absolute top-[128px] left-0 block overflow-y-scroll max-h-32 bg-white w-full`}
        >
          {searchArray.map((product) => {
            return (
              <li key={product.id} className="p-2 textxl">
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
      {/* 넓을 때 */}
      <input
        onChange={onChangeHandler}
        // onFocus={onFocusHandler}
        // onBlur={onBlurHandler}
        type={'search'}
        placeholder="검색"
        className="hidden sm:block input input-bordered w-full max-w-xs"
        id="search"
      />
      {/* {isSearch && (
        <ul
          tabIndex={0}
          className="menu dropdown-content p-2 shadow bg-base-100 w-52 mt-4 !fixed right-20 sm:!absolute sm:top-14 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600"
        >
          {searchArray.map((el) => (
            <li>
              <Link to={'#'} className="text-left js-searchedItem">
                <span className="text-left text-gray-600 dark:text-white line-clamp-2">
                  {el.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )} */}
      {/* 좁을 때 */}
    </>
  );
}
