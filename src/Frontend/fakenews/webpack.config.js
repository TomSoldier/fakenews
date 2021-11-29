const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV, CI, WEBPACK_DEV_SERVER } = process.env;

const isDevelopment = WEBPACK_DEV_SERVER === 'true' && CI == null;
const isPuppeteer = NODE_ENV === 'puppeteer';

function employCache(loaders) {
	if (isDevelopment && !isPuppeteer) {
		return [
			{
				loader: 'cache-loader',
				options: {
					cacheDirectory: path.join(__dirname, '..', '.cache-loader'),
				},
			},
			...loaders,
		];
	}

	return loaders;
}

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve('dist'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: ['ts-loader'],
			},
			{
				test: [/\.js?$/, /\.ts?$/, /\.jsx?$/, /\.tsx?$/],
				enforce: 'pre',
				exclude: /node_modules/,
				use: ['source-map-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					...employCache([
						{
							loader: 'style-loader',
							options: { injectType: 'lazySingletonStyleTag' },
						},
						'css-loader',
						'sass-loader',
						'css-modules-typescript-loader',
					]),
				],
			},
			{
				test: /\.css$/,
				use: [...employCache(['style-loader', 'css-loader'])],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
	],
	devServer: {
		historyApiFallback: true,
		hot: true,
		open: true,
	},
};
