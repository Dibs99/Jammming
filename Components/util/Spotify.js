
const clientID = "96f0766f4c664f9b8dd289f3c57a5af2";
const redirectURI = "http://localhost:3000/"

let accessToken = {}

const Spotify = {
    getAccessToken(){
        if (accessToken){
            return accessToken;
        } 
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
                return window.location = accessURL;
            }
        },
    
    search(term) {
        const currentToken = "BQB5DUHCTEIaioyyR44AGTEkmijiIBlYb5fPaRD8eHPEgQMka2aRRWa0OJUg6cXkVwRCtovIau1opdl3e10nw-WK8jS-cSVYMEE2CONfw-RDbfY65eZHCQYU5X8wiyjwG1Qayyc0JS5hnmyG6z-S3i6CAJp-sg1MpovxNlix6lzrtOs";

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${currentToken}`}
          }).then(response => {
              return response.json()
          }).then(jsonResponse => {
              if (!jsonResponse.tracks) {
                  return [];
              }
                return jsonResponse.tracks.items.map(track => {
                return{
                    id: track.id,
                    name: track.name, 
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri,
                    previewUrl: track.preview_url
                    };
                });
            })},

    savePlaylist(name, trackUri){
        if (!name || !trackUri){
            return;
        }
        const currentToken = Spotify.getAccessToken();
        const header = {
                Authorization: `Bearer ${currentToken}`}
        let usersID;    

        return fetch("https://api.spotify.com/v1/me", {headers: header}
        ).then(response => response.json()
        ).then(jsonResponse => {
                    usersID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${usersID}/playlists`,
                    {
                        headers: header,
                        method: `POST`,
                        body: JSON.stringify({name: name})
                    }).then(response => response.json()
                    ).then(jsonReponse => {
                        const playlistID = jsonReponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${usersID}/playlists/${playlistID}/tracks`,{
                            headers: header,
                            method: `POST`,
                            body: JSON.stringify({ uris: trackUri })
                        }
                        )
                    })
        }) 
        }
    }
                

export default Spotify