import { defineStore } from "pinia";

import { baseRoutes } from "../../router";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id

export const routerStore = defineStore("router", {
	// other options...
	state: () => {
		return {
			routes: baseRoutes,
		};
	},

	getters: {
		get_routes: state => state.routes,
	},
});
