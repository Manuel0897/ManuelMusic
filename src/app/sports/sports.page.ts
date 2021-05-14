import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MusicService } from '../services/music.service';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage {
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom: number = 14;

  searching = false;
  text = 'Enter keywords to perform a search.';
  songs: any[];
  song: any;
  currentSong: HTMLAudioElement;

  constructor(private musicService: MusicService) {}

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition() {
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  async getTracks(keywords: string) {
    this.searching = true;
    if (keywords.length > 0) {
      this.musicService.searchTracks(keywords).then(async resp => {
        this.songs = await resp.tracks.items.filter((item: any) => item.preview_url);
        if (this.songs.length === 0) {
          this.text = 'There are no results for these keywords.';
        }
        this.searching = false;
      });
    } else {
      this.text = 'Enter keywords to perform a search.';
      this.songs = [];
    }
  }

  play(song: any) {
    if (this.currentSong) {
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('ended', () => this.song.playing = false);
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }
}
