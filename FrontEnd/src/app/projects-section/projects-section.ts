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
  private lastScrollTime = 0;
  private scrollCooldown = 800;
  private currentScrollAnimation: gsap.core.Tween | null = null;

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
      onDown: () => { 
        if (!this.isScrolling && !this.activeProject) {
          this.handleScrollWithCooldown(1);
        }
      },
      onUp: () => { 
        if (!this.isScrolling && !this.activeProject) {
          this.handleScrollWithCooldown(-1);
        }
      },
      tolerance: 50,
      preventDefault: false,
      onChangeY: () => {
        // Cancelar animación si el usuario hace scroll manual
        if (this.currentScrollAnimation) {
          this.currentScrollAnimation.kill();
          this.currentScrollAnimation = null;
          this.isScrolling = false;
        }
      }
    });
  }

  private handleScrollWithCooldown(direction: number) {
    const now = Date.now();
    
    if (now - this.lastScrollTime < this.scrollCooldown) {
      return;
    }
    
    this.lastScrollTime = now;
    this.navigateCards(direction);
  }

  private getResponsiveThreshold(): number {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 120 : 110;
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
    // Cancelar animación anterior si existe
    if (this.currentScrollAnimation) {
      this.currentScrollAnimation.kill();
    }

    this.isScrolling = true;
    
    this.currentScrollAnimation = gsap.to(window, { 
      scrollTo: target, 
      duration: 2, 
      ease: "power4.out", 
      onComplete: () => { 
        this.isScrolling = false;
        this.currentScrollAnimation = null;
      } 
    });
  }

  toggleExpand(project: any) {
    const tl = gsap.timeline();

    if (this.activeProject || project === null) {
      tl.to('.window-modern', { scale: 0.95, opacity: 0, y: 30, duration: 0.4, ease: "power2.inOut" })
      .to('.overlay-blur', { opacity: 0, duration: 0.3 }, "-=0.2")
      .add(() => {
        gsap.set('.overlay-blur', { display: 'none' });
        gsap.set('.window-modern', { display: 'none' });
        
        this.activeProject = null;
        
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        requestAnimationFrame(() => {
          this.initMagneticScroll();
        });
      });
    } else {
      this.activeProject = project;
      
      if (this.scrollObserver) this.scrollObserver.kill();
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      tl.set('.overlay-blur', { display: 'flex', opacity: 0 })
        .set('.window-modern', { display: 'flex' })
        .to('.overlay-blur', { opacity: 1, duration: 0.4 })
        .to('.window-modern', { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out", pointerEvents: 'auto' }, "-=0.3");
    }
  }
}