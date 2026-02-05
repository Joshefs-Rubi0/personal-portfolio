import { Component, AfterViewInit } from '@angular/core';
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
export class Hero implements AfterViewInit {
  private scrollAnimation: gsap.core.Tween | null = null;

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

    // Scroll suave con GSAP (IGUAL QUE PROJECTS-SECTION)
    const scrollTrigger = document.querySelector(".scroll-trigger") as HTMLElement;
    const container = document.querySelector("#section-index") as HTMLElement;

    if (scrollTrigger) {
      scrollTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToProjects();
      });
    }

    // Detectar scroll manual del usuario para cancelar la animación
    if (container) {
      const cancelAnimation = () => {
        if (this.scrollAnimation) {
          this.scrollAnimation.kill();
          this.scrollAnimation = null;
        }
      };

      // Cancelar en scroll manual (wheel o touch)
      container.addEventListener('wheel', cancelAnimation, { passive: true });
      container.addEventListener('touchstart', cancelAnimation, { passive: true });
    }
  }

  private scrollToProjects() {
    const container = document.querySelector("#section-index") as HTMLElement;
    const target = document.querySelector("#next-section") as HTMLElement;
    
    if (!container || !target) return;

    // Matar animación anterior si existe
    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    // Calcular posición exacta
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetPosition = container.scrollTop + targetRect.top - containerRect.top;

    // USAR GSAP CON EL MISMO EASING Y DURACIÓN QUE PROJECTS-SECTION
    this.scrollAnimation = gsap.to(container, {
      scrollTo: targetPosition,
      duration: 0.8,
      ease: "power4.out",
      onComplete: () => {
        this.scrollAnimation = null;
      }
    });
  }
}