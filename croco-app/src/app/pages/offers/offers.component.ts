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
  // ------- WHEEL -------
  wheelNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  inputNumber = signal<number | null>(null);
  rotationAngle = signal(0);
  errorMessage = signal('');
  private currentRotation = 0; // track total rotation

spinWheel() {
  const value = this.inputNumber();
  const sectors = this.wheelNumbers.length;

  if (!value || value < 1 || value > sectors) {
    this.errorMessage.set(`Enter number between 1 and ${sectors}`);
    return;
  }

  this.errorMessage.set('');

  const sectorAngle = 360 / sectors;
  const index = value - 1;

  const extraSpins = 360; // 1 full spin clockwise

  // Reset wheel virtually to 1, then spin to chosen number
  const targetRotation = - (extraSpins + index * sectorAngle);

  // Apply rotation
  this.rotationAngle.set(targetRotation);
}











  // ------- LEADERBOARD -------
  leaderboard = signal<LeaderboardItem[]>(this.generateLeaderboard());
  filterWeek = signal<WeekType>('ALL');
  weekOptions: WeekType[] = ['I', 'II', 'III', 'IV', 'ALL'];

  generateLeaderboard(): LeaderboardItem[] {
    const weeks: Exclude<WeekType, 'ALL'>[] = ['I', 'II', 'III', 'IV'];
    const list: LeaderboardItem[] = [];

    weeks.forEach((w) => {
      for (let i = 1; i <= 10; i++) {
        list.push({
          customerId: Math.floor(Math.random() * 10000),
          loginName: `User${Math.floor(Math.random() * 1000)}`,
          place: i,
          week: w,
        });
      }
    });

    return list;
  }

  setFilter(week: WeekType) {
    this.filterWeek.set(week);
  }

  filteredLeaderboard() {
    const w = this.filterWeek();
    if (w === 'ALL') return this.leaderboard();
    return this.leaderboard().filter((item) => item.week === w);
  }
}
