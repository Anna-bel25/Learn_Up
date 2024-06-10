import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadModel } from '../models/actividad.model';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ColeccionesComponent } from '../colecciones/colecciones.component';


@Component({
  selector: 'app-resource-actividad',
  standalone: true,
  imports: [RouterLink, CommonModule, ResourceActividadComponent, ResourceMenuComponent, FormsModule,MatDialogModule] ,
  templateUrl: './resource-actividad.component.html',
  styleUrl: './resource-actividad.component.css'
})
export class ResourceActividadComponent implements OnInit {

  @Output() nivelLoaded: EventEmitter<string> = new EventEmitter<string>();
  @Input() mostrarActividades: boolean = false;
  @Input() materiaId: number | undefined;
  @Input() nivel: string | undefined;
  @Input() materia: string | undefined;

  actividades: ActividadModel[] = [];
  actividadesMostradas: ActividadModel[] = [];
  actividadesPaginadas: ActividadModel[] = [];
  filtroBusqueda: string = '';

  actividadesPorPagina: number = 5;
  paginaActualActividades: number = 1;

  constructor(private apiService: ApiService, private http: HttpClient,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchActividades();
  }

  fetchActividades(): void {
    this.apiService.getActividades().subscribe(
      (response: ActividadModel[]) => {
        console.log('Response from API:', response);
        this.actividades = response.filter(actividad => actividad.materia_id === this.materiaId);
        this.actividadesMostradas = this.actividades;
        this.actualizarActividadesPaginadas();
        if (this.actividades.length === 0) {
          console.log('No se encontraron actividades para este materia_id.');
        } else {
          const firstActividad = this.actividades[0];
          this.nivel = firstActividad.nivel;
          this.materia = firstActividad.materia;
        }
      },
      error => {
        console.error('Error al recuperar las actividades:', error.message);
      }
    );
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
      this.actividadesMostradas = this.filtrarPorTituloYDescripcion(this.actividades, filtro);
      this.actualizarActividadesPaginadas();
    }

    this.paginaActualActividades = 1;
  }

  private filtrarPorTituloYDescripcion(recursos: any[], filtro: string): any[] {
    return recursos.filter(recurso => {
      const titulo = recurso.titulo ? recurso.titulo.toLowerCase() : '';
      const descripcion = recurso.descripcion ? recurso.descripcion.toLowerCase() : '';
      return titulo.includes(filtro) || descripcion.includes(filtro);
    });
  }

  private actualizarActividadesPaginadas() {
    const startIndex = (this.paginaActualActividades - 1) * this.actividadesPorPagina;
    this.actividadesPaginadas = this.actividadesMostradas.slice(startIndex, startIndex + this.actividadesPorPagina);
  }

  get numeroTotalPaginasActividades(): number {
    return Math.ceil(this.actividadesMostradas.length / this.actividadesPorPagina);
  }

  paginaAnteriorActividades() {
    if (this.paginaActualActividades > 1) {
      this.paginaActualActividades--;
      this.actualizarActividadesPaginadas();
    }
  }

  paginaSiguienteActividades() {
    if (this.paginaActualActividades * this.actividadesPorPagina < this.actividadesMostradas.length) {
      this.paginaActualActividades++;
      this.actualizarActividadesPaginadas();
    }
  }

  restablecerRecursos(): void {
    this.actividadesMostradas = this.actividades.slice();
    this.actualizarActividadesPaginadas();
  }

  openDialog(event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ColeccionesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
