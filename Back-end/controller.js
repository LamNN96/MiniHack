const fs = require('fs');
const questionModel = require('./questionSchema');
let currentQuestionNo;
// let questionNo = 0;
let playerScore = 0;

const getRandomQuestion = (callback) => {
    //console.log('callback ',callback);
    questionModel.count({}, (err, number) => {
        //console.log("Number of questions: ", number);
        // callback(number);
        random = Math.floor(Math.random() * number);
        questionModel.findOne().skip(random).exec(
            (err, result) => {
                //console.log(callback);
                //callback(result);
                if (err) {
                    console.log('err ', err);
                    //callback(err);
                } else {
                    // console.log('result ', result);
                    currentQuestionNo = result._id;
                    console.log("currentQuestionNo ", currentQuestionNo);
                    callback(result);
                }
            }
        );
    });
};

const getQuestionById = (id, callback) => {
    console.log('id ' , id);
    questionModel.findOne({_id: id}, (err, question) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log('question get by id: ', question)
            callback(null, question);
        }
    });
};
//
// const getNextQuestion = (callback) => {
//     console.log('play score',playerScore);
//     if(questionNo > 5 && playerScore <= 0){
//         //res.send('You lose!!!')
//         questionNo = 1;
//     } else questionNo++;
//     console.log('questionNo', questionNo);
// };
const processAnswer = (answer) =>{
    console.log('answer:', answer);
    playerScore = parseInt(playerScore) + parseInt(answer);
    if (playerScore >= 30){
        return true;
    }else return false;
};

const getPlayerScore = () =>{
    return playerScore;
}

const getCurrentQuestionNo = () => {
    return currentQuestionNo;
}

module.exports = {
    getRandomQuestion,
    processAnswer,
    getPlayerScore,
    getCurrentQuestionNo,
  //  getNextQuestion,
    getQuestionById
};





