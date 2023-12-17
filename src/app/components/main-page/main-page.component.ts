import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TelegramService } from '../../services/telegram.service';
import { LanguageCompiler } from '../../shared/enums/language-compiler.enum';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, MatSelectModule, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  languageCompiler = LanguageCompiler.JavaScript;
  telegram = inject(TelegramService);

  constructor() { }
}
