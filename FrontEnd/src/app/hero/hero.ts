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
  private isAnimating = false;

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
    const container = document.querySelector("#section-index") as HTMLElement;

    if (scrollTrigger) {
      scrollTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.scrollToProjects();
      });
    }

    // Detectar scroll manual continuo
    if (container) {
      container.addEventListener('scroll', () => {
        if (this.isAnimating && this.scrollAnimation) {
          this.scrollAnimation.kill();
          this.scrollAnimation = null;
          this.isAnimating = false;
        }
      }, { passive: true });

      const cancelAnimation = () => {
        if (this.scrollAnimation && this.isAnimating) {
          this.scrollAnimation.kill();
          this.scrollAnimation = null;
          this.isAnimating = false;
        }
      };

      container.addEventListener('wheel', cancelAnimation, { passive: true });
      container.addEventListener('touchstart', cancelAnimation, { passive: true });
      container.addEventListener('touchmove', cancelAnimation, { passive: true });
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

    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetPosition = container.scrollTop + targetRect.top - containerRect.top;

    this.isAnimating = true;

    this.scrollAnimation = gsap.to(container, {
      scrollTo: targetPosition,
      duration: 0.8,
      ease: "power4.out",
      onComplete: () => {
        this.scrollAnimation = null;
        this.isAnimating = false;
      }
    });
  }
}