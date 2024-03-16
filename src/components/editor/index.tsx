import React, {FC, useEffect, useRef} from 'react';
import {Editor} from '@toast-ui/react-editor';

interface EditorComponentProps {
	getEditorInstance: (editor: Editor) => void;
}

export const EditorComponent: FC<EditorComponentProps> = ({
	getEditorInstance,
}) => {
	const editorRef = useRef<Editor | null>(null);

	useEffect(() => {
		if (editorRef.current) {
			getEditorInstance(editorRef.current);
		}
	}, [getEditorInstance]);
	return (
		<Editor
			ref={editorRef}
			initialValue="hello react editor world!"
			previewStyle="vertical"
			height="600px"
			initialEditType="wysiwyg"
			useCommandShortcut={true}
		/>
	);
};
