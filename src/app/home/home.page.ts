import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  artists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
    preview_url: "",
    playing: false,
    name: ""
  };
  currentSong: HTMLAudioElement;
  newTime: any;
  
  constructor(
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.artists = this.musicService.getArtists();
      this.songs = newReleases.albums.items.filter(e => e.album_type == "single");
      this.albums = newReleases.albums.items.filter(e => e.album_type == "album");
    })
  }

  async showSongs(item, album=false) {
    const songs = album ? await this.musicService.getAlbumTracks(item.id)
      : await this.musicService.getArtistsTopTracks(item.id);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: album ? songs.items : songs.tracks,
        title: item.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      if (this.currentSong && this.song.name) this.pause();
      this.song = dataReturned.data || {};
      if (dataReturned && dataReturned.data && dataReturned.data != undefined ) this.play();
    })

    return await modal.present();
  }

  async playSongs(item) {
    const songs = await this.musicService.getAlbumTracks(item.id);
    if (this.currentSong && this.song.name) this.pause();
    this.song = songs.items[0] || {};
    if (songs.items && songs.items[0]) this.play();
  }

  parseTime(time: number = 0.00) {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1) minutes = "0" + minutes;
      let seconds = (partTime % 60).toString()
      if (seconds.length == 1) seconds = "0" + seconds;

      return minutes + ":" + seconds;
    }
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }
}