import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { CanvasComponent } from './canvas/canvas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent, SettingsComponent, CanvasComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'snake';
}
