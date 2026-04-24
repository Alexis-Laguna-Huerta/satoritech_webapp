import { Component, signal, OnInit } from '@angular/core';
import { WelcomeForm } from './components/welcome-form/welcome-form';

export interface BrandConfig {
  logo: string;
  image: string;
  primaryColor: string;
  backgroundColor: string;
  welcomeText: string;
}

@Component({
  selector: 'app-root',
  imports: [WelcomeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('satoritech_webapp');

  public config = signal<BrandConfig | null>(null);

  async ngOnInit() {
    try {
      const configUrl = `/brand-config.json?t=${new Date().getTime()}`;
      const response = await fetch(configUrl);
      if (response.ok) {
        const data = await response.json();

        // Precargo la imagen para evitar parpadeos
        const img = new Image();
        img.src = data.image;

        await Promise.all([
          new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })
        ]);

        this.config.set(data);
      } else {
        console.warn('No se pudo cargar la configuración:', response.statusText);
      }
    } catch (error) {
      console.error('Error cargando brand-config.json', error);
    }
  }
}

