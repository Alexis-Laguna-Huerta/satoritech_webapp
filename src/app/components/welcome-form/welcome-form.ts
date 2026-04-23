import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

declare const window: any;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

@Component({
  selector: 'app-welcome-form',
  imports: [ReactiveFormsModule],
  templateUrl: './welcome-form.html',
  styleUrl: './welcome-form.css',
})
export class WelcomeForm {
  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(15),
    Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  ]);

  isLoading = false;
  isRecording = false;
  recognition: any;

  get nameLength(): number {
    return this.nameControl.value?.length || 0;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Regex allows only letters and spaces
    let value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    // Limit to 15 characters
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

      // Aplicar misma lógica de filtrado
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

  onSubmit() {
    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched();
      this.nameControl.markAsDirty();
      return;
    }

    this.isLoading = true;
    this.nameControl.disable();

    setTimeout(() => {
      console.log('Nombre ingresado:', this.nameControl.value);
      this.isLoading = false;
      this.nameControl.enable();
      this.nameControl.reset();
    }, 3000);
  }
}
