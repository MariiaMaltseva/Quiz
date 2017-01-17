"use strict";

import storage from "../storage.js";

export default {
	controller: controller()
};

function controller(){
	return function(){
		let questionData = storage.getQuestionData();
		storage.saveUserResult();

		let nameElem = document.getElementById("name");
		nameElem.innerHTML = questionData.userName;

		let resultElem = document.getElementById("result");
		resultElem.innerHTML = "" + questionData.numberOfCorrectAnswers  + "/" + questionData.numberOfQuestion;
	};
}