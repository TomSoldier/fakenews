export interface CommentDto {
	id: number;
	content: string;
	createdAt: Date;
	userId: string;
	articleId: string;
	byUsername: string;
}
