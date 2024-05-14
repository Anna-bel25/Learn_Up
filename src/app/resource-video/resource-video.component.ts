import { Component, Input, OnInit } from '@angular/core';
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

  @Input() mostrarVideos: boolean = false;
  @Input() materiaId: number | undefined;
  @Input() nivelAcademico: string | undefined;
  @Input() materiaNombre: string | undefined;

  videos: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://raw.githubusercontent.com/Anna-bel25/api_resource/main/recurso_video.json')
      .subscribe(
        videos => {
          console.log('Videos recuperados:', videos);
          // Filtrar los videos correspondientes al materia_id
          this.videos = videos.filter(video => video.materia_id === this.materiaId);
          this.sanitizeUrls();
          if (this.videos.length === 0) {
            console.log('No se encontraron videos para este materia_id.');
          }
        },
        error => {
          console.error('Error al recuperar los videos:', error);
        }
      );
  }







  sanitizeUrls(): void {
    this.videos.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
