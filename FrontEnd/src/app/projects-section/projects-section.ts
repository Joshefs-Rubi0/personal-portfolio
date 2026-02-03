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
    { 
      title: 'Melon Mind', 
      category: 'FullStack', 
      description: 'Generación automática de facturas a partir de tus citas registradas o facturas desde cero.', 
      extra_info: 'Control total de impuestos y salud financiera.', 
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', // Dashboard financiero dark
      demo_link: '#', 
      status: 'live' 
    },
    { 
      title: 'Beta Pro', 
      category: 'FullStack', 
      description: 'Sistema de analítica avanzada para e-commerce en tiempo real.', 
      extra_info: 'Fase de testeo de rendimiento y carga.', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', // Analytics/Data
      demo_link: '#', 
      status: 'beta' 
    },
    { 
      title: 'Nexus Dev', 
      category: 'FullStack', 
      description: 'Herramienta de despliegue continuo para arquitecturas cloud.', 
      extra_info: 'Optimización de pipelines automatizados.', 
      image: 'https://images.unsplash.com/photo-1667372393119-c81c0cda0518?q=80&w=2070&auto=format&fit=crop', // Cloud/Server abstract
      demo_link: '#', 
      status: 'beta' 
    },
    
    // --- FRONTEND ---
    { 
      title: 'UI Kit Pro', 
      category: 'FrontEnd', 
      description: 'Librería de componentes altamente personalizables.', 
      extra_info: 'Basado en principios de diseño moderno.', 
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop', // Minimal UI Design
      demo_link: '#', 
      status: 'live' 
    },
    { 
      title: 'Cyber UI', 
      category: 'FrontEnd', 
      description: 'Dashboard experimental con estética Cyberpunk.', 
      extra_info: 'Uso de GSAP y CSS Masks.', 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // Cyberpunk Neon
      demo_link: '#', 
      status: 'beta' 
    },
    { 
      title: 'Neon Web', 
      category: 'FrontEnd', 
      description: 'Landing page optimizada para conversión.', 
      extra_info: 'SEO-ready y Core Web Vitals.', 
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', // Retro Tech
      demo_link: '#', 
      status: 'beta' 
    },

    // --- BACKEND ---
    { 
      title: 'Auth Master', 
      category: 'BackEnd', 
      description: 'Servicio centralizado de autenticación biométrica.', 
      extra_info: 'Seguridad de grado bancario.', 
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', // Code/Security
      demo_link: '#', 
      status: 'live' 
    },
    { 
      title: 'Data Engine', 
      category: 'BackEnd', 
      description: 'Procesador de datos a gran escala.', 
      extra_info: 'Implementación con Go y Redis.', 
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop', // Code Screen
      demo_link: '#', 
      status: 'beta' 
    },
    { 
      title: 'Neural API', 
      category: 'BackEnd', 
      description: 'API de procesamiento de lenguaje natural.', 
      extra_info: 'Modelos de IA integrados.', 
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop', // AI Network
      demo_link: '#', 
      status: 'beta' 
    }
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
    if (this.activeProject === project) {
      this.activeProject = null;
      document.documentElement.style.overflow = 'auto'; // Habilita el snap de nuevo
    } else {
      this.activeProject = project;
      document.documentElement.style.overflow = 'hidden'; // Bloquea el fondo totalmente
    }
}
}