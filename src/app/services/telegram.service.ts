import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { BackButton, MainButton } from '../shared/telegram-components-models/telegram-button.model';


@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private window: any;
  telegram: any;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    this.telegram = this.window.Telegram.WebApp;
  }

  get MainButton(): MainButton {
    return this.telegram.MainButton;
  }

  get BackButton(): BackButton {
    return this.telegram.BackButton;
  }

  sendData<T>(value: T): void {
    this.telegram.sendData(JSON.stringify(value));
  }

  ready(): void {
    this.telegram.ready();
  }

  close(): void {
    this.telegram.close();
  }
}
