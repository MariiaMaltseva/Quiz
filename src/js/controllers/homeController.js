"use strict";

import router from "../router.js";
import storage from "../storage.js";

export default {
	controller: controller()
};

let itemNavbar = ["Home", "List users", "Add new question"];

function controller(){
	storage.init();
	let questionData = storage.getQuestionData();
	return function(user){
		updateQuestionData(questionData, user.name);

		if(document.getElementById("childNavbar") === null){
			let parent = document.getElementById("navbarParent");
			let divElement = document.createElement("div");
			divElement.setAttribute("class", "navbar-collapse collapse");
			divElement.setAttribute("id", "childNavbar");
			renderRightNavbar(parent, user.name, divElement);

			if(storage.currentUser === null){
				renderStartQuizButton(questionData);
			} else {
				renderNavbarItems(divElement);
			}
			parent.appendChild(divElement);
		}
	};
}

function updateQuestionData(questionData, userName){
	let listQuestions = storage.getQuestionsList();
	let listSize = listQuestions.length;
	questionData.numberOfQuestion = listSize;

	questionData.question = null;
	questionData.questionNumber = 1;
	questionData.userName = userName;
	questionData.numberOfCorrectAnswers = 0;
}

function renderRightNavbar(parent, name, divElement){
	let ulElement = document.createElement("ul");
	ulElement.setAttribute("class", "nav navbar-nav navbar-right");
	appendUserName(ulElement, name);
	appendLogout(ulElement, parent, divElement);

	divElement.appendChild(ulElement);
}

function appendUserName(ulParent, name){
	let liElement = document.createElement("li");
	let aElement = document.createElement("a");
	aElement.innerHTML = "Signed up as " + name + "    |"; 
	liElement.appendChild(aElement);

	ulParent.appendChild(liElement);
}

function appendLogout(ulParent, parent, child){
	let liElement = document.createElement("li");
	let aElement = document.createElement("a");
	
	let spanElement = document.createElement("span");
	spanElement.setAttribute("class", "glyphicon glyphicon-log-out");
	spanElement.addEventListener("click",  (logout(parent, child)));

	aElement.appendChild(spanElement);
	liElement.appendChild(aElement);
	ulParent.appendChild(liElement);
}

function renderStartQuizButton(questionData){
	let main = document.getElementById("main");
	let divElem = document.createElement("div");
	divElem.setAttribute("class", "text-center");

	let button = document.createElement("button");
	button.setAttribute("type", "button");
	button.setAttribute("class", "btn btn-default");
	button.innerHTML = "Start Quiz";
	button.addEventListener("click", (evt) => {
		let listQuestions = storage.getQuestionsList();
		questionData.question = listQuestions[0];
		router.renderPage("question", questionData);
	});

	divElem.appendChild(button);
	main.appendChild(divElem); 
}


function renderNavbarItems(parent){
	let ulElement = document.createElement("ul");
	ulElement.setAttribute("class", "nav navbar-nav");

	for(let i = 0; i < itemNavbar.length; i++){
		let liElement = document.createElement("li");

		let aElement = document.createElement("a");
		aElement.innerHTML = itemNavbar[i];
		aElement.addEventListener("click",  renderPage(itemNavbar[i]));

		liElement.appendChild(aElement);
		ulElement.appendChild(liElement);
		parent.appendChild(ulElement);
	}
}

let renderPage = (itemName) => {
	return function(){
		let data;
		switch(itemName){
			case "List users":
				data = storage.getUserResultList();
				break;
			case "Home":
				data = storage.getAdmin();
				break;
			default:
				data = null;
		}
			router.renderPage(itemName, data);
	};
};

let logout = (parent, child) => {
	return function(){
		parent.removeChild(child);
		storage.currentUser = null;
		router.renderPage("signup");
	};
};
