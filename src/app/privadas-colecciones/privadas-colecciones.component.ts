import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-privadas-colecciones',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './privadas-colecciones.component.html',
  styleUrl: './privadas-colecciones.component.css'
})
export class PrivadasColeccionesComponent implements OnInit{
  colecciones: any[] = [];
  recursos: any[] = [];
  selectedColeccion: any = null;
  mostrarContenido: boolean = false;

  imagenes:string[]= [
    'https://img.freepik.com/free-photo/stack-books-with-library-scene_91128-4327.jpg?t=st=1720659786~exp=1720663386~hmac=d483a68632c3699d38104c82479ec347ed0bb8cf30cb93b4d7aeb43d4893d9f7&w=900',
    'https://img.freepik.com/free-photo/school-stationery-around-notepad_23-2147843231.jpg?t=st=1720659909~exp=1720663509~hmac=293d8b49c32d3b8cc38499384404ce29ad39853e4815507e2c0af1f967b5fae1&w=740',
    'https://img.freepik.com/free-photo/multicolored-markers-painted-paper_23-2147843223.jpg?t=st=1720662729~exp=1720666329~hmac=28e29b72ba367a013933660435754ee7f22b3e3074d536d4f4b0fd24ebe525ec&w=740',
    'https://img.freepik.com/free-photo/pile-books-pencils-desk_1150-18055.jpg?t=st=1720662886~exp=1720666486~hmac=71e52fb1133c11f1ddfa1925496c643bad0356e316817b729e22c12ce6bfc245&w=740',
    'https://img.freepik.com/free-photo/book-laptop-pencil-clock-wooden-table-library-education-learning-concept_1150-16627.jpg?t=st=1720662904~exp=1720666504~hmac=fb9e4581a63b543ef34df370065987dae076562df3ee29b04851d03a8f4367e9&w=740',
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.obtenerColeccionesPrivadas().subscribe((data: any[]) => {
      this.colecciones = data;
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verRecursos(coleccion: any) {
    this.selectedColeccion = coleccion;
    this.apiService.obtenerRecursosDeColeccion(coleccion.coleccion_id).subscribe((data: any[]) => {
      this.recursos = data;
      this.mostrarContenido = true;
    });
  }

  toggleContenido() {
    this.mostrarContenido = !this.mostrarContenido;
  }

  getImagenUrl(coleccion: any): string {
    const index = this.colecciones.indexOf(coleccion) % this.imagenes.length;
    return this.imagenes[index];
  }
}
