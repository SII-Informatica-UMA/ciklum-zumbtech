import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRightPanelActive: boolean = false;

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
}
