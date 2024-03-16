import {Editor} from '@toast-ui/react-editor';
import React from 'react';
import {Button} from '@/components/ui';
export const EditorComponent = () => {
	const editorRef = React.useRef<Editor | null>(null);
	return (
		<>
			<Editor
				ref={editorRef}
				initialValue="hello react editor world!"
				previewStyle="vertical"
				height="600px"
				initialEditType="wysiwyg"
				useCommandShortcut={true}
				onChange={(e) => console.log(e)}
			/>
			<Button
				onClick={() =>
					console.log(editorRef.current?.getInstance().getMarkdown())
				}
			>
				Get Markdown
			</Button>
		</>
	);
};
