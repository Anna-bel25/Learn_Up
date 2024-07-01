import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LibroModel } from '../models/lirbo.model';
import { RouterLink } from '@angular/router';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-resouce-libro',
  standalone: true,
  imports: [RouterLink, ResouceLibroComponent, ResourceMenuComponent, CommonModule, FormsModule],
  templateUrl: './resouce-libro.component.html',
  styleUrls: ['./resouce-libro.component.css']
})

export class ResouceLibroComponent implements OnInit {

  @Output() nivelLoaded: EventEmitter<string> = new EventEmitter<string>();
  @Input() mostrarLibros: boolean = false;
  @Input() materiaId: number | undefined;
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;

  libros: LibroModel[] = [];
  librosMostrados: LibroModel[] = [];
  librosPaginados: LibroModel[] = [];
  filtroBusqueda: string = '';
  sanitizedUrls: { [key: string]: SafeResourceUrl } = {};

  librosPorPagina: number = 5;
  paginaActualLibros: number = 1;

  constructor(private apiService: ApiService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchLibros();
  }

  fetchLibros(): void {
    this.apiService.getLibros().subscribe(
      (response: LibroModel[]) => {
        console.log('Response from API:', response);
        this.libros = response.filter(libro => libro.materia_id === this.materiaId);
        this.librosMostrados = this.libros;
        this.actualizarLibrosPaginados();
        if (this.libros.length === 0) {
          console.log('No se encontraron libros para este materia_id.');
        } else {
          const firstLibro = this.libros[0];
          this.nivel = firstLibro.nivel;
          this.materia = firstLibro.materia;
        }
      },
      error => {
        console.error('Error al recuperar los libros:', error.message);
      }
    );
  }

  isLocalImage(url: string): boolean {
    return url.startsWith('/uploads/libros/imagenes/');
  }

  isExternalImage(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  isPdf(url: string): boolean {
    return url.endsWith('.pdf');
  }

  getFullImageUrl(url: string): string {
    return this.isLocalImage(url) ? `http://localhost:3000${url}` : url;
  }

  getFullPdfUrl(url: string): string {
    return `http://localhost:3000${url}`;
  }

  scrollToTop(): void {
    //window.scrollTo({ top: 50, behavior: 'smooth' });
    const offset = 290;
    const halfWindowHeight = window.innerHeight / 2;
    const scrollToPosition = halfWindowHeight + offset;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
  }

  filtrarRecursos(): void {
    const filtro = this.filtroBusqueda.trim().toLowerCase();

    if (filtro === '') {
      this.restablecerRecursos();
    } else {
      this.librosMostrados = this.filtrarPorTituloYDescripcion(this.libros, filtro);
      this.actualizarLibrosPaginados();
    }

    this.paginaActualLibros = 1;
  }

  private filtrarPorTituloYDescripcion(recursos: any[], filtro: string): any[] {
    return recursos.filter(recurso => {
      const titulo = recurso.titulo ? recurso.titulo.toLowerCase() : '';
      const descripcion = recurso.descripcion ? recurso.descripcion.toLowerCase() : '';
      const autor = recurso.autor ? recurso.autor.toLowerCase() : '';
      return titulo.includes(filtro) || descripcion.includes(filtro) || autor.includes(filtro);
      //return titulo.includes(filtro) || autor.includes(filtro);
    });
  }

  private actualizarLibrosPaginados() {
    const startIndex = (this.paginaActualLibros - 1) * this.librosPorPagina;
    this.librosPaginados = this.librosMostrados.slice(startIndex, startIndex + this.librosPorPagina);
  }

  get numeroTotalPaginasLibros(): number {
    return Math.ceil(this.librosMostrados.length / this.librosPorPagina);
  }

  paginaAnteriorLibros() {
    if (this.paginaActualLibros > 1) {
      this.paginaActualLibros--;
      this.actualizarLibrosPaginados();
    }
  }

  paginaSiguienteLibros() {
    if (this.paginaActualLibros * this.librosPorPagina < this.librosMostrados.length) {
      this.paginaActualLibros++;
      this.actualizarLibrosPaginados();
    }
  }

  restablecerRecursos(): void {
    this.librosMostrados = this.libros.slice();
    this.actualizarLibrosPaginados();
  }

}
