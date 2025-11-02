import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  scrollTop() {
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
