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
    const animatedWord = document.querySelector("#animated-word") as HTMLElement;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      animatedWord.innerText = words[currentIndex];
    }, 2000);


    /* ----------------------------------
       SCROLL SUAVE ESTILO WEBFLOW
       ----------------------------------*/
    const link = document.querySelector(".scroll-trigger") as HTMLAnchorElement;

    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetSelector = link.getAttribute("href")!;
        const target = document.querySelector(targetSelector) as HTMLElement;
        if (!target) return;

        const navbarOffset = 90;
        const targetY =
          target.getBoundingClientRect().top + window.scrollY - navbarOffset;

        smoothScrollTo(targetY, 1200); // 1.2s
      });
    }

    function smoothScrollTo(target: number, duration: number) {
      const start = window.scrollY;
      const distance = target - start;
      let startTime: number | null = null;

      function easing(t: number) {
        // curva Webflow
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animation(currentTime: number) {
        if (!startTime) startTime = currentTime;

        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);

        window.scrollTo(0, start + distance * easing(t));

        if (elapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    }

  }
}
