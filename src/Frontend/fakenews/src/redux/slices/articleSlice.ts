import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleDto } from '../../models/DTO/ArticleDto';
import { CategoryDto } from '../../models/DTO/CategoryDto';

export interface ArticleState {
	editedArticle?: ArticleDto;
}

const initialState: ArticleState = {
	editedArticle: {
		id: 0,
		title: '',
		createdByUserId: '',
		content: '',
		shownOnHomepage: false,
		createdDate: new Date(),
		createdByUserUserName: '',
		categories: [],
		comments: [],
	},
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		fetchCategories: (state, { payload }: PayloadAction<CategoryDto[]>) => {
			console.log('asd');
		},
	},
});

export default categorySlice.reducer;
