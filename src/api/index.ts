import {
	CourseContent,
	CreateCourse,
	ICourseSection,
	Meeting,
} from '@/redux/features/course/types';
import {
	Enrollment,
	IChangePassword,
	ILogin,
	IUser,
	Payment,
} from '@/redux/models';
import axios from 'axios';
import {FilePondInitialFile} from 'filepond';
import {toast} from 'sonner';
import {SAS_TOKEN} from '@/constants/enum';
import {jwtDecode} from 'jwt-decode';
import {ILoginResponse} from '@/redux/features/users/types';
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

function getToken() {
	return localStorage.getItem('token'); // Adjust if your token is stored under a different key
}

// Decode token and check expiration
function isTokenValidOrUndefined() {
	const token = getToken();
	if (!token) return false;

	try {
		const {exp} = jwtDecode(token);
		// @ts-ignore
		if (exp < Date.now() / 1000) {
			return false; // Token has expired
		}
	} catch (error) {
		return false; // Token is invalid
	}

	return true;
}

api.interceptors.request.use(
	(config) => {
		if (!isTokenValidOrUndefined()) {
			// endpoint is /login or /register do not reject
			if (
				config.url?.includes('upload-avatar') ||
				config.url?.includes('register') ||
				config.url?.includes('login')
			) {
				return config;
			}
			console.log('Token is expired or not available');
			window.location.href = '/login';
			localStorage.removeItem('token');
			return Promise.reject(new Error('Token is expired or not available'));
		}

		const token = getToken();
		// @ts-ignore
		config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`; // Prefix with 'Bearer' if needed by your backend
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export const videoApi = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `${SAS_TOKEN.REACT_VIDEOSDK_API_KEY}`,
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
export const login = async (user: ILogin): Promise<ILoginResponse> => {
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
		toast.loading('Registering');
		const response = await api.post('register', user);
		toast.dismiss();
		toast.success('Registration successful');
		window.location.href = '/';
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
export const changePassword = async (data: IChangePassword) => {
	try {
		toast.loading('Changing password');
		const response = await api.put('change-password', data);
		toast.dismiss();
		toast.success('Password changed successfully');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
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
export const getEnrolledStudentsFx = async () => {
	try {
		const response = await api.get('students-by-courses');
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
		if (response.data.data.length === 0) {
			throw new Error('No recordings found');
		}
		return response.data.data[0].file.filePath;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const updateMeetingFx = async (data: Meeting) => {
	try {
		const response = await api.put('update-meeting', data);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const deleteMeetingFx = async (id: string) => {
	try {
		toast.loading('Deleting meeting');
		const response = await api.delete(`delete-meeting/${id}`);
		toast.dismiss();
		toast.success('Meeting deleted successfully');
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
