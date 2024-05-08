import { Component, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemedComponent } from '../themed/themed.component';


@Component({
  selector: 'app-level',
  standalone: true,
  imports: [RouterLink, ThemedComponent ],
  templateUrl: './level.component.html',
  styleUrl: './level.component.css'
})

export class LevelComponent {
  mostrarPreescolar: boolean = false;
  mostrarPrimaria: boolean = false;

  mostrarMaterias(nivel: string): void {
    // Reiniciar la visibilidad de todos los niveles
    this.mostrarPreescolar = false;
    this.mostrarPrimaria = false;
    // Reiniciar la visibilidad de otros niveles si es necesario

    // Mostrar solo el nivel seleccionado
    switch (nivel) {
      case 'preescolar':
        this.mostrarPreescolar = true;
        break;
      case 'primaria':
        this.mostrarPrimaria = true;
        break;
      // Agregar casos para otros niveles si es necesario
    }
  }

}
