import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  CategoryFromHere,
  ProductState,
  categoryInKorean,
} from '../store/product';
import ProductsResult from './ProductsResult';

// product list 컴포넌트, export가 되는 컴포넌트입니다.
export default function ProductsContainer({
  page,
  category,
}: {
  page: string;
  category: CategoryFromHere;
}) {
  const productListComp = useRef<HTMLDivElement>(null);
  const productContainer = useRef<HTMLDivElement>(null);

  const fetchStatus = useSelector(
    (state: ProductState) => state.productStore.fetchStatus,
  );
  const productData = useSelector(
    (state: ProductState) => state.productStore[category],
  );

  // 홈페이지와 카테고리 페이지의 css 구분하기
  // 오류가 날 경우 스타일 변경하기
  useEffect(() => {
    if (page === 'home') {
      productListComp.current?.classList.add('overflow-x-scroll');
      productContainer.current?.classList.add('w-[1000px]', 'grid-cols-4');
    } else if (page === 'category') {
      productContainer.current?.classList.add('grid-cols-1');
    }

    if (fetchStatus === 'failed') {
      productContainer.current?.classList.remove('grid');
      productContainer.current?.classList.add('text-center');
    }
  }, [fetchStatus]);

  return (
    <div>
      <h1 className="text-center pt-16 mb-8 text-4xl font-bold">
        {categoryInKorean[category]}
      </h1>
      <div
        id="product-list-component"
        className="p-4 sm:overflow-visible"
        ref={productListComp}
      >
        <div
          id="product-container"
          className="grid sm:w-full sm:grid-cols-2 md:grid-cols-4"
          ref={productContainer}
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
