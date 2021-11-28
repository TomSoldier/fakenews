import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { ArticleDto } from '../../models/DTO/ArticleDto';
import { CategoryDto } from '../../models/DTO/CategoryDto';

export interface ArticleState {
	editedArticle: ArticleDto;
	initialContent: string;
	articles: ArticleDto[];
	articlesByCategoryId: ArticleDto[];
}

const initialState: ArticleState = {
	editedArticle: {
		title: '',
		createdByUserId: '',
		content: '',
		shownOnHomepage: false,
		createdDate: moment(),
		createdByUserUserName: '',
		categories: [],
		comments: [],
	},
	initialContent: 'Tell a story...',
	articles: [],
	articlesByCategoryId: [],
};

export const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		saveCurrentEdit: (state, { payload }: PayloadAction<ArticleDto>) => {
			state.editedArticle = payload;
		},
		saveUserDetails: (
			state,
			{
				payload,
			}: PayloadAction<{
				createdByUserId: string;
				createdByUserUserName: string;
			}>
		) => {
			state.editedArticle.createdByUserId = payload.createdByUserId;
			state.editedArticle.createdByUserUserName = payload.createdByUserUserName;
		},
		saveTitle: (state, { payload }: PayloadAction<string>) => {
			state.editedArticle.title = payload;
		},
		saveContent: (state, { payload }: PayloadAction<string | undefined>) => {
			state.editedArticle.content = payload ?? '';
		},
		saveShownOnHomepage: (state, { payload }: PayloadAction<boolean>) => {
			state.editedArticle.shownOnHomepage = payload;
		},
		saveValidTo: (state, { payload }: PayloadAction<Moment>) => {
			state.editedArticle.validTo = payload;
		},
		saveCategories: (state, { payload }: PayloadAction<CategoryDto[]>) => {
			state.editedArticle.categories = payload;
		},
		saveInitialContent: (
			state,
			{ payload }: PayloadAction<string | undefined>
		) => {
			state.initialContent = payload ?? 'Tell a story...';
		},
		setBackDefault: (state) => {
			state.editedArticle = {
				title: '',
				createdByUserId: '',
				content: '',
				shownOnHomepage: false,
				createdDate: moment(),
				createdByUserUserName: '',
				categories: [],
				comments: [],
			};
			state.initialContent = 'Tell a story...';
		},
		storeArticles: (state, { payload }: PayloadAction<ArticleDto[]>) => {
			state.articles = payload;
		},
		storeArticlesByCategory: (
			state,
			{ payload }: PayloadAction<ArticleDto[]>
		) => {
			state.articlesByCategoryId = payload;
		},
	},
});

export default articleSlice.reducer;
