import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [{
    title: "Escucha tu musica",
    subTitle: "EN CUALQUIER LUGAR",
    description: "Los mejores álbunes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.",
    icon: "play"
  }, {
    title: "Disfruta de nuestro reproductor",
    subTitle: "EN CUALQUIER LUGAR",
    description: "Los mejores álbunes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.",
    icon: "musical-notes-outline"
  }, {
    title: "Consulta multiples artistas",
    subTitle: "EN CUALQUIER LUGAR",
    description: "Los mejores álbunes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.",
    icon: "people-circle-outline"
  }];

  constructor(private router: Router, private storage: Storage) {

  }

  finish() {
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
  }

}
