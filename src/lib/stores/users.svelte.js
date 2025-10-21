import { PUBLIC_SERVER_URL } from "$env/static/public";
import { SvelteMap } from "svelte/reactivity";

let users = new SvelteMap();
let userProfileID = $state("");

export default {
	async getUser(id) {
		let user = users.get(id);
		if (user) return user;
		try {
			const response = await fetch(`${PUBLIC_SERVER_URL}/users/${id}`, { credentials: "include" });
			const data = await response.json();

			if (!response.ok) {
				throw new Error(`${data.title}: ${data.message}` || "Failed to fetch user");
			}

			users.set(data._id, data);

			return data;
		} catch (err) {
			console.error(err);
			return null;
		}
	},
	get userProfileID() {
		return userProfileID;
	},
	set userProfileID(id) {
		userProfileID = id;
	}
};
