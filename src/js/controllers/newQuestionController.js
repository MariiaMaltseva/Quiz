"use strict";

import storage from "../storage.js";
import router from "../router.js";

export default {
	controller: controller()
};

let newQuestion = {
    question: "",
    correctAnswer: [],
    answers: []
  };

function controller(){
	return function(){	
		let main = document.getElementById("mainVersionAnswr");	
		let newOption = document.getElementById("addNewOption");
		newOption.addEventListener("click", addNewOption(main));

		let newQuestion = document.getElementById("idBtnNewQuestion");
		newQuestion.addEventListener("click", addNewQuestion(main));
	};
}

let addNewOption = (parent) => {
	return function(){
		let divElem = document.createElement("div");
		divElem.setAttribute("class", "form-group text-left");

		let labelElem = document.createElement("label");
		labelElem.innerHTML = "Version of an answer:";

		let brElem = document.createElement("br");
		let textAreaElem = document.createElement("textarea");
		textAreaElem.setAttribute("rows", "1");	
		textAreaElem.setAttribute("id", "question");

		divElem.appendChild(labelElem);
		divElem.appendChild(brElem);
		divElem.appendChild(textAreaElem);
		parent.appendChild(divElem);
	};
};

let addNewQuestion = (main) => {
	return function(){
		newQuestion.question = document.getElementById("question").value;
		newQuestion.correctAnswer = document.getElementById("corAnswr").value;

		if(newQuestion.question.length < 5){
			let divElem = document.getElementById("validQuestion");
			divElem.innerHTML = "question has to have at least 5 symbols";
		}
		if(newQuestion.correctAnswer.length === 0){
			let divElem = document.getElementById("validCorrAnswr");
			divElem.innerHTML = "Correct answer can not be empty";
		} else{
			newQuestion.correctAnswer = newQuestion.correctAnswer.trim().split(" ");
			let childrenAnswr = main.getElementsByTagName("input");
			for(let i = 0; i < childrenAnswr.length; i++){
				newQuestion.answers.push(childrenAnswr[i].value);
			}
			// storage.addQuestion(newQuestion);
			router.renderPage("Home", storage.getAdmin());
		}
	};
};