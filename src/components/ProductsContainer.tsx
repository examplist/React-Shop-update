import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  CategoryFromHere,
  ProductState,
  categoryInKorean,
} from '../store/product';
import ProductsResult from './ProductsResult';

export default function ProductsContainer({
  page,
  category,
}: {
  page: string;
  category: CategoryFromHere;
}) {
  const outerContainer = useRef<HTMLDivElement>(null);
  const innerContainer = useRef<HTMLDivElement>(null);

  const fetchStatus = useSelector(
    (state: ProductState) => state.productStore.fetchStatus,
  );
  const productData = useSelector(
    (state: ProductState) => state.productStore[category],
  );

  useEffect(() => {
    // 홈페이지와 카테고리 페이지의 css 구분하기
    if (page === 'home') {
      outerContainer.current?.classList.add('overflow-x-scroll');
      innerContainer.current?.classList.add('w-[1000px]', 'grid-cols-4');
    } else if (page === 'category') {
      innerContainer.current?.classList.add('grid-cols-1');
    }
    // 오류가 날 경우 스타일 변경하기
    if (fetchStatus === 'failed') {
      innerContainer.current?.classList.remove('grid');
      innerContainer.current?.classList.add('text-center');
    }
  }, [fetchStatus]);

  return (
    <div id="products-container">
      <h1 className="text-center pt-16 mb-8 text-4xl font-bold">
        {categoryInKorean[category]}
      </h1>
      <div className="p-4 sm:overflow-visible" ref={outerContainer}>
        <div
          className="grid sm:w-full sm:grid-cols-2 md:grid-cols-4"
          ref={innerContainer}
        >
          <ProductsResult
            page={page}
            fetchStatus={fetchStatus}
            productData={productData}
          />
        </div>
      </div>
    </div>
  );
}
