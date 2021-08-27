// ==================================================
// LEADERBOARD SCREEN
// ==================================================

class Leaderboard {
    constructor (container, main) {
        this.main = main;
        this.container = $(container);
        this.list_container = $(container+' #list');
        this.homeButton = $(container+' #homeButton');
        this.preloader = $(container+' #preloader');
        let header = new Header(container+' #header');
        header.drawGaugeProgress();

        // EVENT LISTENERS
        this.homeButton.on('click', this.homeButton_onClick);
    };



    initialize = () => {
        this.container.removeClass('hidden');
        this.preloader.removeClass('hidden');
        this.main.r4nkt.leaderboard.retrieveRank_all(this.retrieveRank_all__callback);
    }

    retrieveRank_all__callback = (response) => {
        let data = response.data.slice(0, 10);
        this.list_container.html('');
        data.forEach((rank, i) => {
            let color = '';
            color = (i === 0) ? '#FFD700' : '';
            color = (i === 1) ? '#C0C0C0' : color;
            color = (i === 2) ? '#ca9c6a' : color;
            this.list_container.append(`
                <li id="rank${i}" class="flex flex-row mb-2 hidden">
                    <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-gradient-to-r to-transparent overflow-ellipsis">
                        <div class="flex flex-col rounded-md w-10 h-10 justify-center items-center mr-4" style="background-color:${color};">${i+1}</div>
                        <div class="flex-1 pl-1 truncate">
                            <div class="font-medium truncate">${rank.custom_player_id}</div>
                            <!-- <div class="text-gray-600 text-sm">200ml</div> -->
                        </div>
                        <div class="text-gray-600">${rank.score}</div>
                    </div>
                </li>
            `);
            this.preloader.addClass('hidden');
            $('#rank'+i).slideDown();
        });
    }



    // EVENT LISTENERS METHODS
    homeButton_onClick = () => {
        this.container.addClass('hidden');
        this.main.home.initialize();
    };
}