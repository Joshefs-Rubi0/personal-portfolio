import { Component, signal, HostListener } from '@angular/core';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects-section/projects-section';
import { ContactFooter } from './contact-footer/contact-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Hero,
    ProjectsSection,
    ContactFooter
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('FrontEnd');

  mobileMenuOpen = signal<boolean>(false);

  //Alterna el menú
  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  //Cierra menú al clicar fuera del header
  @HostListener('window:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest('header')) return;

    // Cierra menú
    this.mobileMenuOpen.set(false);
  }
}
