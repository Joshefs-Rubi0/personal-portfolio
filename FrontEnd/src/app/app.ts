import { Component, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects-section/projects-section';
import { ContactFooter } from './contact-footer/contact-footer';
import { AboutMe } from './about-me/about-me';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Hero, ProjectsSection, ContactFooter, AboutMe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  isCompacted = signal(false);
  mobileMenuOpen = signal(false);

  ngAfterViewInit() {
    const activeSection = document.querySelector("#section-index");
    if (activeSection) {
      activeSection.addEventListener('scroll', () => {
        const scrollValue = activeSection.scrollTop;
        this.isCompacted.set(scrollValue > 50);
      });
    }
  }

  toggleMenu() {
    this.mobileMenuOpen.update(val => !val);
  }

  scrollTo(position: number | string) {
    const container = document.querySelector('#section-index');
    if (!container) return;

    let targetPosition = 0;

    // Si es un string, buscar el elemento
    if (typeof position === 'string') {
      const targetElement = document.querySelector(position);
      if (targetElement) {
        // Obtener la posición del elemento relativo al contenedor scrolleable
        const containerRect = container.getBoundingClientRect();
        const elementRect = targetElement.getBoundingClientRect();
        
        // Calcular posición exacta considerando el scroll actual
        targetPosition = container.scrollTop + elementRect.top - containerRect.top;
      }
    } else {
      targetPosition = position;
    }

    container.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }

  // Método específico para ir a proyectos
  scrollToProjects() {
    this.scrollTo('#next-section');
    this.mobileMenuOpen.set(false); // Cerrar menú móvil si está abierto
  }

  openDemo() {
    window.location.href = 'https://calendar.notion.so/meet/santiagomasetlarraz/melon-mind';
  }
}