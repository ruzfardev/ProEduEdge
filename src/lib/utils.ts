import {SAS_TOKEN} from '@/constants/enum';
import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
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
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export class LocalStorageManager {
	private static instance: LocalStorageManager;
	private storage: Storage;

	private constructor() {
		this.storage = window.localStorage;
	}

	static getInstance(): LocalStorageManager {
		if (!LocalStorageManager.instance) {
			LocalStorageManager.instance = new LocalStorageManager();
		}
		return LocalStorageManager.instance;
	}

	setItem(key: string, value: string) {
		this.storage.setItem(key, value);
	}

	getItem(key: string) {
		const item = this.storage.getItem(key);
		if (!item) return '';
		return JSON.parse(item);
	}
	removeItem(key: string) {
		this.storage.removeItem(key);
	}
}

export const getBlobUrlWithSasToken = (
	blobUrl: string | undefined,
	containerName: string
) => {
	let sasToken;
	switch (containerName) {
		case 'banners':
			sasToken = SAS_TOKEN.REACT_APP_BANNERS_SAS_TOKEN;
			break;
		case 'avatar':
			sasToken = SAS_TOKEN.REACT_APP_AVATAR_SAS_TOKEN;
			break;
		case 'recourses':
			sasToken = SAS_TOKEN.REACT_APP_RESOURCES_SAS_TOKEN;
			break;
		case 'recordings':
			sasToken = SAS_TOKEN.REACT_APP_RECORDINGS_SAS_TOKEN;
			break;
		default:
			sasToken = '';
	}

	if (!sasToken) {
		throw new Error(`SAS token for container ${containerName} not found.`);
	}

	// Concatenate the Blob URL with the SAS token
	return `${blobUrl}?${sasToken}`;
};

export const generateRecordingUrl = (recordingPath: string) => {
	return `https://proeduedge11888.blob.core.windows.net/recordings/${recordingPath}`;
};

export function isVideoFile(mimeType: string) {
	const videoMimeTypes = [
		'video/mp4',
		'video/webm',
		'video/ogg',
		'video/mpeg',
		'video/avi',
		'video/quicktime',
	];

	return videoMimeTypes.includes(mimeType);
}
