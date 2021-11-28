import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { ArticleDto } from '../../models/DTO/ArticleDto';
import { CategoryDto } from '../../models/DTO/CategoryDto';
import { CommentDto } from '../../models/DTO/CommentDto';

export interface ArticleState {
	editedArticle: ArticleDto;
	initialContent: string;
	articles: ArticleDto[];
	articlesByCategoryId: ArticleDto[];
	actualArticle: ArticleDto;
	homepageArticles: ArticleDto[];
}

const initialState: ArticleState = {
	editedArticle: {
		id: 0,
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
	actualArticle: {
		id: 0,
		title: '',
		createdByUserId: '',
		content: '',
		shownOnHomepage: false,
		createdDate: moment(),
		createdByUserUserName: '',
		categories: [],
		comments: [],
	},
	homepageArticles: [],
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
				id: 0,
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
		setActualArticle: (state, { payload }: PayloadAction<ArticleDto>) => {
			state.actualArticle = payload;
		},
		setActualArticleComments: (
			state,
			{ payload }: PayloadAction<CommentDto[]>
		) => {
			state.actualArticle.comments = payload;
		},
		addArticleComment: (state, { payload }: PayloadAction<CommentDto>) => {
			state.actualArticle.comments = [...state.actualArticle.comments, payload];
		},
		setHomePageArticles: (state, { payload }: PayloadAction<ArticleDto[]>) => {
			state.homepageArticles = payload;
		},
	},
});

export default articleSlice.reducer;
