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

  // Sistema de limpieza de hover para móviles
  if ('ontouchstart' in window) {
    let touchTimeout: any;
    
    document.addEventListener('touchend', () => {
      // Desactivar hover temporalmente
      document.body.classList.add('disable-hover');
      
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        document.body.classList.remove('disable-hover');
      }, 500); // 300ms sin hover después de cada touch
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