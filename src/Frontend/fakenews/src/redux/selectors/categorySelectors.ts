import { RootState } from '../store';

const categories = (state: RootState) => state.category.categories;

export const categorySelectors = {
	categories,
};
