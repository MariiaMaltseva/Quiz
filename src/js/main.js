"use strict";

import router from "./router";
import login from "./controllers/loginController";

router.renderPage("signup");

login.onLogin = (user) => {
	router.renderPage("Home", user);
};
