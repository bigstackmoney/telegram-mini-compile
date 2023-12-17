interface TelegramButton {
    show(): void;
    hide(): void;
    isVisible: boolean;
    onClick(fn: Function): void;
    offClick(fn: Function): void;
}

export interface BackButton extends TelegramButton { }

export interface MainButton extends TelegramButton {
    text: string;
    textColor: string;
    color: string;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    enable(): void;
    disable(): void;
}