import { Component, signal } from '@angular/core';
import { WelcomeForm } from './components/welcome-form/welcome-form';

@Component({
  selector: 'app-root',
  imports: [WelcomeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('satoritech_webapp');
}
