// ==================================================
// FIRST ATTEMPT QUIZ SCREEN
// ==================================================

class QuizFirst {
    constructor (container, main, items) {
        this.main = main;
        this.container_id = container;
        this.container = $(container);

        this.body_start = $(container+' #body_start');
        this.body_quiz = $(container+' #body_quiz');
        this.body_complete = $(container+' #body_complete');
        this.body_complete_items = $(container+' #body_complete_items')

        this.question_container = $(container+' #question');
        this.choices_container = $(container+' #choices');
        this.correct_container = $(container+' #correct');

        this.startButton = $(container+' #startButton');
        this.nextButton = $(container+' #nextButton');
        this.header = new Header(container+' #header');

        this.items = items;

        // EVENT LISTENERS
        this.startButton.on('click', this.startButton_onClick);
        this.nextButton.on('click', this.itemNext);
    }



    initialize = () => {
        this.answers = [];
        this.correct = 0;
        this.container.removeClass('hidden');
        this.body_start.removeClass('hidden');
        this.body_quiz.addClass('hidden');
        this.body_complete.addClass('hidden');
        this.body_complete_items.html('');
        this.header.drawGaugeBackground();
    }

    itemLoad = (index) => {
        this.question_container.html(`${index+1}. ${this.items[index].question}`);
        this.choices_container.html('');
    
        ITEMS[index].choices.forEach((choice) => {
            this.choices_container.append(`
                <label class="flex items-center mr-5 mb-3">
                    <input type="radio" class="form-radi h-6 w-6 text-gray-600" name="choice" value="${choice}">
                    <span class="ml-2 text-xl text-gray-800">${choice}</span>
                </label>
            `);
        })

        this.header.setHeaderText(`
            <p class="-mt-10">Question</p>
            <p class="text-3xl">${this.answers.length}/${ITEMS.length}</p>
        `);
    }
    
    itemNext = () => {
        let choice_checked = $(this.container_id+' input[name="choice"]:checked');

        // Check if correct answer
        if (choice_checked.val() == this.items[this.answers.length].answer) {
            this.correct++;
        }
        // Require choice input.
        if (choice_checked.val() == undefined) {
            return 0;
        }

        // Check if last item.
        if (this.answers.length != this.items.length-1) {
        } else {
            this.answers.push(choice_checked.val());
            this.header.drawGaugeProgress(this.items.length, this.answers.length-1);
            this.header.setHeaderText(`
                <p class="-mt-10">Question</p>
                <p class="text-3xl">${this.answers.length}/${ITEMS.length}</p>
            `);

            setTimeout(this.completeQuiz, 1000);
            return 0;
        }

        this.answers.push(choice_checked.val());
        this.itemLoad(this.answers.length);
        this.header.drawGaugeProgress(ITEMS.length, this.answers.length-1);
    }

    completeQuiz = () => {
        this.body_quiz.addClass('hidden');
        this.body_complete.removeClass('hidden');
        this.header.setHeaderText(`
            <p class="-mt-10">Complete</p>
        `);
        
        // Load each items.
        ITEMS.forEach((item, i) => {
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
                <div class="flex-col">
                    <p id="question" class="font-medium mb-3 ${correct}">${i+1}. ${item.question}</p>
                    <div id="choices" class="flex-col mb-2">
                        ${choices}
                    </div>
                    <p class="text-lg">${correct_answer}</p>
                </div>
                <hr class="my-5">
            `)
        });

        this.correct_container.html(`You\'ve got ${this.correct} out of ${ITEMS.length} correct`);
        this.body_complete_items.append(`
            <button id="finishButton" class="w-full border-2 border-blue-800 bg-blue-800 rounded-full font-bold text-white px-3 py-2 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 mr-6">
                Start Timed Quiz
            </button>
        `);
        $('#finishButton').on('click', this.endButton_onClick);
    }



    // EVENT LISTENERS METHODS
    startButton_onClick = () => {
        this.body_start.addClass('hidden');
        this.body_quiz.removeClass('hidden');
        this.itemLoad(this.answers.length);
    }
    endButton_onClick = () => {
        if (this.answers.length > this.items.length-1) {
            this.container.addClass('hidden');
            this.header.setHeaderText('');
            this.main.quizSecond.initialize();
        }
    }
}