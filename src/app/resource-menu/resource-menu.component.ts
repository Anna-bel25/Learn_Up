import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { HomePageComponent } from '../home-page/home-page.component';
import { ResourceVideoComponent } from '../resource-video/resource-video.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resource-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, HomePageComponent, ResourceMenuComponent, ResourceVideoComponent],
  templateUrl: './resource-menu.component.html',
  styleUrl: './resource-menu.component.css'
})
export class ResourceMenuComponent implements AfterViewInit, OnInit  {

  @Output() nivelSeleccionado: EventEmitter<any> = new EventEmitter();
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;

  swiper!: Swiper;
  materiaId: number | undefined;
  nivelAcademico: string = '';
  materiaNombre: string = '';
  mostrarVideos: boolean = false;

  @ViewChild('videosSection') videoSection!: ElementRef<any>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.materiaId = +params['materiaId']; // Convertir a numero
      //this.nivelAcademico = params['nivelAcademico'] || ''; // Capturar nivel academico
      //this.materiaNombre = params['materiaNombre'] || ''; // Capturar nombre de la materia
    });
  }

  ngAfterViewInit(): void {
    new Swiper('.review-slider', {
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }


  toggleVideos() {
    this.mostrarVideos = !this.mostrarVideos;
  }


  scrollToVideos() {
    this.videoSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  mostrarMaterias(nivel: string, materia: string): void {
    this.nivelSeleccionado.emit({nivel: nivel, materia: materia});
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
