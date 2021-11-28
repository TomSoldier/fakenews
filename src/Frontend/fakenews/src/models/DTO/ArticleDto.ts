import { CategoryDto } from './CategoryDto';
import { CommentDto } from './CommentDto';

export interface ArticleDto {
	id: number;
	title: string;
	createdByUserId: string;
	content: string;
	shownOnHomepage: boolean;
	createdDate: Date;
	createdByUserUserName: string;
	categories: CategoryDto[];
	comments: CommentDto[];
}
