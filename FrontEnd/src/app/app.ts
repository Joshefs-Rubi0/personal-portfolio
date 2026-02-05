import { Component, signal, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects-section/projects-section';
import { ContactFooter } from './contact-footer/contact-footer';
import { AboutMe } from './about-me/about-me';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

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
  private scrollAnimation: gsap.core.Tween | null = null;
  private isScrollingProgrammatically = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setSEO();
  }

  private setSEO() {
    this.titleService.setTitle('Joshefs Rubio - Full Stack Developer Angular & AWS | ADAE, OCUA, Raíces de la Vida');
    
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Joshefs Agustín Rubio Carrillo - Full Stack Developer en Puebla, México. Creador de ADAE (gestión educativa), OCUA (IA horarios universitarios) y Raíces de la Vida. Especialista en Angular, TypeScript, AWS, PHP y MySQL.' 
    });
    
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'Joshefs Rubio, Joshefs Agustín Rubio Carrillo, Full Stack Developer Puebla, Angular Developer México, AWS Developer, TypeScript, PHP MySQL, ADAE sistema educativo, OCUA horarios IA, desarrollador web Puebla, programador Angular, cloud computing AWS, desarrollador freelance México' 
    });
    
    this.metaService.updateTag({ 
      property: 'og:title', 
      content: 'Joshefs Rubio - Full Stack Developer | ADAE, OCUA, Raíces de la Vida' 
    });
    
    this.metaService.updateTag({ 
      property: 'og:description', 
      content: 'Full Stack Developer especializado en Angular, TypeScript, AWS Cloud. Creador de ADAE, OCUA y Raíces de la Vida. Portfolio profesional con proyectos reales en Puebla, México.' 
    });
    
    this.metaService.updateTag({ 
      name: 'twitter:title', 
      content: 'Joshefs Rubio - Full Stack Developer Angular & AWS' 
    });
    
    this.metaService.updateTag({ 
      name: 'twitter:description', 
      content: 'CEO de ADAE, OCUA y Raíces de la Vida. Especialista en Angular, TypeScript y AWS Cloud.' 
    });
  }

  ngAfterViewInit() {
    const activeSection = document.querySelector("#section-index");
    if (activeSection) {
      activeSection.addEventListener('scroll', () => {
        const scrollValue = activeSection.scrollTop;
        this.isCompacted.set(scrollValue > 50);
      });

      // Solo cancelar animación si NO es scroll programático
      const cancelAnimation = () => {
        if (this.scrollAnimation && !this.isScrollingProgrammatically) {
          this.scrollAnimation.kill();
          this.scrollAnimation = null;
        }
      };

      activeSection.addEventListener('wheel', cancelAnimation, { passive: true });
      activeSection.addEventListener('touchstart', cancelAnimation, { passive: true });
    }
  }

  toggleMenu() {
    this.mobileMenuOpen.update(val => !val);
  }

  scrollTo(position: number | string) {
    const container = document.querySelector('#section-index');
    if (!container) return;

    let targetPosition = 0;

    if (typeof position === 'string') {
      const targetElement = document.querySelector(position);
      if (targetElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = targetElement.getBoundingClientRect();
        targetPosition = container.scrollTop + elementRect.top - containerRect.top;
      }
    } else {
      targetPosition = position;
    }

    container.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }

  scrollToProjects() {
    const container = document.querySelector('#section-index');
    const target = document.querySelector('#next-section');
    
    if (!container || !target) return;

    // Cancelar animación anterior
    if (this.scrollAnimation) {
      this.scrollAnimation.kill();
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const currentScroll = container.scrollTop;
    const targetPosition = currentScroll + targetRect.top - containerRect.top;

    // Marcar que estamos haciendo scroll programático
    this.isScrollingProgrammatically = true;

    this.scrollAnimation = gsap.to(container, {
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        this.scrollAnimation = null;
        this.isScrollingProgrammatically = false;
      },
      onInterrupt: () => {
        this.scrollAnimation = null;
        this.isScrollingProgrammatically = false;
      }
    });
    
    this.mobileMenuOpen.set(false);
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