import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';
import * as dataReleases from './releases.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() { }

  getArtists() {
    return dataArtists.items;
  }

  getNewReleases() {
    return fetch("https://platzi-music-api.herokuapp.com/browse/new-releases")
      .then(res => res.json())
      .catch(() => dataReleases);
  }
  
  getArtistsTopTracks(artistId){
    return fetch(`https://platzi-music-api.herokuapp.com/artists/${artistId}/top-tracks?country=CO`)
      .then(response=> response.json());
  }
}
