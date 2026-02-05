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

  // Solución definitiva para limpiar hover en móviles
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {
      document.body.classList.add('using-touch');
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const target = e.target as HTMLElement;
      
      // Crear un elemento invisible temporal para robar el foco
      const dummyElement = document.createElement('input');
      dummyElement.style.position = 'fixed';
      dummyElement.style.opacity = '0';
      dummyElement.style.pointerEvents = 'none';
      document.body.appendChild(dummyElement);
      
      // Dar foco al elemento dummy
      dummyElement.focus();
      
      // Quitar foco del elemento tocado
      if (target) {
        target.blur();
      }
      
      // Eliminar el elemento dummy después de un momento
      setTimeout(() => {
        dummyElement.remove();
      }, 100);
    }, { passive: true });
  }
}
  toggleMenu() {
    this.mobileMenuOpen.update(val => !val);
  }

  scrollTo(position: number) {
    const container = document.querySelector('#section-index');
    if (container) {
      container.scrollTo({ top: position, behavior: 'smooth' });
    }
  }

  openDemo() {
    window.location.href = 'https://calendar.notion.so/meet/santiagomasetlarraz/melon-mind';
  }
}