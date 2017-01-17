"use strict";

let questionsList;
let userResultList = [];

let admin =  {
    login: "a",
    password: "a",
    name: "Admin Admin",
    email: "admin@ad.com",
    isAdmin: true
  };

let questionData = {
  question: null,
  questionNumber: 1,
  numberOfCorrectAnswers: 0,
  numberOfQuestion: 0,
  userName: null
};

  let localQuestionsList = [{
    question: "Which is the nearest star to planet earth?",
    correctAnswer: [1],
    answers: ["Proxima Centauri", "Sun", "Sirius A", "Moon"]
  },
  {
    question: "How many days does the Moon take to orbit the Earth?",
    correctAnswer: [0],
    answers: ["27 days", "8 days", "28 days", "32 days"]
  },
  {
    question: "Can you name the three planets are closest to the sun?",
    correctAnswer: [0, 1, 3],
    answers: ["Earth", "Venus", "Jupiter", "Mercury", "Mars", "Saturn"]
  },
  {
    question: "What is the largest planet in the solar system?",
    correctAnswer: [2],
    answers: ["Earth", "Venus", "Jupiter", "Mercury", "Mars"]
  }];

let syncWithStorage = (nameItem, listItems) => {
  let list = JSON.stringify(listItems);

  localStorage.setItem(nameItem, list);
};

let initUserResult = () => {
  let storageUserResult = localStorage.getItem("userResultList");

    if (storageUserResult) {
      userResultList = JSON.parse(storageUserResult);
    } 
};

export default {
  getQuestionData: () => {
    return questionData;
  },

  getQuestionsList: () => {
      return questionsList;
  },
  getAdmin: () => {
    return admin;
  },
  addQuestion: (item) => {
      questionsList.push(item);
      syncWithStorage("questionsList", questionsList);
  },
  saveUserResult: () => {
    initUserResult();
    userResultList.push({
      userName: questionData.userName,
      result: "" + questionData.numberOfCorrectAnswers + "/" + questionData.numberOfQuestion
    });
    syncWithStorage("userResultList", userResultList);
  },
  getUserResultList: () => {
    let storageUserResultList = localStorage.getItem("userResultList");

    if (storageUserResultList) {
      userResultList = JSON.parse(storageUserResultList);
    }
    return userResultList;
  },
  init: () => {
    let storageQuestionsList = localStorage.getItem("questionsList");

    if (storageQuestionsList) {
      questionsList = JSON.parse(storageQuestionsList);
    } else {
      questionsList = localQuestionsList;
    }
  },

  confirmCredentials: function(login, password) {

      if(admin.login === login){
        if (admin.password === password) {
          this.currentUser = admin;
          return admin;
      }
    }
      return null;
  },
  currentUser: null
};