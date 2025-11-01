import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type WeekType = 'I' | 'II' | 'III' | 'IV' | 'ALL';

export interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: Exclude<WeekType, 'ALL'>;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  // ====== Wheel ======
  wheelNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
  inputNumber = signal<number | null>(null);
  rotationAngle = signal<number>(0);
  currentRotation = 0;
  errorMessage = signal<string>('');

  // ====== Leaderboard ======
  leaderboard = signal<LeaderboardItem[]>(this.generateLeaderboard());
  filterWeek = signal<WeekType>('ALL');
  weekOptions: WeekType[] = ['I', 'II', 'III', 'IV', 'ALL'];

  // ====== Generate random leaderboard ======
  generateLeaderboard(): LeaderboardItem[] {
    const weeks: Exclude<WeekType, 'ALL'>[] = ['I', 'II', 'III', 'IV'];
    const data: LeaderboardItem[] = [];

    weeks.forEach((w) => {
      for (let i = 1; i <= 10; i++) {
        data.push({
          customerId: Math.floor(Math.random() * 1000),
          loginName: `User${Math.floor(Math.random() * 1000)}`,
          place: i,
          week: w,
        });
      }
    });

    return data;
  }

  // ====== Filter Leaderboard ======
  setFilter(week: WeekType) {
    this.filterWeek.set(week);
  }

  filteredLeaderboard() {
    const selected = this.filterWeek();
    if (selected === 'ALL') return this.leaderboard();
    return this.leaderboard().filter((item) => item.week === selected);
  }

  // ====== Spin Wheel ======
  spinWheel() {
    const n = this.inputNumber();
    if (!n || n < 1 || n > 10) {
      this.errorMessage.set('Invalid sector number (1-10)');
      return;
    }

    this.errorMessage.set('');
    const sectorAngle = 360 / 10;
    const randomSpins = 5 * 360;
    const targetAngle = (10 - n + 1) * sectorAngle; // reverse for alignment
    this.currentRotation += randomSpins + targetAngle;
    this.rotationAngle.set(this.currentRotation);
  }
}