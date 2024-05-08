import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-resource-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, HomePageComponent],
  templateUrl: './resource-menu.component.html',
  styleUrl: './resource-menu.component.css'
})
export class ResourceMenuComponent implements AfterViewInit {

  swiper!: Swiper;

  constructor() {}

  ngAfterViewInit(): void {
    this.swiper = new Swiper(".review-slider", {
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

}
