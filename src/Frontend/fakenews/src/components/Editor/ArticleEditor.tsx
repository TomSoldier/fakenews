import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { EuiLoadingSpinner } from '@elastic/eui';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { articleSelectors } from '../../redux/selectors/articleSelectors';
import { articleActions } from '../../redux/actions/articleActions';

interface IArticleEditor {
	onChange: (htmlContent?: string) => void;
}

const ArticleEditor = (props: IArticleEditor) => {
	const [loading, setLoading] = useState(true);
	const editorRef = useRef<Editor>(null);
	const initialContent = useAppSelector(articleSelectors.initialContent);
	const dispatch = useAppDispatch();

	const onChange = () => {
		if (editorRef.current) {
			const content = editorRef.current.editor?.getContent();
			props.onChange(content);
		}
	};

	const onBlur = () => {
		if (editorRef.current) {
			const content = editorRef.current.editor?.getContent();
			props.onChange(content);
			dispatch(articleActions.saveInitialContent(content));
		}
	};

	return (
		<>
			{loading && (
				<div style={{ textAlign: 'center' }}>
					<EuiLoadingSpinner size='xl' />
				</div>
			)}
			<Editor
				ref={editorRef}
				apiKey='9p0gqwqztjhmdk9bchf3qd3ajrz8vb5zigjdd4ywq2c60fiy'
				initialValue={initialContent}
				init={{
					height: 500,
					menubar: true,
					plugins: [
						'autolink lists link image',
						'print preview help',
						'searchreplace code',
						'insertdatetime media table paste wordcount',
					],
					toolbar:
						'preview | searchreplace | undo redo paste | formatselect | bold italic underline | \
            			alignleft aligncenter alignright | autolink link | \
            			bullist numlist outdent indent | image media | table | code | insertdatetime | print | help |',
				}}
				onChange={onChange}
				onBlur={onBlur}
				onInit={() => {
					setLoading(false);
				}}
			/>
		</>
	);
};

export default ArticleEditor;
