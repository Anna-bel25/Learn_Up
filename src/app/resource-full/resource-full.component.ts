import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


interface LibrosResponse {
  reading_log_entries: {
    work: {
      title: string;
      author_names: string[];
      first_publish_year: number;
      cover_id?: number;
    };
    logged_date: string;
  }[];
}


interface Actividad {
  recurso_det_id: number;
  titulo: string;
  imagen_url: string;
  url: string;
  descripcion: string;
  materia_id: number;
  materia: string;
  nivel_id: string;
}



@Component({
  selector: 'app-resource-full',
  standalone: true,
  imports: [RouterLink, HomePageComponent, CommonModule],
  templateUrl: './resource-full.component.html',
  styleUrl: './resource-full.component.css'
})


export class ResourceFullComponent implements OnInit {

  //@Input() mostrarVideos: boolean = false;
  @Input() materiaId: number | undefined;
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;

  videos: any[] = [];
  libros: any[] = [];
  actividades: Actividad[] = [];

  videosPorPagina: number = 5;
  librosPorPagina: number = 5;
  actividadesPorPagina: number = 5;

  paginaActualVideos: number = 1;
  paginaActualLibros: number = 1;
  paginaActualActividades: number = 1;

  mostrarVideo = true;
  mostrarLibro = true;
  mostrarActividad = true;

  filtroActivo: string | null = null;

  mostrarTodo() {
    this.mostrarVideo = true;
    this.mostrarLibro = true;
    this.mostrarActividad = true;
    this.filtroActivo = null;
  }

  mostrarVideos() {
    this.mostrarVideo = true;
    this.mostrarLibro = false;
    this.mostrarActividad = false;
    this.filtroActivo = 'videos';
  }

  mostrarLibros() {
    this.mostrarVideo = false;
    this.mostrarLibro = true;
    this.mostrarActividad = false;
    this.filtroActivo = 'libros';
  }

  mostrarActividades() {
    this.mostrarVideo = false;
    this.mostrarLibro = false;
    this.mostrarActividad = true;
    this.filtroActivo = 'actividades';
  }



  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    
    this.mostrarVideos();

    this.http.get<any[]>('https://raw.githubusercontent.com/Anna-bel25/api_resource/main/recurso_video.json')
      .subscribe(
        videos => {
          console.log('Videos recuperados:', videos);
          this.videos = videos;
          this.sanitizeUrls();
          if (this.videos.length === 0) {
            console.log('No se encontraron videos.');
          }
        },
        error => {
          console.error('Error al recuperar los videos:', error);
        }
      );

      this.http.get<LibrosResponse>('https://openlibrary.org/people/mekBot/books/want-to-read.json')
      .subscribe(
        response => {
          console.log('Libros recuperados:', response);
          this.libros = response.reading_log_entries.map(entry => ({
            titulo: entry.work.title,
            autores: entry.work.author_names.join(', '),
            fecha_publicacion: entry.work.first_publish_year,
            fecha_registro: entry.logged_date,
            url_cubierta: entry.work.cover_id ? `https://covers.openlibrary.org/b/id/${entry.work.cover_id}-L.jpg` : null
          }));
          if (this.libros.length === 0) {
            console.log('No se encontraron libros.');
          }
        },
        error => {
          console.error('Error al recuperar los libros:', error);
        }
      );

      this.http.get<Actividad[]>('https://raw.githubusercontent.com/Anna-bel25/api_resource/main/recurso_actividad.json')
      .subscribe(
        actividades => {
          console.log('Actividades recuperadas:', actividades);
          this.actividades = actividades;
          this.actividades.forEach(actividad => {
            actividad.imagen_url = actividad.imagen_url;
          });

          if (this.actividades.length === 0) {
            console.log('No se encontraron actividades.');
          }
        },
        error => {
          console.error('Error al recuperar las actividades:', error);
        }
    );

  }

  sanitizeUrls(): void {
    this.videos.forEach(video => video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url));
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  paginaAnteriorVideos(): void {
    if (this.paginaActualVideos > 1) {
      this.paginaActualVideos--;
    }
  }

  paginaSiguienteVideos(): void {
    const numeroTotalPaginas = Math.ceil(this.videos.length / this.videosPorPagina);
    if (this.paginaActualVideos < numeroTotalPaginas) {
      this.paginaActualVideos++;
    }
  }

  get videosPaginados(): any[] {
    const inicio = (this.paginaActualVideos - 1) * this.videosPorPagina;
    return this.videos.slice(inicio, inicio + this.videosPorPagina);
  }

  get numeroTotalPaginasVideos(): number {
    return Math.ceil(this.videos.length / this.videosPorPagina);
  }

  paginaAnteriorLibros(): void {
    if (this.paginaActualLibros > 1) {
      this.paginaActualLibros--;
    }
  }

  paginaSiguienteLibros(): void {
    const numeroTotalPaginas = Math.ceil(this.libros.length / this.librosPorPagina);
    if (this.paginaActualLibros < numeroTotalPaginas) {
      this.paginaActualLibros++;
    }
  }

  get librosPaginados(): any[] {
    const inicio = (this.paginaActualLibros - 1) * this.librosPorPagina;
    return this.libros.slice(inicio, inicio + this.librosPorPagina);
  }

  get numeroTotalPaginasLibros(): number {
    return Math.ceil(this.libros.length / this.librosPorPagina);
  }

  paginaAnteriorActividades(): void {
    if (this.paginaActualActividades > 1) {
      this.paginaActualActividades--;
    }
  }

  paginaSiguienteActividades(): void {
    const numeroTotalPaginas = Math.ceil(this.actividades.length / this.actividadesPorPagina);
    if (this.paginaActualActividades < numeroTotalPaginas) {
      this.paginaActualActividades++;
    }
  }

  get actividadesPaginados(): Actividad[] {
    const inicio = (this.paginaActualActividades - 1) * this.actividadesPorPagina;
    return this.actividades.slice(inicio, inicio + this.actividadesPorPagina);
  }

  get numeroTotalPaginasActividades(): number {
    return Math.ceil(this.actividades.length / this.actividadesPorPagina);
  }



}
