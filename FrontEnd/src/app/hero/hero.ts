import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit, OnDestroy {
  private scrollAnimation: gsap.core.Tween | null = null;
  private isScrollingProgrammatically = false;

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

    if (animatedWord) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % words.length;
        animatedWord.innerText = words[currentIndex];
      }, 2000);
    }

    // Scroll suave con GSAP
    const scrollTrigger = document.querySelector(".scroll-trigger") as HTMLElement;

    if (scrollTrigger) {
      scrollTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.scrollToProjects();
      });
    }
  }

  ngOnDestroy() {
    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }
  }

  private scrollToProjects() {
  const container = document.querySelector("#section-index") as HTMLElement;
  const target = document.querySelector("#next-section") as HTMLElement;
  
  if (!container || !target) return;

  // Matar cualquier animación previa para evitar acumulación
  gsap.killTweensOf(container);

  this.isScrollingProgrammatically = true;

  gsap.to(container, {
    scrollTo: {
      y: target, // GSAP es inteligente, puedes pasarle el elemento directamente
      autoKill: true, // SI EL USUARIO SCROLLEA, LA ANIMACIÓN SE MATA SOLA (Fix del bug)
      offsetY: 0
    },
    duration: 1.2, // Un poco más rápido para que se sienta más responsivo
    ease: "power4.out", // Empieza rápido y frena suave
    onComplete: () => {
      this.isScrollingProgrammatically = false;
    }
  });
}
}