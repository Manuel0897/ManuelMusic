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
  song: any = {};
  
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

  async showSongs(artist) {
    const songs = await this.musicService.getArtistsTopTracks(artist.id);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    })

    return await modal.present();
  }
}
