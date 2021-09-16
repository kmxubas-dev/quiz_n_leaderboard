// ==================================================
// R4NKT RESOURCE - SCORES
// ==================================================

class R4nkt_Scores {
    constructor (gameID) {
        this.gameID = gameID;
        this.api = 'https://r4nkt.com/api';
    }


    // Create a score
    create = (data, callback) => {
        let endpoint = this.api+'/v1/games/'+this.gameID+'/scores';
        this.fetch(endpoint, 'POST', data, callback);
    }

    // Wrapper method for fetch API
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
        if (method !== 'GET') settings.body = JSON.stringify(data);

        fetch(endpoint, settings)
        .then(response => response.json())
        .then(callback);
    }
}
