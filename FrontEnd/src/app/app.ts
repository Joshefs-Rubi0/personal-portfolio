import { Component, signal } from '@angular/core';
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
}
