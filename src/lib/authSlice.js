
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';


const URL= process.env.NEXT_PUBLIC_API_URL


export const fetchData = createAsyncThunk(
  'counterSlice/fetchData',
  async (category) => {
    try {
      const response = await fetch(`${URL}/${category}`,{ next: { revalidate: 3600 } });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }  
);


  export const fetchAllData = createAsyncThunk(
    'counterSlice/fetchAllData',
    async () => {
      try {
        const response = await fetch(`${URL}/productsAll`,{ next: { revalidate: 3600 } });
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  );



  const saveCartToLocalStorage = (carts) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(carts));
      }
    
  };




export const counterSlice = createSlice({
  name: "counterSlice",
  initialState :{
    prodectes:[],
    Allprodectes:[],
    carts: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [],
    status:"idle",
    email:'',
    currentCategory: 'products/1',
  },
  reducers: {
    add: (state, action) => {
      const newItem = action.payload;

      // تحقق مما إذا كان العنصر موجودًا بالفعل
      const isItemInCart = state.carts.some(
        (item) => item._id === newItem._id // المقارنة باستخدام معرف فريد
      );

      if (!isItemInCart) {
        state.carts.push(newItem); // إضافة العنصر الجديد
        saveCartToLocalStorage(state.carts);
      } else {
        console.log("Item is already in the cart");
      }
    },
    addquantity : (state , action)=>{
        const {productId , newQuantity } = action.payload;
        const productToUpdate = state.carts.find(product =>product._id==productId );
        if(productToUpdate){
            productToUpdate.quantity = newQuantity;
            saveCartToLocalStorage(state.carts);
        }

    },
    addDelivary:(state, action)=>{
      const {productId , deliveryValue} = action.payload;
      const productToUpdate = state.carts.find(product => product._id ==productId );
      if(productToUpdate){
        productToUpdate.Delivery = deliveryValue;
        saveCartToLocalStorage(state.carts); 
      }

    },
    remove: (state, action) => {
        const { id } = action.payload;
        state.carts = state.carts.filter(item => item._id !== id);
        saveCartToLocalStorage(state.carts);
      },
      setCategory: (state, action) => {
        state.currentCategory = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading" ;
      })
      .addCase(fetchData.fulfilled, (state, action) => {

     state.status = "succeeded" ;   
     state.prodectes = action.payload;
   
    })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        console.error('Error fetching data:', action.error);
      })
      .addCase(fetchAllData.pending, (state) => {
        state.status = "loading" ;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {

     state.status = "succeeded" ;   
     state.Allprodectes = action.payload;
   
    })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = "failed";
        console.error('Error fetching data:', action.error);
      })

  },
});

export const {add, addquantity ,addDelivary , remove , setCategory } = counterSlice.actions ; 
export default counterSlice.reducer ;