import { Component, signal, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects-section/projects-section';
import { ContactFooter } from './contact-footer/contact-footer';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Hero, ProjectsSection, ContactFooter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnInit {
  isCompacted = signal(false);
  mobileMenuOpen = signal(false);
  private scrollAnimation: gsap.core.Tween | null = null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Título SEO principal enfocado en Rol + Stack Internacional
    this.titleService.setTitle('Joshefs Rubio | Full Stack Developer & Software Engineer');

    // Metatags descriptivos optimizados con terminología técnica e ingeniería pura
    this.metaService.updateTag({
      name: 'description',
      content: 'Portafolio de ingeniería de software de Joshefs Rubio. Desarrollo de aplicaciones de alto rendimiento, sistemas escalables con Angular/TypeScript y diseño de arquitecturas cloud en AWS.'
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Joshefs Rubio | Full Stack Developer & Software Engineer'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Desarrollo de software Full Stack enfocado en rendimiento, mantenibilidad y escalabilidad. Especialización en ecosistemas TypeScript, frameworks SPA y servicios en la nube.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://joshefrubio.com/'
    });
  }

  ngAfterViewInit() {
    // Solo ejecutamos lógica de DOM si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const activeSection = document.querySelector("#section-index");
      if (activeSection) {
        activeSection.addEventListener('scroll', () => {
          const scrollValue = activeSection.scrollTop;
          this.isCompacted.set(scrollValue > 50);
        });
      }
    }
  }

  toggleMenu() {
    this.mobileMenuOpen.update(val => !val);
  }

  /**
   * Función maestra de Scroll
   * Maneja tanto IDs de elementos como posiciones numéricas
   * @param position string (selector) o number (píxeles)
   */
  scrollTo(position: number | string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.querySelector('#section-index');
    if (!container) return;

    let targetPosition = 0;

    if (typeof position === 'string') {
      const targetElement = document.querySelector(position);
      if (targetElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = targetElement.getBoundingClientRect();
        // Calculamos la posición relativa al contenedor
        targetPosition = container.scrollTop + elementRect.top - containerRect.top;
      } else {
        console.warn(`Target element ${position} not found.`);
        return;
      }
    } else {
      targetPosition = position;
    }

    // Cancelamos cualquier animación de scroll en curso para evitar conflictos
    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    // Usamos GSAP para un control total y suave
    this.scrollAnimation = gsap.to(container, {
      scrollTo: {
        y: targetPosition,
        autoKill: true // Si el usuario scrollea manualmente, GSAP cede el control inmediatamente
      },
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        this.scrollAnimation = null;
      }
    });

    // Cerramos el menú móvil en caso de que esté abierto
    this.mobileMenuOpen.set(false);
  }

  /**
   * Alias específico para el Hero o el Header
   */
  scrollToProjects() {
    this.scrollTo('#next-section');
  }

  openMail() {
    const user = 'joshefsrubio';
    const domain = 'gmail.com';

    const email = `${user}@${domain}`;
    const subject = encodeURIComponent('Contacto desde tu portfolio');
    const body = encodeURIComponent('Hola Joshefs,\n\nMe gustaría ponerme en contacto contigo.');

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
