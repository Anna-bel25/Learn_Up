import { Component, Input } from '@angular/core';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { OnInit } from '@angular/core';import { MateriaListModel, MateriaModel } from '../models/materia.model';
@Component({
  selector: 'app-themed',
  standalone: true,
  imports: [RouterModule, ResourceMenuComponent, CommonModule],
  templateUrl: './themed.component.html',
  styleUrl: './themed.component.css'
})

export class ThemedComponent implements OnInit {

  materiasPreescolar: any[] = [];
  materiasPrimaria: any[] = [];
  materiasSecundaria: any[] = [];
  materiasBachillerato: any[] = [];

  @Input() mostrarPreescolar: boolean = false;
  @Input() mostrarPrimaria: boolean = false;
  @Input() mostrarSecundaria: boolean = false;
  @Input() mostrarBachillerato: boolean = false;

  nivelSeleccionado: string = '';
  materiaSeleccionada: string = '';

  constructor(private http: HttpClient,  private router: Router) {}

  ngOnInit() {
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    this.http.get<MateriaModel[]>('https://apiresources-production-ba1f.up.railway.app/api/materias')
      .subscribe(response => {
        if (response && response.length > 0) {
          this.materiasPreescolar = response.filter(materia => materia.nivel_id === 1);
          this.materiasPrimaria = response.filter(materia => materia.nivel_id === 2);
          this.materiasSecundaria = response.filter(materia => materia.nivel_id === 3);
          this.materiasBachillerato = response.filter(materia => materia.nivel_id === 4);
        } else {
          console.error('La respuesta del servidor no contiene los datos esperados.');
        }
      }, error => {
        console.error('Error al obtener las materias:', error);
      });
  }


  //@Input() mostrarNiveles: { [key: string]: boolean } = {};

  irAMenuRecursos(materiaId: number) {
    this.router.navigate(['/menu-recurso', { materiaId: materiaId }]);
  }

  seleccionarNivelYmateria(nivel: string, materia: string) {
    this.nivelSeleccionado = nivel;
    this.materiaSeleccionada = materia;
  }

  //irAMenuRecursos(materiaId: number, nivelAcademico: string, materiaNombre: string) {
  //  this.router.navigate(['/menu-recurso', { materiaId: materiaId, nivelAcademico: nivelAcademico, materiaNombre: materiaNombre }]);
  //}


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
