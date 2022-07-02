import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import personService from './personService';
import { errorHandler } from '../../utilities/utilities';

const initialState = {
  person: {},
};

export const getPerson = createAsyncThunk(
  'person/getPerson',
  async (personId, thunkAPI) => {
    try {
      return await personService.getPersonService(personId);
    } catch (error) {
      return await thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPerson.fulfilled, (state, action) => {
      state.person = action.payload;
    });
  },
});

export const { reset } = personSlice.actions;
export default personSlice.reducer;
