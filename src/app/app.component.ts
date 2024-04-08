import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { CanvasComponent } from './canvas/canvas.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent, SettingsComponent, CanvasComponent, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'snake';
}
