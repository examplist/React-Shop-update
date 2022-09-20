import { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProductData, ProductState } from '../store/product';
import { headerHeight } from '../App';

export default function Search() {
  const searchWhenNarrowResultsTop = 'top-[128px]';
  let linkMode = false;

  const productData = useSelector(
    (state: ProductState) => state.productStore.all,
  );
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ProductData[]>([]);

  const [inputWhenNarrowVisible, setInputWhenNarrowVisible] =
    useState<string>('invisible');
  const [resultWhenNarrowVisible, setResultWhenNarrowVisible] =
    useState<string>('hidden');
  const [resultWhenWideVisible, setResultWhenWideVisible] =
    useState<string>('sm:hidden');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;
    // 소문자, 대문자 상관없게 하기
    const regExpValue = new RegExp(value, 'i');
    const filtered = productData.filter((product: ProductData) => {
      return regExpValue.test(product.title);
    });

    // wide에서 검색한 상태 그대로 유지하기
    setInputWhenNarrowVisible('translate-y-full');

    // narrow에서 검색할 때와 wide에서 검색할 때 CSS 다르게 하기
    if (id === 'input-when-narrow') {
      setResultWhenNarrowVisible('block');
      setResultWhenWideVisible('sm:hidden');
    } else if (id === 'input-when-wide') {
      setResultWhenNarrowVisible('hidden');
      setResultWhenWideVisible('sm:block');
    }

    // 빈 값일 때
    if (value === '') {
      setInput('');
      setResults([]);
    } else {
      setInput(value);
      setResults(filtered);
    }
  };

  const toggleInputWhenNarrow = () => {
    if (inputWhenNarrowVisible === 'invisible') {
      setInputWhenNarrowVisible('translate-y-full');
    } else {
      setInputWhenNarrowVisible('invisible');
    }
    setResultWhenNarrowVisible('hidden');
    setResultWhenWideVisible('sm:hidden');
    setInput('');
    setResults([]);
  };

  function onFocus() {
    setResultWhenNarrowVisible('block');
    setResultWhenWideVisible('sm:block');
  }

  function onBlur() {
    if (linkMode) {
      linkMode = false;
      return;
    }
    setResultWhenNarrowVisible('hidden');
    setResultWhenWideVisible('sm:hidden');
  }

  function linkOnMouseDown() {
    linkMode = true;
  }

  function linkOnClick() {
    setInputWhenNarrowVisible(() => 'invisible');
    setInput('');
    setResults([]);
  }

  return (
    <>
      {/* 좁을 때 생기는 버튼 */}
      <button
        className="btn btn-ghost btn-circle sm:hidden"
        onClick={toggleInputWhenNarrow}
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
      <div className="search-when-narrow">
        <input
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type={'search'}
          placeholder="검색"
          className={`${inputWhenNarrowVisible} input absolute w-full h-full rounded-none border border-slate-400 left-0 z-[-10] sm:hidden transition ease-in-out duration-300`}
          id="input-when-narrow"
          value={input}
        />
        {results.length > 0 && (
          <div
            className={`${resultWhenNarrowVisible} absolute ${searchWhenNarrowResultsTop} left-0 overflow-y-scroll max-h-32 w-full stats rounded-none block sm:hidden`}
            onMouseDown={linkOnMouseDown}
            onClick={linkOnClick}
          >
            {results.map((product) => {
              return (
                <div key={product.id} className="p-2">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* 넓을 때 */}
      <div>
        <div className="search-when-wide">
          <input
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            type={'search'}
            placeholder="검색"
            className="hidden sm:block input input-bordered"
            id="input-when-wide"
            value={input}
          />
          {results.length > 0 && (
            <div
              className={`${resultWhenWideVisible} hidden absolute top-[${64}px] right-[56px] block overflow-y-scroll max-h-32 w-64 stats rounded-none`}
              onMouseDown={linkOnMouseDown}
              onClick={linkOnClick}
            >
              {results.map((product) => {
                return (
                  <div key={product.id} className="p-2">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
