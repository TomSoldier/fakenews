import { RootState } from '../store';

const categories = (state: RootState) => state.category.categories;
const actualCategory = (state: RootState) => state.category.actualCategory;
const count = (state: RootState) => state.category.categories.length;
export const categorySelectors = {
	categories,
	actualCategory,
	count,
};
