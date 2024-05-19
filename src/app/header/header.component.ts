import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  activeLinkIndex = 0;
  links = [
    { path: '/home', label: 'Inicio', active: true },
    { path: '/colecciones', label: 'Colecciones', active: false },
    { path: '/nivel', label: 'Categoria', active: false },
    { path: '/recursos', label: 'Recursos', active: false },
    // { path: '/menu-recurso', label: 'Contactanos', active: false },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  setActiveLink(index: number) {
    this.activeLinkIndex = index;
    this.links.forEach((link, i) => link.active = i === index);
  }

  isActiveLink(index: number): boolean {
    return this.activeLinkIndex === index;
  }

}
