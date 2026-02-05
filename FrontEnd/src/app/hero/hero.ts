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
    
    if (!container || !target) {
      console.error('Container or target not found');
      return;
    }

    // Cancelar cualquier animación previa
    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    // Calcular posición exacta
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const currentScroll = container.scrollTop;
    const targetPosition = currentScroll + targetRect.top - containerRect.top;

    console.log('Hero: Scrolling from', currentScroll, 'to', targetPosition);

    // Marcar que es scroll programático
    this.isScrollingProgrammatically = true;

    // Usar scrollTo con configuración optimizada
    this.scrollAnimation = gsap.to(container, {
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      duration: 1.2,
      ease: "power3.inOut",
      onStart: () => {
        console.log('Hero: Animation started');
      },
      onComplete: () => {
        console.log('Hero: Animation completed');
        this.scrollAnimation = null;
        this.isScrollingProgrammatically = false;
      },
      onInterrupt: () => {
        console.log('Hero: Animation interrupted');
        this.scrollAnimation = null;
        this.isScrollingProgrammatically = false;
      }
    });
  }
}