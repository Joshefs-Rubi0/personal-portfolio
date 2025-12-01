import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css'
})
export class ProjectsSection implements OnInit {
  projects: any[] = [
    {
      id: 1,
      title: 'Proyecto de Ejemplo 1',
      category: 'Full Stack',
      description: 'Descripción del proyecto de ejemplo',
      technologies: 'Angular, Node.js, MySQL',
      github_link: 'https://github.com',
      demo_link: 'https://demo.com',
      image: null
    }
  ];
  filtered: any[] = [];
  selected = 'Todos';

  categories = ['Todos', 'Full Stack', 'Frontend', 'Backend'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Desconectado del backend - usando datos mock locales
    this.filtered = this.projects;
  }

  hoverCategory(cat: string) {
    this.selected = cat;

    if (cat === 'Todos') {
      this.filtered = this.projects;
    } else {
      this.filtered = this.projects.filter(p => p.category === cat);
    }
  }
}
