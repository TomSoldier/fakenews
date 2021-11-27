import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryDto } from '../../models/DTO/CategoryDto';

export interface CategoryState {
	categories: CategoryDto[];
	actualCategory?: CategoryDto;
}

const initialState: CategoryState = {
	categories: [],
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		fetchCategories: (state, { payload }: PayloadAction<CategoryDto[]>) => {
			state.categories = payload;
		},
		removeCategory: (state, { payload }: PayloadAction<number>) => {
			state.categories = state.categories.filter(
				(category) => category.id !== payload
			);
		},
		setActualCategory: (
			state,
			{ payload }: PayloadAction<CategoryDto | undefined>
		) => {
			state.actualCategory = payload;
		},
	},
});

export default categorySlice.reducer;
