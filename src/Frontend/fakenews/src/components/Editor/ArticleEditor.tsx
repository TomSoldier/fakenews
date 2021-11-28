import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ArticleEditor = () => {
	const editorRef = useRef<Editor>(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.editor?.getContent());
		}
	};
	return (
		<>
			<Editor
				apiKey='9p0gqwqztjhmdk9bchf3qd3ajrz8vb5zigjdd4ywq2c60fiy'
				initialValue='<p>Initial content</p>'
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
				onChange={log}
			/>
			<button onClick={log}>Log editor content</button>
		</>
	);
};

export default ArticleEditor;
