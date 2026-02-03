import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './projects-section.html',
  styleUrls: ['./projects-section.css']
})
export class ProjectsSection implements OnInit {
  selectedCategory = 'FullStack';
  categories = ['FullStack', 'FrontEnd', 'BackEnd'];
  activeProject: any = null;

  projects = [
    // --- FULLSTACK ---
    { title: 'Melon Mind', category: 'FullStack', description: 'Generación automática de facturas a partir de tus citas registradas o facturas desde cero.', extra_info: 'Control total de impuestos y salud financiera.', image: 'assets/stepbro_mind.png', demo_link: '#', status: 'live' },
    { title: 'Beta Pro', category: 'FullStack', description: 'Sistema de analítica avanzada para e-commerce en tiempo real.', extra_info: 'Fase de testeo de rendimiento y carga.', image: 'assets/carded.png', demo_link: '#', status: 'beta' },
    { title: 'Nexus Dev', category: 'FullStack', description: 'Herramienta de despliegue continuo para arquitecturas cloud.', extra_info: 'Optimización de pipelines automatizados.', image: 'assets/stepbro_mind.png', demo_link: '#', status: 'beta' },
    
    // --- FRONTEND ---
    { title: 'UI Kit Pro', category: 'FrontEnd', description: 'Librería de componentes altamente personalizables.', extra_info: 'Basado en principios de diseño moderno.', image: 'assets/carded.png', demo_link: '#', status: 'live' },
    { title: 'Cyber UI', category: 'FrontEnd', description: 'Dashboard experimental con estética Cyberpunk.', extra_info: 'Uso de GSAP y CSS Masks.', image: 'assets/stepbro_mind.png', demo_link: '#', status: 'beta' },
    { title: 'Neon Web', category: 'FrontEnd', description: 'Landing page optimizada para conversión.', extra_info: 'SEO-ready y Core Web Vitals.', image: 'assets/carded.png', demo_link: '#', status: 'beta' },

    // --- BACKEND ---
    { title: 'Auth Master', category: 'BackEnd', description: 'Servicio centralizado de autenticación biométrica.', extra_info: 'Seguridad de grado bancario.', image: 'assets/stepbro_mind.png', demo_link: '#', status: 'live' },
    { title: 'Data Engine', category: 'BackEnd', description: 'Procesador de datos a gran escala.', extra_info: 'Implementación con Go y Redis.', image: 'assets/carded.png', demo_link: '#', status: 'beta' },
    { title: 'Neural API', category: 'BackEnd', description: 'API de procesamiento de lenguaje natural.', extra_info: 'Modelos de IA integrados.', image: 'assets/stepbro_mind.png', demo_link: '#', status: 'beta' }
  ];

  filteredProjects: any[] = [];

  ngOnInit() { this.filter(); }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filter();
  }

  filter() {
    this.filteredProjects = this.projects.filter(p => p.category === this.selectedCategory);
  }

  toggleExpand(project: any) {
    this.activeProject = this.activeProject === project ? null : project;
    document.body.style.overflow = this.activeProject ? 'hidden' : 'auto';
  }
}