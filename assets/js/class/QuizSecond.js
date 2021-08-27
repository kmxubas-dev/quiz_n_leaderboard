// ==================================================
// SECOND ATTEMPT QUIZ SCREEN
// ==================================================

class QuizSecond {
    constructor (container, main, items) {
        this.main = main;
        this.container_id = container;
        this.container = $(container);

        this.body_quiz = $(container+' #body_quiz');
        this.body_complete = $(container+' #body_complete');
        this.body_complete_items = $(container+' #body_complete_items')

        this.question_container = $(container+' #question');
        this.choices_container = $(container+' #choices');
        this.correct_container = $(container+' #correct');
        this.score_container = $(container+' #score');
        this.time_container = $(container+' #time');

        this.nextButton = $(container+' #nextButton');
        this.leaderboardButton = $(container+' #leaderboardButton');
        this.header = new Header(container+' #header');

        this.items = items;

        // EVENT LISTENERS
        this.nextButton.on('click', this.itemNext);
    }



    initialize = () => {
        this.answers = [];
        this.index = 0, this.correct = 0, this.score = 0;
        this.timer = {
            loop: null,
            minutes: null,
            seconds: null,
        }

        this.shuffleItems(this.items);
        this.itemLoad(this.index);
        this.startTimer(60*3);
        this.container.removeClass('hidden');
        this.body_quiz.removeClass('hidden');
        this.body_complete.addClass('hidden');
        this.body_complete_items.html('');
    }

    itemLoad = (index) => {
        this.question_container.html(`${index+1}. ${this.items[index].question}`);
        this.choices_container.html('');
    
        this.items[index].choices.forEach((choice) => {
            this.choices_container.append(`
                <label class="flex items-center mr-5 mb-3">
                    <input type="radio" class="form-radio h-6 w-6 text-gray-600" name="choice" value="${choice}">
                    <span class="ml-2 text-xl text-gray-800">${choice}</span>
                </label>
            `);
        })
        
        this.header.setHeaderText(`
            <p class="-mt-10">Question</p>
            <p class="text-3xl">${this.answers.length}/${this.items.length}</p>
        `);
    }
    
    itemNext = () => {
        let choice_checked = $(this.container_id+' input[name="choice"]:checked');

        // Check if correct answer
        if (choice_checked.val() == this.items[this.index].answer) {
            this.correct++;
        }
        // Require choice input.
        if (choice_checked.val() == undefined) {
            return 0;
        }

        // Check if last item.
        if (this.index != this.items.length-1) {
        } else {
            this.index++;
            this.answers.push(choice_checked.val());
            this.header.drawGaugeProgress(this.items.length, this.answers.length-1);
            this.header.setHeaderText(`
                <p class="-mt-10">Question</p>
                <p class="text-3xl">${this.answers.length}/${this.items.length}</p>
            `);

            setTimeout(this.completeQuiz, 1000);
            return 0;
        }
        
        this.index++;
        this.answers.push(choice_checked.val());
        this.itemLoad(this.index);
        this.header.drawGaugeProgress(this.items.length, this.answers.length-1);
    }

    shuffleItems = (array) => {
        var currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    startTimer = (duration) => {
        this.timerLoop = 0;
        let start = Date.now(), diff;
        let timer = () => {
            // Time difference between duration and the time that timer started
            diff = duration - (((Date.now() - start) / 1000) | 0);
    
            // Does the same job as parseInt truncates the float
            this.timer.minutes = (diff / 60) | 0;
            this.timer.seconds = (diff % 60) | 0;
    
            this.timer.minutes = this.timer.minutes < 10 ? "0" + this.timer.minutes : this.timer.minutes;
            this.timer.seconds = this.timer.seconds < 10 ? "0" + this.timer.seconds : this.timer.seconds;
    
            this.time_container.html(this.timer.minutes + ':' + this.timer.seconds);
    
            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                // start = Date.now() + 1000;
                this.completeQuiz();
            }
        };
        
        timer();
        this.timer.loop = setInterval(timer, 1000);
    }

    completeQuiz = (timeout = false) => {
        this.body_quiz.addClass('hidden');
        this.body_complete.removeClass('hidden');
        this.header.setHeaderText(`
            <p class="-mt-10">Complete</p>
        `);
        clearInterval(this.timer.loop);

        // Load each items.
        this.items.forEach((item, i) => {
            let correct = (this.answers[i] == item.answer) ? 'text-green-800' : 'text-red-800';
            let correct_answer = (this.answers[i] != item.answer) ? '<span class="font-semibold">'+item.answer+'</span> - is the correct answer' : '';
            let choices = '';

            // Compile each choices to their corresponding items.
            item.choices.forEach((choice) => {
                let class_correct = '', class_wrong = '';
                let label_correct = '', label_wrong = '';
                let checked = '';

                if (this.answers[i] === choice) {
                    checked = 'checked';

                    if (this.answers[i] === item.answer && this.answers[i] === choice) {
                        class_correct = 'font-medium text-green-800';
                        label_correct = 'Correct';
                    } else {
                        class_wrong = 'font-medium text-red-800';
                        label_wrong = 'Wrong';
                    }
                }

                choices += `
                    <label class="flex items-center mr-3 mb-2">
                        <input type="radio" class="form-radio h-6 w-6 text-gray-600" name="choice${i}" value="${choice}" ${checked} onclick="return false;">
                        <span class="w-full ml-2 text-xl ${class_correct} ${class_wrong}">${choice}<span class="text-xl float-right">${label_correct}${label_wrong}</span></span>
                    </label>
                `;
            });
            
            this.body_complete_items.append(`
                <div class="flex-col mb-6">
                    <p id="question" class="font-medium mb-3 ${correct}">${i+1}. ${item.question}</p>
                    <div id="choices" class="flex-col mb-2">
                        ${choices}
                    </div>
                    <p class="text-lg">${correct_answer}</p>
                </div>
                <hr class="my-5">
            `)
        });

        this.score = (this.correct*100) + ( ((this.timer.minutes*60) + this.timer.seconds) * 10 );
        this.correct_container.html(`You\'ve got ${this.correct} out of ${this.items.length} correct`);
        this.score_container.html(`Your score <br>${this.score}`);
        this.body_complete_items.append(`
            <button id="leaderboardButton" class="w-full border-2 border-blue-800 bg-blue-800 rounded-full font-bold text-white px-3 py-2 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 mr-6">
                Leaderboard
            </button>
        `);

        this.main.user.totalQuestions = this.items.length;
        this.main.user.totalCorrect = this.correct;
        this.main.user.totalScore = this.score;
        this.main.user.remainingTime = '00:'+this.timer.minutes+':'+this.timer.seconds;
        this.main.user.created_at = new Date(Date.now()).toLocaleDateString();

        this.main.scoreData.custom_player_id = this.main.user.name;
        this.main.scoreData.score = this.score;
        this.main.r4nkt.score.create(this.main.scoreData, (response) => {
            this.main.r4nkt.player.update(response.data.custom_player_id, {custom_data: JSON.stringify(this.main.user)}, ()=>{});
            $(this.container_id+' #leaderboardButton').on('click', this.leaderboardButton_onClick);
        });
    }



    leaderboardButton_onClick = () => {
        this.container.addClass('hidden');
        this.main.leaderboard.initialize();
    }
}