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
  
  constructor(private router: Router, private fb: FormBuilder) {
    this.FormularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        noSpecialCharactersValidator()
      ]],
      repeatpassword: ['', [Validators.required, Validators.minLength(8)]]
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

  onSubmit() {
    // Detén la ejecución si el formulario es inválido
    if (this.FormularioRegistro.valid) {
      // Procesar el formulario
      return;
  }
   // Procesa el formulario
   console.log('Formulario Enviado', this.FormularioRegistro.value);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /*---METODO PARA MOSTRAR OPCIONES DE "TIPO DE CUENTA------"*/ 
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
