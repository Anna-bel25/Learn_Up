import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resource-video',
  standalone: true,
  imports: [RouterLink, ResourceVideoComponent, ResourceMenuComponent, CommonModule],
  templateUrl: './resource-video.component.html',
  styleUrl: './resource-video.component.css'
})
export class ResourceVideoComponent implements OnInit {

  videosPreescolar: any[] = [];
  videosPrimaria: any[] = [];
  videosSecundaria: any[] = [];
  videosBachillerato: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://raw.githubusercontent.com/Anna-bel25/api_resource/main/recurso_video.json')
      .subscribe(videos => {
      //console.log('Datos recibidos:', videos);
      this.videosPreescolar = videos.filter(video => video.materia_id === 4);
      this.videosPrimaria = videos.filter(video => video.materia_id === 11);
      this.videosSecundaria = videos.filter(video => video.materia_id === 11);
      this.videosBachillerato = videos.filter(video => video.materia_id === 11);

      //console.log('Videos de Preescolar:', this.videosPreescolar);

        // Sanitizar las URL de los videos
        this.sanitizeUrls();
      });
  }

  sanitizeUrls(): void {
    // Sanitizar las URL de los videos en todas las listas
    this.videosPreescolar.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
    this.videosPrimaria.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
    this.videosSecundaria.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
    this.videosBachillerato.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
