// ==================================================
// R4NKT RESOURCE - PLAYERS
// ==================================================

class R4nkt_Players {
    constructor (gameID) {
        this.gameID = gameID;
        this.api = 'https://r4nkt.com/api';
    }

    create = (data, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/players';
        this.fetch(endpoint, 'POST', data, callback);
    }

    retrieve = (player_id, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/players/'+player_id;
        this.fetch(endpoint, 'GET', null, callback);
    }
    
    update = (player_id, data, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/players/'+player_id;
        this.fetch(endpoint, 'PUT', data, callback);
    }
    
    delete = (player_id, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/players/'+player_id;
        this.fetch(endpoint, 'DELETE', null, callback);
    }
    
    list = (callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/players';
        this.fetch(endpoint, 'GET', null, callback);
    }



    fetch = (endpoint, method, data, callback) => {
        // Callback parameter (response)
        let settings = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer QWAFuT2gw1lOlBOjzoVaHHyEioM4aA4fN2JOLkAA'
            },
        }
        if (method !== 'GET' && method !== 'DELETE') settings.body = JSON.stringify(data);

        fetch(endpoint, settings)
        .then(response => response.json())
        .then(callback);
    }
}
