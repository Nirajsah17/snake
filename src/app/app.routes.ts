import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { CanvasComponent } from './canvas/canvas.component';
export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', component: CanvasComponent },
];
