import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-publicas-colecciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './publicas-colecciones.component.html',
  styleUrl: './publicas-colecciones.component.css'
})
export class PublicasColeccionesComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
