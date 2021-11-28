export const baseURL = '/api';

export const endpoints = {
	Users: {
		register: '/Users/register',
		login: '/Users/login',
	},
	Articles: {
		postArticle: '/Articles',
		articles: '/Articles/searchArticles',
	},
	Categories: {
		categories: '/Categories',
	},
};
