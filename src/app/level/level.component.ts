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
  mostrarSecundaria: boolean = false;
  mostrarBachillerato: boolean = false;

  mostrarMaterias(nivel: string): void {
    this.mostrarPreescolar = false;
    this.mostrarPrimaria = false;

    switch (nivel) {
      case 'preescolar':
        this.mostrarPreescolar = true;
        break;
      case 'primaria':
        this.mostrarPrimaria = true;
        break;
      case 'secundaria':
        this.mostrarSecundaria = true;
        break;
      case 'bachillerato':
        this.mostrarBachillerato = true;
        break;
    }
  }

}
