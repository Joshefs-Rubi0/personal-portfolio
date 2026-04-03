import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.css']
})
export class ProjectsSection implements OnInit, AfterViewInit {
  private meta = inject(Meta);
  private titleService = inject(Title);

  selectedCategory = 'FullStack';
  categories = ['FullStack', 'FrontEnd', 'BackEnd'];
  activeProject: any = null;
  
  private isScrolling = false;
  private scrollObserver: any;
  private lastScrollTime = 0;
  private scrollCooldown = 800;
  private currentScrollAnimation: gsap.core.Tween | null = null;
  private scrollRevealCleanup: (() => void) | null = null;

  projects = [
    { 
      title: 'ADAE - Gestión Educativa', 
      category: 'FullStack', 
      description: 'Plataforma de gestión educativa web diseñada para CBTis. Centraliza procesos académicos, pase de lista digital y almacenamiento seguro con WebSockets y cifrado avanzado.', 
      image: 'ADAE.webp', 
      demo_link: '#',
      tech: ['Angular', 'TypeScript', 'WebSocket', 'HTTPS'],
      keywords: 'ADAE, gestión educativa, CBTis, pase de lista digital, Joshefs Rubio',
      timeline: [
        { date: '2023 · Q1', phase: 'Investigación y diseño', description: 'Levantamiento de requerimientos con directivos del CBTis. Arquitectura del sistema y diseño UX/UI.', active: false },
        { date: '2023 · Q2', phase: 'Desarrollo del backend', description: 'API REST robusta con Node.js, comunicación en tiempo real vía WebSockets y cifrado AES para datos sensibles.', active: false },
        { date: '2023 · Q3', phase: 'Módulo de asistencia', description: 'Pase de lista digital con QR, gestión de roles de docentes y alumnos, e historial académico centralizado.', active: false },
        { date: '2023 · Q4', phase: 'Deploy y producción', description: 'Despliegue en servidor institucional con HTTPS. Capacitación a docentes y validación con usuarios reales.', active: true },
      ]
    },
    { 
      title: 'OCUA - IA para Horarios', 
      category: 'FullStack', 
      description: 'Aplicación web impulsada con Inteligencia Artificial para la creación y optimización de horarios universitarios. Reduce tiempos de organización de 2 horas a 10 minutos.', 
      image: 'OCUA.webp', 
      demo_link: '#',
      tech: ['Inteligencia Artificial', 'Angular', 'TypeScript'],
      keywords: 'OCUA, horarios universitarios IA, optimizador horarios, Joshefs Rubio',
      timeline: [
        { date: '2024 · Q1', phase: 'Conceptualización con IA', description: 'Diseño del modelo de inteligencia artificial para restricciones académicas y optimización de horarios.', active: false },
        { date: '2024 · Q2', phase: 'Motor de optimización', description: 'Algoritmo genético entrenado con datos históricos. Reducción del tiempo de generación de 2 horas a 10 minutos.', active: false },
        { date: '2024 · Q3', phase: 'Interfaz Angular', description: 'Dashboard interactivo para gestión, visualización en grilla y exportación de horarios generados por la IA.', active: false },
        { date: '2024 · Q4', phase: 'Validación con usuarios', description: 'Testing con coordinadores académicos reales. Refinamiento del modelo con retroalimentación institucional.', active: true },
      ]
    },
    { 
      title: 'Raíces de la Vida', 
      category: 'FullStack', 
      description: 'Sistema de cuidado de plantas y jardinería escolar desarrollado con PHP y MySQL. Incluye gestión de recordatorios y mantenimiento automatizado de áreas verdes.', 
      image: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0518?q=80&w=2070&auto=format&fit=crop', 
      demo_link: '#',
      tech: ['PHP', 'MySQL', 'XAMPP'],
      keywords: 'Raíces de la vida, sistema jardinería, PHP MySQL, Joshefs Rubio',
      timeline: [
        { date: '2022 · Q1', phase: 'Análisis del problema', description: 'Diagnóstico de áreas verdes escolares. Diseño del sistema de recordatorios y roles de cuidadores.', active: false },
        { date: '2022 · Q2', phase: 'Backend PHP + MySQL', description: 'Base de datos de plantas, lógica de mantenimiento automatizado y sistema de recordatorios programados.', active: false },
        { date: '2022 · Q3', phase: 'Panel de control', description: 'Interfaz web para coordinadores escolares, notificaciones de riego y fertilización por área.', active: false },
        { date: '2022 · Q4', phase: 'Implementación escolar', description: 'Despliegue con XAMPP, capacitación a personal y entrega oficial a la institución educativa.', active: true },
      ]
    }
  ];

  filteredProjects: any[] = [];

  get titleWords(): string[] {
    return this.activeProject?.title?.split(' ') ?? [];
  }

  ngOnInit() { 
    this.filter(); 
    this.updateDefaultSEO();
  }

  ngAfterViewInit() { 
    setTimeout(() => this.initMagneticScroll(), 500);
    // Precargar todas las imágenes para que no carguen al abrir el modal
    this.projects.forEach(p => {
      const img = new Image();
      img.src = p.image;
    });
  }

  private updateDefaultSEO() {
    this.titleService.setTitle('Joshefs Rubio - Full Stack Developer Angular | Portfolio');
    this.meta.updateTag({ name: 'description', content: 'Ingeniero Senior FullStack Joshefs Rubio, CEO: ADAE, OCUA y Raíces de la Vida. Soluciones Full Stack con Angular, AWS e Inteligencia Artificial.' });
  }

  private updateProjectSEO(project: any) {
    if (project) {
      this.titleService.setTitle(`${project.title} | Joshefs Rubio Portfolio`);
      this.meta.updateTag({ name: 'description', content: project.description });
      this.meta.updateTag({ name: 'keywords', content: project.keywords });
    } else {
      this.updateDefaultSEO();
    }
  }

  filter() {
    this.filteredProjects = this.projects.filter(p => p.category === this.selectedCategory);
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filter();
  }

  private initMagneticScroll() {
    if (this.scrollObserver) this.scrollObserver.kill();
    
    this.scrollObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onDown: () => { 
        if (!this.isScrolling && !this.activeProject) this.handleScrollWithCooldown(1);
      },
      onUp: () => { 
        if (!this.isScrolling && !this.activeProject) this.handleScrollWithCooldown(-1);
      },
      tolerance: 50,
      preventDefault: false,
    });
  }

  private handleScrollWithCooldown(direction: number) {
    const now = Date.now();
    if (now - this.lastScrollTime < this.scrollCooldown) return;
    this.lastScrollTime = now;
    this.navigateCards(direction);
  }

  private getResponsiveThreshold(): number {
    return window.innerWidth < 768 ? 120 : 110;
  }

  private navigateCards(direction: number) {
    const cards = document.querySelectorAll('.card-main');
    const currentScroll = window.scrollY;
    let targetCard: HTMLElement | null = null;
    const threshold = this.getResponsiveThreshold();

    if (direction === 1) {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        if (card.offsetTop - threshold > currentScroll + 50) { 
          targetCard = card; 
          break; 
        }
      }
    } else {
      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i] as HTMLElement;
        if (card.offsetTop - threshold < currentScroll - 50) { 
          targetCard = card; 
          break; 
        }
      }
    }
    
    if (targetCard) this.performScroll(targetCard.offsetTop - threshold);
  }

  private performScroll(target: number) {
    if (this.currentScrollAnimation) this.currentScrollAnimation.kill();
    this.isScrolling = true;
    this.currentScrollAnimation = gsap.to(window, { 
      scrollTo: target, 
      duration: 1.5,
      ease: "power4.out", 
      onComplete: () => { 
        this.isScrolling = false;
        this.currentScrollAnimation = null;
      } 
    });
  }

  // Anima palabras + descripción/botón — corre en cuanto Angular renderiza el *ngIf
  private runModalContentAnimation() {
    const words   = document.querySelectorAll('.modal-title-word');
    const reveals = document.querySelectorAll('.modal-scroll-reveal');
    if (!words.length) return;

    gsap.set(reveals, { x: 50, opacity: 0 });

    gsap.timeline()
      .fromTo(words,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power4.out' }
      )
      .to(reveals,
        { x: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
        '-=0.75'
      );
  }

  // Timeline scroll-triggered:
  // · Cada item anima al entrar al viewport
  // · Reset cuando scrollTop < 150 (cerca del top, pero no en la cara del usuario)
  private initModalScrollReveal() {
    const ch = document.querySelector('.content-holder') as HTMLElement;
    if (!ch) return;

    gsap.set(ch.querySelectorAll('.timeline-item'), { x: 70, opacity: 0 });

    let wasNearTop = true;

    const onScroll = () => {
      const scrollTop = ch.scrollTop;
      const holderRect = ch.getBoundingClientRect();

      // Reset solo cuando el usuario subió considerablemente (cerca del top)
      if (scrollTop < 150) {
        if (!wasNearTop) {
          wasNearTop = true;
          ch.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('revealed');
            gsap.set(el, { x: 70, opacity: 0 });
          });
        }
        return;
      }

      wasNearTop = false;

      ch.querySelectorAll('.timeline-item:not(.revealed)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top - holderRect.top < holderRect.height * 0.85) {
          el.classList.add('revealed');
          gsap.fromTo(el,
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }
          );
        }
      });
    };

    ch.addEventListener('scroll', onScroll);
    this.scrollRevealCleanup = () => ch.removeEventListener('scroll', onScroll);
  }

  toggleExpand(project: any) {
    const tl = gsap.timeline();
    this.updateProjectSEO(project);

    if (this.activeProject || project === null) {
      // CERRAR MODAL
      this.scrollRevealCleanup?.();
      this.scrollRevealCleanup = null;

      tl.to('.window-modern', { scale: 0.95, opacity: 0, y: 30, duration: 0.4, ease: 'power2.inOut' })
        .to('.overlay-blur', { opacity: 0, duration: 0.3 }, '-=0.2')
        .add(() => {
          gsap.set(['.overlay-blur', '.window-modern'], { display: 'none' });
          const modalEl = document.querySelector('.window-modern') as HTMLElement;
          if (modalEl) modalEl.style.pointerEvents = 'none';
          this.activeProject = null;
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          requestAnimationFrame(() => this.initMagneticScroll());
        });
    } else {
      // ABRIR MODAL
      this.activeProject = project;
      if (this.scrollObserver) this.scrollObserver.kill();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      tl.set('.overlay-blur', { display: 'flex', opacity: 0 })
        .set('.window-modern', { display: 'flex', scale: 0.97, opacity: 0, y: 30 })
        .add(() => {
          const modalEl = document.querySelector('.window-modern') as HTMLElement;
          if (modalEl) modalEl.style.pointerEvents = 'auto';
          const ch = document.querySelector('.content-holder') as HTMLElement;
          if (ch) ch.scrollTop = 0;

          // Doble RAF: Angular renderiza en el frame 1, DOM estable en frame 2
          // Las animaciones arrancan MIENTRAS el modal abre → sin delay percibido
          requestAnimationFrame(() => requestAnimationFrame(() => {
            this.runModalContentAnimation();
            this.initModalScrollReveal();
          }));
        })
        .to('.overlay-blur', { opacity: 1, duration: 0.5 })
        .to('.window-modern', { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.3');
    }
  }
}