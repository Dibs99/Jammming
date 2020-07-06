import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'playlist name',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }
  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(obj => obj.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    }))
 
    
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks})
  }

  removeTrack(track) {
    this.setState(this.state.playlistTracks.filter(para => 
       para.id === track.id
    ));
      }


  render() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
       <SearchBar onSearch={this.search}/>
       <div className="App-playlist">
         <SearchResults  searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
       </div>
      </div>
    </div>
  );
  }
}

export default App;
