import { Component, signal } from '@angular/core';
import { WeekType } from '../offers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // always good to have
import { FormsModule } from '@angular/forms';

export interface LeaderboardItem {
  customerId: number;
  loginName: string;
  place: number;
  week: Exclude<WeekType, 'ALL'>;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true, // must be standalone for imports to work
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  leaderboard = signal<LeaderboardItem[]>(this.generateLeaderboard());
  filterWeek = signal<WeekType>('ALL');
  weekOptions: WeekType[] = ['I', 'II', 'III', 'IV', 'ALL'];

  constructor(private http: HttpClient) {} // now HttpClient can be injected

  generateLeaderboard(): LeaderboardItem[] {
    const weeks: Exclude<WeekType, 'ALL'>[] = ['I', 'II', 'III', 'IV'];
    const items: LeaderboardItem[] = [];
    weeks.forEach((w) => {
      for (let i = 0; i < 10; i++) {
        items.push({
          customerId: Math.floor(Math.random() * 1000),
          loginName: `User${Math.floor(Math.random() * 1000)}`,
          place: i + 1,
          week: w,
        });
      }
    });
    return items;
  }

  setFilter(week: WeekType) {
    this.filterWeek.set(week);
  }

  filteredLeaderboard() {
    const f = this.filterWeek();
    return this.leaderboard().filter((item) => f === 'ALL' || item.week === f);
  }
}
