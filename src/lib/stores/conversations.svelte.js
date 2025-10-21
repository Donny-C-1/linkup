import { PUBLIC_SERVER_URL } from "$env/static/public";

let conversations = $state([]);
let selectedConversation = $state(null);

export default {
	get list() {
		return conversations;
	},

	get current() {
		return selectedConversation;
	},

	setCurrent(conv) {
		selectedConversation = conv;
	},

	async getConversations() {
		try {
			const response = await fetch(`${PUBLIC_SERVER_URL}/conversations`, { credentials: "include" });
			const data = await response.json();

			if (!response.ok) throw new Error("Failed to fetch conversations");

			conversations = data;

			return conversations;
		} catch (err) {
			console.error(err);
			return [];
		}
	},

	addConversation(conv) {
		conversations.push(conv);
	},

	async create(friendID, isGroup = false) {
		try {
			const response = await fetch(`${PUBLIC_SERVER_URL}/conversations`, {
				method: "post",
				body: JSON.stringify({
					isGroup,
					members: [friendID]
				}),
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			const data = await response.json();

			if (!response.ok) throw new Error(`${data.title}: ${data.message}`);

			return data;
		} catch (err) {
			console.log(err);
			return null;
		}
	}
};
