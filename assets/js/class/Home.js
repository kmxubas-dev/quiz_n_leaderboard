// ==================================================
// HOME SCREEN
// ==================================================

class Home {
    constructor (container, main) {
        this.main = main;
        this.container = $(container);
        this.body_welcome = $(container+' #body_welcome');
        this.body_start = $(container+' #body_login');

        this.startButton = $(container+' #startButton');
        this.leaderboardButton = $(container+' #leaderboardButton');
        this.startQuizButton = $(container+' #loginButton');
        this.backButton = $(container+' #backButton');
    
        this.inputName = $(container+' #inputName');
        this.inputEmail = $(container+' #inputEmail');

        let header = new Header(container+' #header');
        header.drawGaugeProgress();

        // EVENT LISTENERS
        this.startButton.on('click', this.startButton_onClick);
        this.leaderboardButton.on('click', this.leaderboardButton_onClick);
        this.startQuizButton.on('click', this.startQuizButton_onClick);
        this.backButton.on('click', this.backButton_onClick);
    }



    initialize = () => {
        this.container.removeClass('hidden');
        this.body_welcome.removeClass('hidden');
        this.body_start.addClass('hidden');

        this.inputName.val('');
        this.inputEmail.val('');
    }



    // EVENT LISTENERS METHODS
    startButton_onClick = () => {
        this.body_welcome.addClass('hidden');
        this.body_start.removeClass('hidden');
    }
    leaderboardButton_onClick = () => {
        this.container.addClass('hidden');
        this.main.leaderboard.initialize();
    }
    startQuizButton_onClick = () => {
        if (this.inputName.val() == '' || this.inputEmail.val() == '') {
            return 0;
        }
        this.startQuizButton.prop('disabled', true);
        this.startQuizButton.css('opacity', 0.5);

        main.r4nkt.player.retrieve(this.inputName.val(), (response)=>{
            this.startQuizButton.prop('disabled', false);
            this.startQuizButton.css('opacity', 1);

            if (response.data !== undefined) {
                alert('You have already completed your two attempts at this quiz');
                return 0;
            }
            
            this.main.user.name = this.inputName.val();
            this.main.user.email = this.inputEmail.val();
            this.container.addClass('hidden');
            this.main.quizFirst.initialize();
        });
    }
    backButton_onClick = () => {
        this.body_start.addClass('hidden');
        this.body_welcome.removeClass('hidden');
    }
}