import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

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

  get nameLength(): number {
    return this.nameControl.value?.length || 0;
  }

  onSubmit() {
    if (this.nameControl.invalid) return;

    this.isLoading = true;
    this.nameControl.disable();

    setTimeout(() => {
      console.log('Nombre ingresado:', this.nameControl.value);
      this.isLoading = false;
      this.nameControl.enable();
      // Reset after success if needed, or just leave it
    }, 3000);
  }
}
