import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publicas-colecciones',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
  ],
  templateUrl: './publicas-colecciones.component.html',
  styleUrls: ['./publicas-colecciones.component.css']
})
export class PublicasColeccionesComponent implements OnInit {
  actividades: any[] = [];
  videos: any[] = [];
  videos2:any[]=[];
  libros: any[]=[];
  mostrarContenido = false;
  mostrarContenido2=false;  
  sanitizedUrls: { [key: string]: SafeResourceUrl } = {};
  sanitizedUrls2: { [key: string]: SafeResourceUrl } = {};

  toggleContenido() {
    this.mostrarContenido = !this.mostrarContenido;  
    if (this.mostrarContenido) {
      this.mostrarContenido2 = false;
    }
  }

  toggleContenido2() {
    this.mostrarContenido2 = !this.mostrarContenido2;
    if (this.mostrarContenido2) {
      this.mostrarContenido = false;
    }  
  }

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.apiService.getActividades().subscribe((data: any[]) => {
      this.actividades = data.slice(0,1);
    });

    this.apiService.getVideos().subscribe((data: any[]) => {
      this.videos = data.slice(0, 2);
      this.sanitizeUrls(); 
    });

    this.apiService.getLibros().subscribe((data:any[]) =>{
      this.libros=data.slice(1,2);
    })

    this.apiService.getVideos().subscribe((data: any[]) => {
      this.videos2 = data.slice(2, 4);
      this.sanitizeUrls2(); 
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private sanitizeUrls() {
    this.videos.forEach(video => {
      this.sanitizedUrls[video.video_id] = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });
  }

  private sanitizeUrls2() {
    this.videos2.forEach(video => {
      this.sanitizedUrls2[video.video_id] = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });
  }

  getSafeUrl(video_id: number): SafeResourceUrl | undefined {
    return this.sanitizedUrls[video_id];
  }

  getSafeUrl2(video_id: number): SafeResourceUrl | undefined {
    return this.sanitizedUrls2[video_id];
  }
}
