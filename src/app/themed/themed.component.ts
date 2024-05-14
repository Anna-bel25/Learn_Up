import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResourceMenuComponent } from '../resource-menu/resource-menu.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-themed',
  standalone: true,
  imports: [RouterLink, ResourceMenuComponent, CommonModule],
  templateUrl: './themed.component.html',
  styleUrl: './themed.component.css'
})

export class ThemedComponent implements OnInit {
  materiasPreescolar: any[] = [];
  materiasPrimaria: any[] = [];
  materiasSecundaria: any[] = [];
  materiasBachillerato: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerMaterias();
  }

  obtenerMaterias() {
    this.http.get<any[]>('https://raw.githubusercontent.com/Anna-bel25/api_resource/main/materia_nivel.json')
      .subscribe(materias => {
        this.materiasPreescolar = materias.filter(materia => materia.nivel_id === 1);
        this.materiasPrimaria = materias.filter(materia => materia.nivel_id === 2);
        this.materiasSecundaria = materias.filter(materia => materia.nivel_id === 3);
        this.materiasBachillerato = materias.filter(materia => materia.nivel_id === 4);
      });
  }


  @Input() mostrarPreescolar: boolean = false;
  @Input() mostrarPrimaria: boolean = false;
  @Input() mostrarSecundaria: boolean = false;
  @Input() mostrarBachillerato: boolean = false;

  //@Input() mostrarNiveles: { [key: string]: boolean } = {};

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
