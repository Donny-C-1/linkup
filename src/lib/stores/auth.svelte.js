import { PUBLIC_SERVER_URL } from '$env/static/public';

let user = $state({});
let isAuthenticated = $state(false);

export default {
	get user() {
		return user;
	},
	get isAuth() {
		return isAuthenticated;
	},
	login: (userData) => {
		isAuthenticated = true;
		Object.assign(user, userData);
	},
	logout: () => {
		isAuthenticated = false;
		// todo Empty user store
	},
	checkAuth: async () => {
		const response = await fetch(`${PUBLIC_SERVER_URL}/auth/profile`, { credentials: 'include' });
		if (response.ok) {
			const data = await response.json();

			Object.assign(user, { id: data.id, username: data.username });

			isAuthenticated = true;

			return true;
		} else {
			return false;
		}
	}
};
