import { useEmailStore } from '@/store/email.store';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config) => {
	const email = useEmailStore.getState().email;

	if (email) {
		config.headers['X-User-Email'] = email;
	}

	return config;
});
