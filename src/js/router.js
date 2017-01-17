"use strict";

import Handlebars from "handlebars";

import loginPage from "../pages/login.html";
import homePage from "../pages/home.html";
import questionPage from "../pages/question.html";
import signupPage from "../pages/signup.html";
import resultPage from "../pages/result.html";
import listUsersPage from "../pages/listUsers.html";
import newQuestionPage from "../pages/newQuestion.html";

import loginController from "./controllers/loginController";
import homeController from "./controllers/homeController";
import questionController from "./controllers/questionController";
import signupController from "./controllers/signupController";
import resultController from "./controllers/resultController";
import newQuestionController from "./controllers/newQuestionController";

let config = {
  "login": {
  	url: "login",
    template: loginPage,
    controller: loginController.login
  },
  "Home": {
  	url: "home",
    template: homePage,
    controller: homeController.controller
  },
  "question": {
  	url: "quiz",
    template: questionPage,
    controller: questionController.controller
  },
  "signup": {
  	url: "signup",
  	template: signupPage,
  	controller: signupController.controller
  },
  "result": {
  	url: "result",
  	template: resultPage,
  	controller: resultController.controller
  },
  "List users": {
  	url: "users",
  	template: listUsersPage,
  	controller: function(){}
  },
  "Add new question": {
  	url: "newQuestion",
  	template: newQuestionPage,
  	controller: newQuestionController.controller
  }
};

function renderPage(name, data) {
	let main = document.getElementById("main");
  	let page = config[name];

  	let template = Handlebars.compile(page.template);
  	main.innerHTML = template(data);
  	setUrl(page.url);
  	page.controller(data);
}

Handlebars.registerHelper("ifCond", function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

let setUrl = (url) => {
    window.location.hash = url;
};

export default {
	renderPage: renderPage
};