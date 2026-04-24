import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface BrandConfig {
  logoUrl: string;
  greetingImageUrl: string;
  primaryColor: string;
  backgroundColor: string;
  welcomeText: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandConfigService {
  private defaultConfig: BrandConfig = {
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/alistel-temp.appspot.com/o/image%20-%202026-04-23T173359.813.png?alt=media&token=2dd138bc-5994-41cb-9d84-66a757b5ab38',
    greetingImageUrl: 'https://firebasestorage.googleapis.com/v0/b/alistel-temp.appspot.com/o/saludo.gif?alt=media&token=74b423a7-a63b-4d33-af7a-b5631d95f335',
    primaryColor: '#ff5041',
    backgroundColor: '#1c1c1c',
    welcomeText: '¡Te damos la bienvenida a Préstamo Elektra!'
  };

  config = signal<BrandConfig>(this.defaultConfig);

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private async loadConfig() {
    try {
      const configUrl = `assets/brand-config.json?t=${new Date().getTime()}`;
      const data = await lastValueFrom(this.http.get<BrandConfig>(configUrl));
      if (data) {
        this.config.set(data);
      }
    } catch (error) {
      console.error('Error cargando brand-config.json, usando valores por defecto', error);
    }
  }
}
