import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WheelComponent } from "./wheel/wheel.component";

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
  imports: [CommonModule, FormsModule, RouterLink, WheelComponent],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
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
          customerId: Math.floor(Math.random() * 100),
          loginName: `User${Math.floor(Math.random() * 100)}`,
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
