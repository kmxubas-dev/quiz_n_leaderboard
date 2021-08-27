// ==================================================
// R4NKT RESOURCE - LEADERBOARDS
// ==================================================

class R4nkt_Leaderboards {
    constructor (gameID, leaderboardID) {
        this.gameID = gameID;
        this.leaderboardID = leaderboardID;
        this.api = 'https://r4nkt.com/api';
    }

    retrieve = (callback) => {
        // Callback parameter (response)
        let endpoint = this.api+'/v1/games/'+this.gameID+'/leaderboards/'+this.leaderboardID;
        this.fetch(endpoint, 'GET', null, callback);
    }

    retrieveRank_all = (callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/leaderboards/'+this.leaderboardID+'/rankings';
        this.fetch(endpoint, 'GET', null, callback);
    }

    retrieveRank_player = (playerID, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/leaderboards/'+this.leaderboardID+'/players/'+playerID+'/rankings';
        this.fetch(endpoint, 'GET', null, callback);
    }



    fetch = (endpoint, method, data, callback) => {
        // Callback parameter (response)
        let settings = {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer GgxxYLV2fsaQATKyuty7iDEI0oYR1jTz4illEseL'
            },
        }
        if (method !== 'GET') settings.body = JSON.stringify(data);

        fetch(endpoint, settings)
        .then(response => response.json())
        .then(callback);


    }
}