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
    if (this.FormularioLogin.invalid) {
      // Aquí no se necesita nada adicional ya que los errores serán manejados por el HTML con *ngIf
      return;
    }

    const formValue = this.FormularioLogin.value;
    this.apiService.postUsersLogin(formValue).subscribe(response => {
      if (response && response.token) {
        console.log('Usuario logueado exitosamente', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']); // Navega a la página de home tras el login exitoso
      }
    }, error => {
      console.error('Error iniciando sesión', error);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
  }
}
