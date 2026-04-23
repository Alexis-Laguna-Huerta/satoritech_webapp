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
