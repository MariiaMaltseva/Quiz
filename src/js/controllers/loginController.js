"use strict";

import storage from "../storage.js";
import router from "../router.js";

let config = {
	login: loginForAdmin(),
	onLogin: function(user) {}
};

export default config;

function loginForAdmin(){
	return function(){
		let idForm = document.getElementById("loginForm");
			
		idForm.addEventListener("submit",  function(evt) {
			evt.preventDefault();
			return false;  
		 });

		let idSubmitButton = document.getElementById("idSubmit");
		idSubmitButton.addEventListener("click", submitForm(idForm));

		let idBack = document.getElementById("idBackToSignup");
		idBack.addEventListener("click", (evt) => {
			router.renderPage("signup");
		});
	};
}


function submitForm(parent){
	return function(){
		let login = document.getElementsByName("login")[0].value;
		let password = document.getElementsByName("password")[0].value;
		
		let user = storage.confirmCredentials(login, password);
		if(user !== null){
			config.onLogin(user);
		} else {
			let divElem = document.createElement("div");
			divElem.setAttribute("align", "center");
			divElem.setAttribute("class", "alert alert-warning");
			let message = "Error! Your credentials are incorrect";		

			divElem.innerHTML = message;
		
			parent.insertBefore(divElem, parent.children[0]);
			setTimeout(() => {
        		parent.removeChild(divElem);
    		}, 2000);
		}
	};
}
