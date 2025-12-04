import { Component, OnInit, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css'
})
export class ProjectsSection implements OnInit, AfterViewInit {
  isMobile = false;

  projects: any[] = [
    {
      id: 1,
      title: 'Proyecto de Ejemplo 1',
      category: 'Full Stack',
      description: 'Descripción del proyecto de ejemplo',
      technologies: 'Angular,Node.js,MySQL',
      github_link: 'https://github.com',
      demo_link: 'https://demo.com',
      image: null
    },
    {
      id: 2,
      title: 'Proyecto de Ejemplo 2',
      category: 'Frontend',
      description: 'Otro proyecto de ejemplo',
      technologies: 'React,TypeScript',
      github_link: 'https://github.com',
      demo_link: 'https://demo.com',
      image: null
    },
    {
      id: 3,
      title: 'Proyecto de Ejemplo 3',
      category: 'Backend',
      description: 'Tercer proyecto de ejemplo',
      technologies: 'Node.js,Express,MongoDB',
      github_link: 'https://github.com',
      demo_link: 'https://demo.com',
      image: null
    }
  ];
  filtered: any[] = [];
  selected = 'Todos';

  categories = ['Todos', 'Full Stack', 'Frontend', 'Backend'];

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
  this.isMobile = window.innerWidth < 768;
  this.filtered = this.projects;
}

  ngAfterViewInit() {
    this.updateCardsOnScroll();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateCardsOnScroll();
  }

  updateCardsOnScroll() {
    const cards = this.elementRef.nativeElement.querySelectorAll('.project-card');
    const windowHeight = window.innerHeight;
    const viewportCenter = windowHeight / 2;

    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distanceFromCenter = cardCenter - viewportCenter;
      const maxDistance = windowHeight;

      let scale = 1;
      let rotateX = 0;
      let opacity = 1;

      if (distanceFromCenter > maxDistance) {
        // Tarjeta muy abajo - estado inicial
        scale = 0.75;
        rotateX = 25;
        opacity = 0.2;
      } else if (distanceFromCenter < -maxDistance) {
        // Tarjeta muy arriba - estado inicial invertido
        scale = 0.75;
        rotateX = -25;
        opacity = 0.2;
      } else {
        // La tarjeta está visible - calcular animación
        const normalizedDistance = distanceFromCenter / maxDistance;
        
        scale = 1 - Math.abs(normalizedDistance) * 0.25;
        rotateX = normalizedDistance * 25;
        opacity = 1 - Math.abs(normalizedDistance) * 0.8;

        // Limitar valores
        scale = Math.max(0.75, Math.min(1, scale));
        opacity = Math.max(0.2, Math.min(1, opacity));
      }

      // Aplicar transformaciones
      card.style.transform = `perspective(1200px) scale(${scale}) rotateX(${rotateX}deg)`;
      card.style.opacity = opacity.toString();
      
      // Box shadow cuando está centrada
      const normalizedDistance = distanceFromCenter / maxDistance;
      if (Math.abs(normalizedDistance) < 0.2) {
        card.style.boxShadow = 'rgba(59, 130, 246, 0.3) 0px 20px 60px 0px';
      } else {
        card.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 10px 30px 0px';
      }
    });
  }

  hoverCategory(cat: string) {
    this.selected = cat;

    if (cat === 'Todos') {
      this.filtered = this.projects;
    } else {
      this.filtered = this.projects.filter(p => p.category === cat);
    }
    
    // Actualizar animaciones después de filtrar
    setTimeout(() => this.updateCardsOnScroll(), 100);
  }
}