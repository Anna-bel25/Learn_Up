import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LevelComponent } from './level/level.component';
import { ThemedComponent } from './themed/themed.component';
import { ResourceMenuComponent } from './resource-menu/resource-menu.component';
import { ResourceVideoComponent } from './resource-video/resource-video.component';
import { ResouceLibroComponent } from './resouce-libro/resouce-libro.component';
import { ResourceActividadComponent } from './resource-actividad/resource-actividad.component';
import { ResourceFullComponent } from './resource-full/resource-full.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicasColeccionesComponent } from './publicas-colecciones/publicas-colecciones.component';
import { PrivadasColeccionesComponent } from './privadas-colecciones/privadas-colecciones.component';
import { HttpClientModule } from '@angular/common/http';
//import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    //routes,

    //GENERAL COMPONENTS
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PublicasColeccionesComponent,
    PrivadasColeccionesComponent,

    //MODULO NIVEL & TEMA
    LevelComponent,
    ThemedComponent,
    ResourceMenuComponent,
    ResourceVideoComponent,
    ResourceActividadComponent,
    ResouceLibroComponent,
    ResourceFullComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'LearnUp';
}
