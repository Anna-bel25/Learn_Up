import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FormularioRegistro: FormGroup;
  
  constructor(private router: Router, private fb: FormBuilder) {
    this.FormularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  get nombre() {
    return this.FormularioRegistro.get('nombre')!;
  }

  get correo() {
    return this.FormularioRegistro.get('correo')!;
  }

  get password() {
    return this.FormularioRegistro.get('password')!;
  }

  get repeatpassword() {
    return this.FormularioRegistro.get('repeatpassword')!;
  }

  onSubmit() {
    if (this.FormularioRegistro.valid) {
      // Procesar el formulario
      console.log(this.FormularioRegistro.value);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
