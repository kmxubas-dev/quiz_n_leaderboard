// Set of Questions
const ITEMS = [
    {
        question: "Which is heavier?",
        choices: ["Earth", "Sun"],
        answer: "Sun"
    },
    {
        question: "Which of these is a virus?",
        choices: ["Chicken pox", "Leukemia", "Scoliosis", "Staphylococcus"],
        answer: "Chicken pox"
    },
    {
        question: "Among these elements, which one has the highest atomic mass?",
        choices: ["Copper", "Helium", "Sodium", "Uranium"],
        answer: "Uranium"
    },
    {
        question: "Which of these has the longest wave length?",
        choices: ["Radio waves", "Visible light", "X-rays"],
        answer: "Radio waves"
    },
    {
        question: "What is the function of mitochondria in the cell?",
        choices: ["To generate energy", "To kill viruses or other antigens", "To process waste", "To repair damage"],
        answer: "To generate energy"
    },
    {
        question: "How old is the Earth approximately?",
        choices: ["50, 000 years", "300 million years", "4.5 billion years", "No one knows"],
        answer: "4.5 billion years"
    },
    {
        question: "What is Andromeda?",
        choices: ["An array of radio telescopes", "A bacteria that can cause death", "An element of the Periodic Table", "The nearest major galaxy to the Milky Way"],
        answer: "The nearest major galaxy to the Milky Way"
    },
    {
        question: "Which is less dense?",
        choices: ["Cold air", "Hot air", "Imong ex"],
        answer: "Hot air",
    },
    {
        question: "Which one of these is not a mineral?",
        choices: ["Calcite", "Diamond", "Lithium", "Quartz"],
        answer: "Lithium",
    },
    {
        question: "What is the pH of pure water?",
        choices: ["0", "1", "7", "8"],
        answer: "7",
    },
    // {
    //     question: "",
    //     choices: [""],
    //     answer: "",
    // }
];



// Main Object
var main = {};

// Instanciations of r4nkt Modules.
main.r4nkt = {
    leaderboard: new R4nkt_Leaderboards('J0RYKM8VX6', 'quiz_n_leaderboard___test'),
    player: new R4nkt_Players('J0RYKM8VX6'),
    score: new R4nkt_Scores('J0RYKM8VX6'),
};

// Player Information - to be used in r4nkt player.
main.user = {
    name: null,
    email: null,
    totalQuestions: null,
    totalCorrect: null,
    totalScore: null,
    remainingTime: null,
    created_at: null,
};

// Score Information - to be used in r4nkt score.
main.scoreData = {
    custom_leaderboard_id: 'quiz_n_leaderboard___test',
    custom_player_id: null,
    score: 0,
}

// Cloning of the question set
main.items = [...ITEMS];

// Instanciations of Screen Modules
main.home = new Home('#home_container', main);
main.leaderboard = new Leaderboard('#leaderboard_container', main);
main.quizFirst = new QuizFirst('#quizFirst_container', main, [...main.items]);
main.quizSecond = new QuizSecond('#quizSecond_container', main, [...main.items]);


// main.r4nkt.player.list((response) => {
//     let data = response.data;
//     data.forEach((player) => {
//         main.r4nkt.player.delete(player.custom_id, (response)=>{
//             console.log(response);
//         });
//         // console.log(player.custom_id);
//     });
// });


