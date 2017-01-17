"use strict";

import router from "../router.js";
import storage from "../storage.js";

export default {
	controller: controller()
};

function controller(){
	return function(){
		let questionData = storage.getQuestionData();
		let listQuestions = storage.getQuestionsList();

		let listSize = listQuestions.length;
		let question = listQuestions[questionData.questionNumber - 1];
		let questionNumber = questionData.questionNumber;

		let btnNext = document.getElementById("idBtnNext");
		if(questionNumber === listSize - 1){
			btnNext.innerHTML = "Show result";
		} else {
			btnNext.innerHTML = "Next";
		}

		btnNext.addEventListener("click", (evt) => {
			if(question.answers.length === 0){
				putResultFromTextArea(questionData, question.correctAnswer);
			}
			putResult(questionData, question.correctAnswer);
			let questionNumber = questionData.questionNumber;
			if(questionNumber !== listSize){
				questionNumber++;
				questionData.question = listQuestions[questionNumber - 1];
				questionData.questionNumber = questionNumber;
				router.renderPage("question", questionData);
			} else {
				router.renderPage("result");
			}
		});
	};	
}

let putResultFromTextArea = (data, correctAnswers) => {
	let result = document.getElementById("idAnswer").value.toLowerCase().trim();
	if(result === correctAnswers){
		data.numberOfCorrectAnswers++;
	}
};

let putResult = (data, correctAnswers) => {
	let checkedIndex = 0; 
	let items = (correctAnswers.length === 1) ? document.getElementsByName("answerRadio")
				: document.getElementsByClassName("answerCheckbox");

	for(let i = 0; i < items.length; i++){
      if(items[i].checked){
           if(i !== correctAnswers[checkedIndex]){
           		return;
           }
      	checkedIndex++;
      }
	}

	if(checkedIndex === correctAnswers.length){
		data.numberOfCorrectAnswers++;
	}
};
