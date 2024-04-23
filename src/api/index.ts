import {
	CourseContent,
	CreateCourse,
	ICourseSection,
} from '@/redux/features/course/types';
import {Enrollment, ILogin, IUser, Payment} from '@/redux/models';
import axios from 'axios';
import {FilePondInitialFile} from 'filepond';
import {toast} from 'sonner';
import {SAS_TOKEN} from '@/constants/enum';
const API_BASE_URL = 'https://api.videosdk.live/v2/';
export const api = axios.create({
	// baseURL: 'http://localhost:8080/api/proeduedge/',
	baseURL: 'http://localhost:5000/api/proeduedge/',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	},
});
export const videoApi = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${SAS_TOKEN.REACT_VIDEOSDK_API_KEY}`,
	},
});
const handleApiError = (error: any) => {
	let errorMessage = 'An error occurred';
	if (error.response && error.response.data && error.response.data.message) {
		errorMessage = error.response.data.message;
	} else if (error.message) {
		errorMessage = error.message;
	}
	throw new Error(errorMessage);
};
// Auth
export const login = async (user: ILogin) => {
	try {
		const response = await api.post('login', user);
		return response.data;
	} catch (error: any) {
		let errorMessage = 'An error occurred during login';
		if (error.response && error.response.data && error.response.data.message) {
			errorMessage = error.response.data.message;
		} else if (error.message) {
			errorMessage = error.message;
		}
		throw new Error(errorMessage);
	}
};
export const register = async (user: IUser) => {
	try {
		const response = await api.post('register', user);
		return response.data;
	} catch (error: any) {
		let errorMessage = 'An error occurred during registration';
		if (error.response && error.response.data && error.response.data.message) {
			errorMessage = error.response.data.message;
		} else if (error.message) {
			errorMessage = error.message;
		}
		throw new Error(errorMessage);
	}
};
// Categories
export const getCategoriesFx = async () => {
	try {
		const response = await api.get('get-categories');
		return response.data;
	} catch (error: any) {
		let errorMessage = 'An error occurred during fetching categories';
		if (error.response && error.response.data && error.response.data.message) {
			errorMessage = error.response.data.message;
		} else if (error.message) {
			errorMessage = error.message;
		}
		throw new Error(errorMessage);
	}
};
// Handling Media Files
export const uploadCourseBannerFx = async (file: File) => {
	try {
		toast.loading('Uploading banner');
		const formData = new FormData();
		formData.append('file', file);
		const response = await api.post('upload/banners', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		toast.dismiss();
		toast.success('Banner uploaded successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const uploadCourseRecoursesFx = async (file: File) => {
	try {
		toast.loading('Uploading file');
		const formData = new FormData();
		formData.append('file', file);
		const response = await api.post('upload/resourses', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		toast.dismiss();
		toast.success('File uploaded successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const uploadCourseRecoursesMultipleFx = async (
	files: Array<FilePondInitialFile | File | Blob | string>
) => {
	try {
		toast.loading('Uploading files');
		const formData = new FormData();
		files.forEach((file) => {
			// @ts-ignore
			formData.append('files', file);
		});
		const response = await api.post('uploadMultiple/recourses', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		toast.dismiss();
		toast.success('Files uploaded successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

// Handling Course Actions
export const createCourseFx = async (data: CreateCourse) => {
	try {
		toast.loading('Creating course');
		const response = await api.post('create-course', data);
		toast.dismiss();
		toast.success('Course created successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const addCourseSectionFx = async (data: ICourseSection) => {
	try {
		toast.loading('Adding course section');
		const response = await api.post('add-content', data);
		toast.dismiss();
		toast.success('Course section added successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const getAllCoursesFx = async () => {
	try {
		const response = await api.get('all-courses');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const getCourseByIdFx = async (id: string) => {
	try {
		const response = await api.get(`course/${id}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const updateCourseFx = async (data: CreateCourse) => {
	try {
		toast.loading('Updating course');
		const response = await api.put('edit-course', data);
		toast.dismiss();
		toast.success('Course updated successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const updateCourseSectionFx = async (
	data: CourseContent,
	courseId: number
) => {
	try {
		toast.loading('Updating course section');
		const response = await api.put(`edit-section/${courseId}`, data);
		toast.dismiss();
		toast.success('Course section updated successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
// Handling Student Actions
export const getMyCoursesFx = async (id: number) => {
	try {
		console.log(id, 'ID');
		const response = await api.get(`student-courses/${id}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const getCourseWithContentFx = async (id: number) => {
	try {
		const response = await api.get(`get-content/${id}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const getInstructorCoursesFx = async (id: number) => {
	try {
		const response = await api.get(`instructor-courses/${id}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const enrollCourseFx = async (data: Enrollment) => {
	try {
		const response = await api.post('enroll', data);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const payForCourseFx = async (data: Payment) => {
	try {
		const response = await api.post('pay', data);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

// Handling Instructor Actions
export const getAllMeetingsFx = async () => {
	try {
		const response = await api.get('all-meetings');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
export const getMeetingRecordingsFx = async (roomId: string) => {
	try {
		const response = await videoApi.get(`recordings?roomId=${roomId}`);
		console.info(response.data);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

// Handling Media Files
export const deleteFileFx = async (id: string) => {
	try {
		const response = await api.delete(`delete/${id}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const deleteSectionFx = async (id: string, courseId: number) => {
	try {
		const response = await api.delete(`delete-section/${id}/${courseId}`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};
