import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FormService } from '../../services/form/form.service';
import { EncryptionService } from '../../services/encryption/encryption.service';
import { BrandConfigService } from '../../services/config/brand-config.service';
import { CommonModule } from '@angular/common';

declare const window: any;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

@Component({
  selector: 'app-welcome-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './welcome-form.html',
  styleUrl: './welcome-form.css',
})
export class WelcomeForm {
  public brandConfig;

  constructor(
    private formService: FormService,
    private encryptionService: EncryptionService,
    public brandConfigService: BrandConfigService
  ) {
    this.brandConfig = this.brandConfigService.config;
  }

  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(15),
    Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  ]);

  isLoading = false;
  isRecording = false;
  recognition: any;
  assignedFolio: string | null = null; // Para mostrar el folio generado

  get nameLength(): number {
    return this.nameControl.value?.length || 0;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    if (value.length > 15) {
      value = value.substring(0, 15);
    }

    this.nameControl.setValue(value, { emitEvent: false });
  }

  toggleDictation() {
    if (this.isRecording) {
      this.recognition?.stop();
      this.isRecording = false;
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-MX';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isRecording = true;
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      let value = transcript.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      if (value.length > 15) {
        value = value.substring(0, 15);
      }

      this.nameControl.setValue(value);
      this.nameControl.markAsDirty();
      this.nameControl.markAsTouched();
    };

    this.recognition.onerror = (event: any) => {
      console.error("Error en dictado de voz: ", event.error);
      this.isRecording = false;
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };

    this.recognition.start();
  }

  async onSubmit() {
    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched();
      this.nameControl.markAsDirty();
      return;
    }

    this.isLoading = true;
    this.nameControl.disable();
    this.assignedFolio = null;

    try {
      const rawName = this.nameControl.value!;

      // Encriptamos el nombre antes de mandarlo
      const encryptedName = this.encryptionService.encryptData(rawName);

      const response = await this.formService.sendWelcomeForm(encryptedName);

      if (response && response.status === 200) {
        // Obtenemos el folio encriptado y lo desencriptamos
        const encryptedFolio = response.data?.folio;
        if (encryptedFolio) {
          this.assignedFolio = this.encryptionService.decryptData(encryptedFolio);
        }
      }
    } catch (error) {
      console.warn(error);
    } finally {
      this.isLoading = false;
      this.nameControl.enable();
    }
  }

  onReset() {
    this.assignedFolio = null;
    this.nameControl.reset();
  }
}
