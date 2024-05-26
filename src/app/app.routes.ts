import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LevelComponent } from './level/level.component';
import { ThemedComponent } from './themed/themed.component';
import { ResourceMenuComponent } from './resource-menu/resource-menu.component';
import { ResourceVideoComponent } from './resource-video/resource-video.component';
import { ResourceFullComponent } from './resource-full/resource-full.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes =
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'nivel', component: LevelComponent },
  { path: 'materia', component: ThemedComponent },
  { path: 'menu-recurso', component: ResourceMenuComponent },
  { path: 'video', component: ResourceVideoComponent },
  { path: 'recursos', component: ResourceFullComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Ruta para el menú de recursos con parámetros de nivel y materia
  //{ path: 'menu-recurso/:nivel/:materia', component: ResourceMenuComponent },
  // Ruta para el componente de video con parámetros de nivel, materia y ID de video
  //{ path: 'video/:nivel/:materiaId', component: ResourceVideoComponent },
  { path: '**', redirectTo: '/home' }

];

