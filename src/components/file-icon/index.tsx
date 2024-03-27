import React, {FC} from 'react';
import {
	FaFilePdf,
	FaFileWord,
	FaFileExcel,
	FaFilePowerpoint,
	FaFileImage,
	FaFileAlt,
	FaFileArchive,
	FaFileAudio,
	FaFileVideo,
	FaFile,
} from 'react-icons/fa';

interface FileIconProps {
	mimeType: string;
	size: number;
}
// A helper component to render the appropriate icon
const FileIcon: FC<FileIconProps> = ({mimeType, size}) => {
	const fileIcons = {
		'application/pdf': <FaFilePdf size={size} />,
		'application/msword': <FaFileWord size={size} />,
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document': (
			<FaFileWord size={size} />
		),
		'application/vnd.ms-excel': <FaFileExcel size={size} />,
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': (
			<FaFileExcel size={size} />
		),
		'application/vnd.ms-powerpoint': <FaFilePowerpoint size={size} />,
		'application/vnd.openxmlformats-officedocument.presentationml.presentation':
			<FaFilePowerpoint size={size} />,
		'image/png': <FaFileImage size={size} />,
		'image/jpeg': <FaFileImage size={size} />,
		'image/gif': <FaFileImage size={size} />,
		'audio/mpeg': <FaFileAudio size={size} />,
		'audio/wav': <FaFileAudio size={size} />,
		'video/mp4': <FaFileVideo size={size} />,
		'video/quicktime': <FaFileVideo size={size} />,
		'application/zip': <FaFileArchive size={size} />,
		'application/x-rar-compressed': <FaFileArchive size={size} />,
		'text/plain': <FaFileAlt size={size} />,
		default: <FaFile size={size} />,
	};

	// Lowercase the MIME type to ensure case-insensitive matching
	const iconComponent =
		fileIcons[mimeType.toLowerCase()] || fileIcons['default'];

	return iconComponent;
};

export default FileIcon;
