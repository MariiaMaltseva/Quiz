"use strict";

import router from "../router";

export default  {
	controller: controller()
};

let user = {
		name: ""
	};

function controller(){
	return function(){
		let idForm = document.getElementById("idForm");
		let idOKButton = document.getElementById("idOK");
		let idClickHere = document.getElementById("idClickHere");
		
		idForm.addEventListener("submit",  function(evt) {
			evt.preventDefault();
			return false;  
		 });


		idOKButton.addEventListener("click", (evt) => {
			evt.preventDefault();
			user.name = document.getElementById("idName").value;
			if(user.name.length < 2){
				let divElem = document.getElementById("validName");
				divElem.innerHTML = "Your name has to have at least 2 symbols";
			} else{
				router.renderPage("Home", user);
			}
		});

		idClickHere.addEventListener("click", (evt) => {
			router.renderPage("login");
		});
	};
}