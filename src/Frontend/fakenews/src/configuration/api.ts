export const baseURL = '/api';

export const endpoints = {
	Users: {
		register: '/Users/register',
		login: '/Users/login',
	},
	Articles: {
		getArticle: '/Articles',
		postArticle: '/Articles',
		articles: '/Articles/searchArticles',
		deleteArticle: '/Articles',
	},
	Categories: {
		categories: '/Categories',
	},
	Comments: {
		comments: '/Comments',
	},
	HomePage: {
		homepage: '/HomePage',
	},
};
