import { Component, Input, NgModule, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wheel',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.css'
})
export class WheelComponent {
  @Input() numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  inputNumber = signal<number | null>(null);
  rotationAngle = signal(0);
  errorMessage = signal('');

  spinWheel() {
    const value = this.inputNumber();
    const sectors = this.numbers.length;

    if (!value || value < 1 || value > sectors) {
      this.errorMessage.set(`Enter number between 1 and ${sectors}`);
      return;
    }

    this.errorMessage.set('');

    const sectorAngle = 360 / sectors;
    const index = value - 1;
    const extraSpins = 360; // 1 full spin

    const targetRotation = -(extraSpins + index * sectorAngle);

    this.rotationAngle.set(targetRotation);
  }
}
