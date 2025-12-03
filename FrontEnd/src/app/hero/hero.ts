import { Component, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit{
  ngAfterViewInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease',
      once: true,
    });
  }
}
