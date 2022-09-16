import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ProductData,
  CategoryFromHere,
  ProductState,
  categoryInKorean,
} from '../store/product';

function SkeletonProduct() {
  return (
    <div className="card shadow-xl m-2">
      <figure className="h-72 bg-white">
        <img className="w-1/2 h-1/2 animate-pulse bg-slate-400 border-none" />
      </figure>
      <div className="card-body h-52">
        <h2 className="mb-4">
          <div className="h-6 mb-2 animate-pulse bg-slate-400"></div>
          <div className="h-6 w-3/4 animate-pulse bg-slate-400"></div>
        </h2>
        <div>
          <div className="h-4 w-1/4 animate-pulse bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}

// 하나의 아이템을 나타내는 컴포넌트입니다.
// 아래의 ProductList의 자식 컴포넌트입니다.
function Product({ data }: { data: ProductData }) {
  return (
    <Link to={`/product/${data.id}`}>
      <div className="card shadow-xl m-2">
        <figure className="h-72 bg-white">
          <img
            src={data.image}
            alt={data.title}
            className="max-h-[70%] sm:w-1/2 hover:scale-110 ease-linear duration-200"
          />
        </figure>
        <div className="card-body h-52">
          <h2 className="card-title text-base">{data.title}</h2>
          <p>${data.price}</p>
        </div>
      </div>
    </Link>
  );
}

// product list 컴포넌트, export가 되는 컴포넌트입니다.
export default function ProductList({
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

  function showProductsByCategory() {
    switch (fetchStatus) {
      case 'loading':
        const ProductLimitCount = 4;
        return Array(ProductLimitCount)
          .fill(0)
          .map((item, index) => <SkeletonProduct key={index} />);
      case 'failed':
        return <div>죄송합니다. 현재 상품 정보를 불러올 수 없습니다.</div>;
      case 'fetched':
        return productData.map((productDatum, index) => {
          if (page === 'home' && index < 4) {
            return <Product key={productDatum.id} data={productDatum} />;
          } else if (page === 'category') {
            return <Product key={productDatum.id} data={productDatum} />;
          }
        });
      default:
        return <div></div>;
    }
  }

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
          {showProductsByCategory()}
        </div>
      </div>
    </div>
  );
}
