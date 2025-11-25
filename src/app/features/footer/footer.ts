import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  //imports: [],
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
