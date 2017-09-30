const router = require('express').Router();
const questionController = require('./controller');


let questionNo = 0;
router.get('/', (req, res) => {
    if (questionNo >= 6 && questionController.getPlayerScore() < 30) {
        questionNo = 0;
        questionController.resetPlayerScore();
        res.send('You lose!');
        res.redirect('/rule');
    }
    else questionNo++;
    // questionController.getNextQuestion();
    questionController.getQuestionById(questionNo, (err, question) => {
        console.log('question', question);
        //question.type = 1 : 1 - 10
        //question.type = 2 : 4 or 10
        //question.type  = 3 : input answer
        //question.type = 4 : 1 - 15
        if (question.questionType == 1) {
            res.render('game', {
                questionNo: questionController.getCurrentQuestionNo(),
                question: question,
                score: questionController.getPlayerScore(),
                type1: "style=\"display: inline-block\""
            });
        } else if (question.questionType == 2) {
            res.render('game', {
                questionNo: questionController.getCurrentQuestionNo(),
                question: question,
                score: questionController.getPlayerScore(),
                type2: "style=\"display: inline-block\""
            });
        }
        else if (question.questionType == 3) {
            res.render('game', {
                questionNo: questionController.getCurrentQuestionNo(),
                question: question,
                score: questionController.getPlayerScore(),
                type3: "style=\"display: inline-block\""
            });
        } else {
            res.render('game', {
                questionNo: questionController.getCurrentQuestionNo(),
                question: question,
                score: questionController.getPlayerScore(),
                type4: "style=\"display: inline-block\""
            });
        }
    })
});

router.post('/', (req, res) => {
    let answer = req.body.submit;
    console.log('answer viewRouter', answer);
    if (!questionController.processAnswer(answer))
        res.redirect('/game');
    else {
        questionController.resetPlayerScore();
        res.send('You won');
    }
});

module.exports = router;