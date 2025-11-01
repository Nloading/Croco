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
  spinNumber = signal<number | null>(null);
  inputNumber = signal<number>(1);

  wheelNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  leaderboard = signal<LeaderboardItem[]>(this.generateLeaderboard());
  filterWeek = signal<WeekType>('ALL');

  weekOptions: WeekType[] = ['I','II','III','IV','ALL'];

  // Generate leaderboard with 10 items per week
  generateLeaderboard(): LeaderboardItem[] {
    const weeks: Exclude<WeekType, 'ALL'>[] = ['I','II','III','IV'];
    const items: LeaderboardItem[] = [];
    weeks.forEach(w => {
      for(let i=0; i<10; i++){
        items.push({
          customerId: Math.floor(Math.random()*1000),
          loginName: `User${Math.floor(Math.random()*1000)}`,
          place: i + 1,
          week: w
        });
      }
    });
    return items;
  }

  // Spin wheel to the input number
  spinWheel() {
    const n = this.inputNumber();
    if(n < 1 || n > 10){
      alert("აღნიშნული სექტორი ვერ მოიძებნა");
      return;
    }
    this.spinNumber.set(n);
  }

  // Filter leaderboard by week
  setFilter(week: WeekType) {
    this.filterWeek.set(week);
  }

  // Computed filtered leaderboard
  filteredLeaderboard() {
    const f = this.filterWeek();
    return this.leaderboard().filter(item => f === 'ALL' || item.week === f);
  }
}
