import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryDto } from '../../models/DTO/CategoryDto';

export interface CategoryState {
	categories: CategoryDto[];
}

const initialState: CategoryState = {
	categories: [],
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		fetchCategories: (state, { payload }: PayloadAction<CategoryDto[]>) => {
			state.categories = [...payload];
		},
	},
});

export default categorySlice.reducer;
