import React, {FC, useEffect, useRef} from 'react';
import {Editor} from '@toast-ui/react-editor';

interface EditorComponentProps {
	getEditorInstance: (editor: Editor) => void;
	initValue?: string;
	height?: string;
}

export const EditorComponent: FC<EditorComponentProps> = ({
	getEditorInstance,
	initValue,
	height,
}) => {
	const editorRef = useRef<Editor | null>(null);

	useEffect(() => {
		if (editorRef.current) {
			getEditorInstance(editorRef.current);
		}
	}, [getEditorInstance, editorRef]);
	return (
		<Editor
			ref={editorRef}
			initialValue={initValue}
			previewStyle="vertical"
			height={height || '600px'}
			initialEditType="wysiwyg"
			useCommandShortcut={true}
		/>
	);
};
