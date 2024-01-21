import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Http/settings";

// ? тут все наши состояние
const initialState = {
  latest: [],
  infoMeal: [],
  popular: [],
  popularInfo: [],
  text: "",
  randomMeal: [],
  randomIngredient: [],
  country: [],
  countryInfo: [],
  alfavitMeal: [],
  search: [],
};

//? Latest Meal по цикл последния блюда 
export const getLatestMeal = createAsyncThunk(
  "latest/getLatestMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      let lastMealId = 53083; // Предполагаем, что это ID последнего блюда
      let mealRequests = [];

      for (let i = 0; i < 8; i++) {
        mealRequests.push(instance.get(`lookup.php?i=${lastMealId - i}`));
      }

      const responses = await Promise.all(mealRequests);
      const meals = responses.map(response => response.data.meals[0]);

      dispatch(latestMeal(meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

//? info каждый блюдо по id 
export const getInfoMeal = createAsyncThunk(
  "infoMeal/getInfoMeal",
  async (elem, { rejectWithValue, dispatch }) => {
    // ? получаем id и передаем по запросы приходят блюда с информацией
    const result = await instance.get(`lookup.php?i=${elem}`);
    dispatch(ingoIngredientMeal(result.data.meals));
  }
);

//? Отправляем запрос на популарные блюда
export const getPopular = createAsyncThunk(
  "popular/getPopular",
  async (_, { rejectWithValue, dispatch }) => {
    const result = await instance.get("list.php?i=list");
    dispatch(popularMeal(result.data.meals));
    dispatch(getRandomIngredients(result.data.meals));
  }
);

//?filter.php?i=
// ? Отправляем запросы по id на популярный блюда 
export const getPopularInfo = createAsyncThunk(
  "popularInfo/getPopularInfo",
  async (elem, { rejectWithValue, dispatch }) => {
    const response = await instance.get(`filter.php?i=${elem}`);
    dispatch(popularInfoMeal(response.data.meals));
  }
);

//? Запрос на рандомные блюда отправляем запрос 8 раз на одну api 
export const getRandomMeal = createAsyncThunk(
  "randomMeal/getRandomMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const random = [1, 2, 3, 4, 5, 6, 7, 8];
      const responses = await Promise.all(
        random.map(() => instance.get("random.php"))
      );
      const randomMealsData = responses.map(
        (response) => response.data.meals[0]
      );
      dispatch(getRandom(randomMealsData));
    } catch (error) {
      console.error("Error fetching random Meals:", error);
    }
  }
);

// ? Отправляем запросы по флаг выводим по народные блюда
export const getCountryMeals = createAsyncThunk(
  "country/getCountryMeals",
  async (_, { rejectWithValue, dispatch }) => {
    const response = await instance.get("list.php?a=list");
    dispatch(getCountry(response.data.meals));
  }
);

//? Отправляем запросы информация по каждый еда по id
export const getCountryInfoMeal = createAsyncThunk(
  "countryInfo/getCountryInfoMeal",
  async (elem, { rejectWithValue, dispatch }) => {
    const response = await instance.get(`filter.php?a=${elem}`);
    dispatch(getCountryInfo(response.data.meals));
  }
);

// ? Отправляем запрос по Алфавиту
export const getAlfavitMeals = createAsyncThunk(
  "alfavitMeal/getAlfavitMeals",
  async (elem, { rejectWithValue, dispatch }) => {
    const res = await instance.get(`search.php?f=${elem}`);
    dispatch(getAlfavitMeal(res.data.meals));
  }
);
// ? Отправляем запрос для пойск 
export const getSearchMeals = createAsyncThunk(
  "search/getSearchMeals",
  async (elem, { rejectWithValue,dispatch }) => {
    const res=await instance.get(`search.php?s=${elem}`)
    dispatch(getSearchMeal(res.data.meals))
  }
);

const mealSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    latestMeal: (state, action) => {
      state.latest = action.payload;
    },
    ingoIngredientMeal: (state, action) => {
      state.infoMeal = action.payload;
    },
    popularMeal: (state, action) => {
      state.popular = action.payload;
    },
    popularInfoMeal: (state, action) => {
      state.popularInfo = action.payload;
    },
    onDescription: (state, action) => {
      state.text = action.payload;
    },
    getRandom: (state, action) => {
      state.randomMeal = action.payload;
    },
    getRandomIngredients: (state, action) => {
      state.randomIngredient = action.payload;
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
    getCountryInfo: (state, action) => {
      state.countryInfo = action.payload;
    },
    getAlfavitMeal: (state, action) => {
      state.alfavitMeal = action.payload;
    },
    getSearchMeal:(state,action)=>{
      state.search=action.payload
    }
  },
});

// ? export нашей функция чтобы получит их потом где нам нужно
export const {
  latestMeal,
  ingoIngredientMeal,
  popularMeal,
  popularInfoMeal,
  onDescription,
  getRandom,
  getRandomIngredients,
  getCountry,
  getCountryInfo,
  getAlfavitMeal,
  getSearchMeal
} = mealSlice.actions;

export default mealSlice.reducer;
