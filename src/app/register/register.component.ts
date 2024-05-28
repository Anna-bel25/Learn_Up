import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MustMatch, noSpecialCharactersValidator } from './MustMatch';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FormularioRegistro: FormGroup;
  mostrar: boolean = false;
  checkboxError: boolean = false;
  
  constructor(private router: Router, private fb: FormBuilder) {
    this.FormularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        noSpecialCharactersValidator()
      ]],
      repeatpassword: ['', [Validators.required, Validators.minLength(8)]],
      termsCheckbox: [false, Validators.requiredTrue] // Agregamos el control del checkbox al formulario
    }, {
      validator: MustMatch('password', 'repeatpassword')
    });
  }
  // Agrega un getter para acceder fácilmente a los campos del formulario
  get f() { return this.FormularioRegistro.controls; }

  ngOnInit(): void {}

  get nombre() {
    return this.FormularioRegistro.get('nombre');
  }

  get correo() {
    return this.FormularioRegistro.get('correo');
  }

  get password() {
    return this.FormularioRegistro.get('password');
  }

  get repeatpassword() {
    return this.FormularioRegistro.get('repeatpassword');
  }
  /*------------- CHECKBOX ----------------*/  
  markAllFieldsAsTouched() {
    Object.keys(this.FormularioRegistro.controls).forEach(field => {
      const control = this.FormularioRegistro.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  onSubmit() {
    // Marcar todos los campos como tocados para mostrar los errores de validación
    //this.FormularioRegistro.markAllAsTouched();
    // Marcar todos los campos como tocados para mostrar los errores de validación
    this.markAllFieldsAsTouched();
  
    const checkbox = document.getElementById('termsCheckbox') as HTMLInputElement | null;
    if (checkbox && checkbox.checked) {
      this.checkboxError = false;
    } else {
      this.checkboxError = true;
      return;
    }
    // Detener la ejecución si el formulario es inválido
    if (this.FormularioRegistro.valid) {
      // Procesar el formulario
      console.log('Formulario Enviado', this.FormularioRegistro.value);
      return;
    } 
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /*---METODO PARA MOSTRAR OPCIONES DE "TIPO DE CUENTA"-------*/ 
  mostrarOpciones() {
    const opcionesElement = document.getElementById('opciones');
    const contenidoSelect = document.querySelector('#select .contenedor-tipocuenta');

    document.querySelectorAll('.opcion').forEach((opcion) => {
        opcion.addEventListener('click', (e) => {
            e.preventDefault();
            const textoOpcion = (e.currentTarget as HTMLElement).textContent;
            if (contenidoSelect) {
                const parrafo = contenidoSelect.querySelector('p');
                if (parrafo) {
                  parrafo.textContent = textoOpcion || "";
                  parrafo.classList.add('blanco');
                }
            }
        });
    });

    if (opcionesElement) {
        opcionesElement.classList.toggle('active');
    }
  }
}
