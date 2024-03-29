import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const productURL = import.meta.env.VITE_PRODUCT_URL;

export type CategoryFromHere = 'fashion' | 'accessory' | 'digital' | 'all';

export type CategoryFromServer =
  | "men's clothing"
  | "women's clothing"
  | 'jewelery'
  | 'electronics';

export type Category = CategoryFromHere | CategoryFromServer;

export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  productStore: {
    fetchStatus: string;
    fashion: ProductData[];
    accessory: ProductData[];
    digital: ProductData[];
    all: ProductData[];
  };
}

const fetchProducts = createAsyncThunk('reducer1/fetchTitles', async () => {
  const response = await fetch(productURL);
  const products: ProductData[] = await response.json();

  let fashion: ProductData[] = [];
  let accessory: ProductData[] = [];
  let digital: ProductData[] = [];
  let all: ProductData[] = [];

  products.forEach((product) => {
    switch (product.category) {
      case "men's clothing":
        fashion.push(product);
        break;
      case "women's clothing":
        fashion.push(product);
        break;
      case 'jewelery':
        accessory.push(product);
        break;
      case 'electronics':
        digital.push(product);
        break;
      default:
        break;
    }

    all.push(product);
  });

  return { fashion, accessory, digital, all };
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    fetchStatus: '' as string,
    fashion: [] as ProductData[],
    accessory: [] as ProductData[],
    digital: [] as ProductData[],
    all: [] as ProductData[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchStatus = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.fetchStatus = 'fetched';
      state.fashion = action.payload.fashion;
      state.accessory = action.payload.accessory;
      state.digital = action.payload.digital;
      state.all = action.payload.all;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchStatus = 'failed';
    });
  },
});

const categoryInKorean: Record<Category, string> = {
  "men's clothing": '패션',
  "women's clothing": '패션',
  fashion: '패션',
  jewelery: '액세서리',
  accessory: '액세서리',
  electronics: '디지털',
  digital: '디지털',
  all: '',
};

export default productSlice;
export { fetchProducts, categoryInKorean };
