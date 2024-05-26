import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LevelComponent } from './level/level.component';
import { ThemedComponent } from './themed/themed.component';
import { ResourceMenuComponent } from './resource-menu/resource-menu.component';
import { ResourceVideoComponent } from './resource-video/resource-video.component';
import { ResouceLibroComponent } from './resouce-libro/resouce-libro.component';
import { ResourceActividadComponent } from './resource-actividad/resource-actividad.component';
import { ResourceFullComponent } from './resource-full/resource-full.component';


export const routes: Routes =
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'nivel', component: LevelComponent },
  { path: 'materia', component: ThemedComponent },
  { path: 'menu-recurso', component: ResourceMenuComponent },
  { path: 'video', component: ResourceVideoComponent },
  { path: 'actividad', component: ResourceActividadComponent },
  { path: 'libro', component: ResouceLibroComponent },
  { path: 'recursos', component: ResourceFullComponent },

  { path: '**', redirectTo: '/home' }

];

