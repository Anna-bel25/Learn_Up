import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LevelComponent } from './level/level.component';
import { ThemedComponent } from './themed/themed.component';
import { ResourceMenuComponent } from './resource-menu/resource-menu.component';
import { ResourceVideoComponent } from './resource-video/resource-video.component';
import { ResourceFullComponent } from './resource-full/resource-full.component';
import { ResouceActividadComponent } from './resouce-actividad/resouce-actividad.component';
import { ResouceLibroComponent } from './resouce-libro/resouce-libro.component';


export const routes: Routes =
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'nivel', component: LevelComponent },
  { path: 'materia', component: ThemedComponent },
  { path: 'menu-recurso', component: ResourceMenuComponent },
  { path: 'video', component: ResourceVideoComponent },
  { path: 'actividad', component: ResouceActividadComponent },
  { path: 'libro', component: ResouceLibroComponent },
  { path: 'recursos', component: ResourceFullComponent },
  
  { path: '**', redirectTo: '/home' }

];

