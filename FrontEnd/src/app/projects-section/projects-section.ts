import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selectedCategory = 'FullStack';
  categories = ['FullStack', 'FrontEnd', 'BackEnd'];
  activeProject: any = null;
  private isScrolling = false;
  private scrollObserver: any;

  projects = [
    { title: 'Melon Mind', category: 'FullStack', description: 'Generación automática de facturas a partir de tus citas registradas o facturas desde cero.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', demo_link: '#' },
    { title: 'Beta Pro', category: 'FullStack', description: 'Sistema de analítica avanzada para e-commerce en tiempo real.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', demo_link: '#' },
    { title: 'Nexus Dev', category: 'FullStack', description: 'Herramienta de despliegue continuo para arquitecturas cloud.', image: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0518?q=80&w=2070&auto=format&fit=crop', demo_link: '#' }
  ];

  filteredProjects: any[] = [];

  ngOnInit() { this.filter(); }

  ngAfterViewInit() { 
    setTimeout(() => this.initMagneticScroll(), 500); 
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
      onDown: () => { if(!this.isScrolling && !this.activeProject) this.navigateCards(1); },
      onUp: () => { if(!this.isScrolling && !this.activeProject) this.navigateCards(-1); },
      tolerance: 25,
      preventDefault: false
    });
  }

  private navigateCards(direction: number) {
    const cards = document.querySelectorAll('.card-main');
    const currentScroll = window.scrollY;
    let targetCard: HTMLElement | null = null;
    const threshold = 110; 

    if (direction === 1) {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        if (card.offsetTop - threshold > currentScroll + 50) { targetCard = card; break; }
      }
    } else {
      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i] as HTMLElement;
        if (card.offsetTop - threshold < currentScroll - 50) { targetCard = card; break; }
      }
    }
    if (targetCard) this.performScroll(targetCard.offsetTop - threshold);
  }

  private performScroll(target: number) {
    this.isScrolling = true;
    gsap.to(window, { 
      scrollTo: target, 
      duration: 0.8, 
      ease: "power4.out", 
      onComplete: () => { this.isScrolling = false; } 
    });
  }

  toggleExpand(project: any) {
    const tl = gsap.timeline();

    // Si ya hay un proyecto activo O si project es null, cerramos
    if (this.activeProject || project === null) {
      tl.to('.window-modern', { scale: 0.95, opacity: 0, y: 30, duration: 0.4, ease: "power2.inOut" })
      .to('.overlay-blur', { opacity: 0, duration: 0.3 }, "-=0.2")
      .add(() => {
        // Primero ocultamos los elementos
        gsap.set('.overlay-blur', { display: 'none' });
        gsap.set('.window-modern', { display: 'none' });
        
        // Luego limpiamos el estado
        this.activeProject = null;
        
        // Restauramos el scroll del body
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        // Esperamos un frame antes de reinicializar el scroll
        requestAnimationFrame(() => {
          this.initMagneticScroll();
        });
      });
    } else {
      // Abrimos el modal con el nuevo proyecto
      this.activeProject = project;
      
      // Matamos el observer de scroll
      if (this.scrollObserver) this.scrollObserver.kill();
      
      // Bloqueamos el scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      tl.set('.overlay-blur', { display: 'flex', opacity: 0 })
        .set('.window-modern', { display: 'flex' })
        .to('.overlay-blur', { opacity: 1, duration: 0.4 })
        .to('.window-modern', { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out", pointerEvents: 'auto' }, "-=0.3");
    }
  }
}