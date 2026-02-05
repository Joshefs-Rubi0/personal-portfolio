import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser'; // Importante para SEO
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
  // Inyectamos los servicios de SEO
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

  projects = [
    { 
      title: 'ADAE - Gestión Educativa', 
      category: 'FullStack', 
      description: 'Plataforma de gestión educativa web diseñada para CBTis. Centraliza procesos académicos, pase de lista digital y almacenamiento seguro con WebSockets y cifrado avanzado.', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
      demo_link: '#',
      tech: ['Angular', 'TypeScript', 'WebSocket', 'HTTPS'],
      keywords: 'ADAE, gestión educativa, CBTis, pase de lista digital, Joshefs Rubio'
    },
    { 
      title: 'OCUA - IA para Horarios', 
      category: 'FullStack', 
      description: 'Aplicación web impulsada con Inteligencia Artificial para la creación y optimización de horarios universitarios. Reduce tiempos de organización de 2 horas a 10 minutos.', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', 
      demo_link: '#',
      tech: ['Inteligencia Artificial', 'Angular', 'TypeScript'],
      keywords: 'OCUA, horarios universitarios IA, optimizador horarios, Joshefs Rubio'
    },
    { 
      title: 'Raíces de la Vida', 
      category: 'FullStack', 
      description: 'Sistema de cuidado de plantas y jardinería escolar desarrollado con PHP y MySQL. Incluye gestión de recordatorios y mantenimiento automatizado de áreas verdes.', 
      image: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0518?q=80&w=2070&auto=format&fit=crop', 
      demo_link: '#',
      tech: ['PHP', 'MySQL', 'XAMPP'],
      keywords: 'Raíces de la vida, sistema jardinería, PHP MySQL, Joshefs Rubio'
    }
  ];

  filteredProjects: any[] = [];

  ngOnInit() { 
    this.filter(); 
    this.updateDefaultSEO();
  }

  ngAfterViewInit() { 
    setTimeout(() => this.initMagneticScroll(), 500); 
  }

  // --- Lógica de SEO Dinámico ---
  private updateDefaultSEO() {
    this.titleService.setTitle('Joshefs Rubio - Proyectos Destacados | Full Stack Developer');
    this.meta.updateTag({ name: 'description', content: 'Explora los proyectos de Joshefs Rubio: ADAE, OCUA y Raíces de la Vida. Soluciones Full Stack con Angular, AWS e Inteligencia Artificial.' });
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

  // --- Lógica de Componente ---
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
      duration: 1.5, // Un poco más rápido para mejor UX
      ease: "power4.out", 
      onComplete: () => { 
        this.isScrolling = false;
        this.currentScrollAnimation = null;
      } 
    });
  }

  toggleExpand(project: any) {
    const tl = gsap.timeline();
    this.updateProjectSEO(project); // Actualizamos SEO al abrir/cerrar

    if (this.activeProject || project === null) {
      tl.to('.window-modern', { scale: 0.95, opacity: 0, y: 30, duration: 0.4, ease: "power2.inOut" })
        .to('.overlay-blur', { opacity: 0, duration: 0.3 }, "-=0.2")
        .add(() => {
          gsap.set(['.overlay-blur', '.window-modern'], { display: 'none' });
          this.activeProject = null;
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          requestAnimationFrame(() => this.initMagneticScroll());
        });
    } else {
      this.activeProject = project;
      if (this.scrollObserver) this.scrollObserver.kill();
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      tl.set('.overlay-blur', { display: 'flex', opacity: 0 })
        .set('.window-modern', { display: 'flex' })
        .to('.overlay-blur', { opacity: 1, duration: 0.4 })
        .to('.window-modern', { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, "-=0.3");
    }
  }
}