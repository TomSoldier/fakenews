import { RootState } from '../store';

const title = (state: RootState) => state.article.editedArticle.title;

const createdByUserId = (state: RootState) =>
	state.article.editedArticle.createdByUserId;

const content = (state: RootState) => state.article.editedArticle.content;

const shownOnHomepage = (state: RootState) =>
	state.article.editedArticle.shownOnHomepage;

const createdDate = (state: RootState) =>
	state.article.editedArticle.createdDate;

const createdByUserUserName = (state: RootState) =>
	state.article.editedArticle.createdByUserUserName;

const categories = (state: RootState) => state.article.editedArticle.categories;

const comments = (state: RootState) => state.article.editedArticle.comments;

const validTo = (state: RootState) => state.article.editedArticle.validTo;

const fullArticle = (state: RootState) => state.article.editedArticle;

const initialContent = (state: RootState) => state.article.initialContent;

const articles = (state: RootState) => state.article.articles;

const actualArticle = (state: RootState) => state.article.actualArticle;
const actualComments = (state: RootState) =>
	state.article.actualArticle.comments;

const homePageArticles = (state: RootState) => state.article.homepageArticles;

const articlesByCategoryId = (state: RootState) =>
	state.article.articlesByCategoryId;

const searchResults = (state: RootState) => state.article.searchResults;

export const articleSelectors = {
	title,
	createdByUserId,
	content,
	shownOnHomepage,
	createdDate,
	createdByUserUserName,
	categories,
	comments,
	validTo,
	fullArticle,
	initialContent,
	articles,
	actualArticle,
	actualComments,
	homePageArticles,
	articlesByCategoryId,
	searchResults,
};
