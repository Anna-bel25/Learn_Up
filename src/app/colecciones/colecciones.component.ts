import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../api.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-colecciones',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.css']
})
export class ColeccionesComponent implements OnInit {
  frmLista!: FormGroup;
  nombres: { nombre: string, selected: boolean }[] = [];

  constructor(private formBuilder: FormBuilder, private apiService:ApiService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.frmLista = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      privacidad: ['', [Validators.required]],
      nombres: this.formBuilder.array([]) 
    });
    this.obtenerNombresColecciones();
  }

  obtenerNombresColecciones(): void {
    this.apiService.obtenerColecciones().subscribe(
      (colecciones) => {
        this.nombres = colecciones;
        this.actualizarCheckboxes();
      },
      (error) => {
        console.error('Error al obtener los nombres de las colecciones:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.frmLista.valid) {
      const nombre = this.frmLista.get('nombre')?.value;
      const esPrivado = this.frmLista.get('privacidad')?.value === 'true'; 

      this.apiService.crearColeccion(nombre, esPrivado).subscribe(
        (response) => {
          console.log('Colección creada:', response);
          this.snackBar.open('Colección creada', 'Cerrar');
          this.obtenerNombresColecciones();
        },
        (error) => {
          console.error('Error al crear la colección:', error);
        }
      );
      this.frmLista.get('nombre')?.reset();

      this.actualizarCheckboxes();
    }
  }

  private actualizarCheckboxes(): void {
    const nombresArray = this.frmLista.get('nombres') as FormArray;
    nombresArray.clear();
    this.nombres.forEach(nombre => {
      nombresArray.push(this.formBuilder.control(false)); 
    });
  }

  get nombresArray(): FormArray {
    return this.frmLista.get('nombres') as FormArray;
  }

  getNombreControl(index: number): FormControl {
    return this.nombresArray.at(index) as FormControl;
  }
}
