import { Component, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit {

  ngAfterViewInit() {
    // Inicializar AOS
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
    });

    // Animación de palabras
    const words = ["Full Stack", "Front End", "Back End", "Cloud"];
    let currentIndex = 0;
    const animatedWord = document.getElementById("animated-word") as HTMLElement;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      animatedWord.innerText = words[currentIndex];
    }, 2000);
  }
}
