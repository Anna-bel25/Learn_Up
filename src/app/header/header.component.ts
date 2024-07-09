import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userInfo: { tipocuenta: string, username: string } | null = null;

  activeLinkIndex = 0;
  links = [
    { path: '/home', label: 'Inicio', active: true },
    { path: '/colecciones', label: 'Colecciones', active: false },
    { path: '/nivel', label: 'Categoria', active: false },
    { path: '/recursos', label: 'Recursos', active: false },
    { path: '/menu-subir', label: 'Subir Recursos', active: false },
    { path: '/privadasColecciones', label: 'Mis colecciones', active: false },
    { path: '/login', label: 'Usuario', active: false },

    // { path: '/menu-recurso', label: 'Contactanos', active: false },
  ];

  constructor(private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    this.getUserInfo();  // Llama al método para obtener la información del usuario
  }

  setActiveLink(index: number) {
    this.activeLinkIndex = index;
    this.links.forEach((link, i) => link.active = i === index);
  }

  isActiveLink(index: number): boolean {
    return this.activeLinkIndex === index;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  getUserInfo() {
    this.userInfo = this.apiService.getUserInfoFromToken();  // Obtiene la información del usuario del token
    console.log('UserInfo:', this.userInfo);  // Verifica en la consola
  }

  logout() {
    this.userInfo = null;
    this.apiService.logout();
    this.router.navigate(['/home']);  // Navega a la página de inicio o login después de cerrar sesión
  }
  //--------------------------------

}
