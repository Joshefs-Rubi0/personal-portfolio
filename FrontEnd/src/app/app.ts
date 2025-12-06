import { Component, signal, HostListener } from '@angular/core';
import { Hero } from './hero/hero';
import { ProjectsSection } from './projects-section/projects-section';
import { ContactFooter } from './contact-footer/contact-footer';
import { AboutMe } from './about-me/about-me';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Hero,
    ProjectsSection,
    ContactFooter,
    AboutMe
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
  @HostListener('window:touchstart', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (target.closest('header')) return;

    this.mobileMenuOpen.set(false);
  }

}
