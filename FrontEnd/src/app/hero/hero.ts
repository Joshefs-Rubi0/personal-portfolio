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
    // Fix para altura viewport en móviles
    this.setVHVariable();
    window.addEventListener('resize', this.setVHVariable);
    window.addEventListener('orientationchange', this.setVHVariable);

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
    window.removeEventListener('resize', this.setVHVariable);
    window.removeEventListener('orientationchange', this.setVHVariable);
  }

  // Fix para altura viewport en móviles
  private setVHVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  private scrollToProjects() {
    const container = document.querySelector("#section-index") as HTMLElement;
    const target = document.querySelector("#next-section") as HTMLElement;
    
    if (!container || !target) {
      console.error('Container or target not found');
      return;
    }

    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const currentScroll = container.scrollTop;
    const targetPosition = currentScroll + targetRect.top - containerRect.top;

    console.log('Hero: Scrolling from', currentScroll, 'to', targetPosition);

    this.isScrollingProgrammatically = true;

    this.scrollAnimation = gsap.to(container, {
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      duration: 1,
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