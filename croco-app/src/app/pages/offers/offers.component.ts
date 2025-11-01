import { Component, signal } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  // ---- signals ----
  leaderboard = signal<LeaderboardItem[]>(this.generateLeaderboard());
  filterWeek = signal<WeekType>('ALL');
  weekOptions: WeekType[] = ['I', 'II', 'III', 'IV', 'ALL'];

  // ---- wheel data ----
  spinNumber = signal<number | null>(null);
  inputNumber = signal<number>(1);
  wheelNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  // ======== GENERATE LEADERBOARD ========
  generateLeaderboard(): LeaderboardItem[] {
    const weeks: Exclude<WeekType, 'ALL'>[] = ['I', 'II', 'III', 'IV'];
    const data: LeaderboardItem[] = [];

    // თითო კვირაზე მინიმუმ 10 ობიექტი
    weeks.forEach((w) => {
      for (let i = 1; i <= 10; i++) {
        data.push({
          customerId: Math.floor(Math.random() * 10) + 1, // ✅ რეალური userId 1–10
          loginName: `User${Math.floor(Math.random() * 1000)}`,
          place: i,
          week: w
        });
      }
    });

    return data;
  }

  // ======== FILTER BY WEEK ========
  setFilter(week: WeekType) {
    this.filterWeek.set(week);
  }

  filteredLeaderboard() {
    const selected = this.filterWeek();
    if (selected === 'ALL') return this.leaderboard();
    return this.leaderboard().filter(item => item.week === selected);
  }

  // ======== SPIN WHEEL ========
  spinWheel() {
    const n = this.inputNumber();
    if (n < 1 || n > 10) {
      alert('აღნიშნული სექტორი ვერ მოიძებნა');
      return;
    }
    this.spinNumber.set(n);
  }
}