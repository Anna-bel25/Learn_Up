import { Component, Input, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { VideosService } from '../services/recursos.services';

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
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;


  videos: any[] = [];
  sanitizedUrls: { [key: string]: SafeResourceUrl } = {};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchVideos();
  }



  private fetchVideos() {
    this.http.get<any>('http://127.0.0.1:8090/api/collections/recurso_video/records')
      .subscribe(
        response => {
          console.log('Videos recuperados:', response);
          this.videos = response.items.filter((video: any) => video.materia_id === this.materiaId);
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

  private sanitizeUrls() {
    this.videos.forEach(video => {
      this.sanitizedUrls[video.id] = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });
  }

  getSafeUrl(id: string): SafeResourceUrl | undefined {
    return this.sanitizedUrls[id];
  }


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
