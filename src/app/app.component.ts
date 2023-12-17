import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TelegramService } from './services/telegram.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  constructor(private telegram: TelegramService) {
    this.telegram.ready();
  }

  ngOnDestroy(): void {
    this.telegram.close();
  }
}
