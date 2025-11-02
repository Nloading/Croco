import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentDateTime: string = '';

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }
}
