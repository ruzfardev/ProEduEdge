import { CreateCourse, ICourseSection } from '@/redux/features/course/types';
import {ILogin, IUser} from '@/redux/models';
import axios from 'axios';
import { FilePondInitialFile } from 'filepond';
import { toast } from 'sonner';

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
}
export const uploadCourseRecoursesMultipleFx = async (files: Array<FilePondInitialFile | File | Blob | string>) => {
    try {
		toast.loading('Uploading files');
        const formData = new FormData();
        files.forEach((file) => {
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
}

// Handling Course Actions
export const createCourseFx = async (data: CreateCourse) =>{
	try {
		toast.loading('Creating course');
		const response = await api.post('create-course', data);
		toast.dismiss();
		toast.success('Course created successfully');
		return response.data
	} catch (error: any) {
		handleApiError(error)
	}
}
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
}
export const getAllCoursesFx = async () => {
	try {
		const response = await api.get('all-courses');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
}


// Handling Student Actions
export const getMyCoursesFx = async () => {
	try {
		const response = await api.get('all-courses');
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
}

export const getCourseWithContentFx = async () => {
	try {
		const response = await api.get(`get-content/2006`);
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
}