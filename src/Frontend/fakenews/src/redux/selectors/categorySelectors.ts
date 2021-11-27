import { RootState } from '../store';

const categories = (state: RootState) => state.category.categories;
const actualCategory = (state: RootState) => state.category.actualCategory;

export const categorySelectors = {
	categories,
	actualCategory,
};
