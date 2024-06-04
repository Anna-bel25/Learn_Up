import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  FormularioLogin: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {
    this.FormularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.FormularioLogin.controls; }

  onSubmit() {
    if (this.FormularioLogin.valid) {
      const formValue = this.FormularioLogin.value;
      console.log('Inicio exitoso', formValue);

      this.apiService.postUsersLogin(formValue).subscribe(response => {
        console.log('Usuario logueado exitosamente', response);
        this.router.navigate(['/home']); // Navega a la página de home tras el login exitoso
      }, error => {
        console.error('Error iniciando sesión', error);
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
  }
}
