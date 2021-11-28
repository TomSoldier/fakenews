import { Moment } from 'moment';
import { CategoryDto } from './CategoryDto';
import { CommentDto } from './CommentDto';

export interface ArticleDto {
	id?: number;
	title: string;
	createdByUserId: string;
	content: string;
	shownOnHomepage: boolean;
	createdDate: Moment;
	validTo?: Moment;
	createdByUserUserName: string;
	categories: CategoryDto[];
	comments: CommentDto[];
}
