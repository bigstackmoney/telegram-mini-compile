import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import * as ace from 'ace-builds';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop'
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { LanguageCompiler } from '../../shared/enums/language-compiler.enum';
import { CompileService } from '../../services/compile.service';
import { InputCompileData } from '../../shared/models/input-compile-data.model';

@Component({
  selector: 'app-compiler',
  standalone: true,
  imports: [],
  templateUrl: './compiler.component.html',
})
export class CompilerComponent implements AfterViewInit, OnInit, OnDestroy {
  languageCompiler: LanguageCompiler;
  startCompile = false;
  telegram = inject(TelegramService);
  userCode = signal('');

  unsubscribe$: Subject<void> = new Subject();

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private compileService: CompileService) {
    this.getQueryParams();
    this.initializeTelegramData();
  }

  ngOnInit(): void {
    toObservable(this.userCode).pipe(debounceTime(300), takeUntil(this.unsubscribe$)).subscribe(res => {
      if (this.startCompile) {
        this.toogleShowHideButton(res);
      }
    });
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    aceEditor.setTheme("ace/theme/twilight");
    this.setCompileMode(aceEditor);

    aceEditor.on("change", () => {
      this.userCode.set(aceEditor.getValue());
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  executeCode(): void {
    let inputCompileData: InputCompileData;

    inputCompileData.language = this.getLanguage();
    inputCompileData.script = this.userCode();

    this.compileService.compileUserCode(inputCompileData).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.startCompile = true);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  private sendData(): void {
    this.telegram.sendData(this.userCode);
  }

  private getQueryParams(): void {
    this.languageCompiler = +this.activatedRoute.snapshot.queryParams.languageCompiler;
  }

  private initializeTelegramData(): void {
    this.sendData = this.sendData.bind(this);
    this.goBack = this.goBack.bind(this);
    this.telegram.MainButton.setText('SAVE CODE');
    this.telegram.MainButton.hide();
    this.telegram.MainButton.onClick(this.sendData);
    this.telegram.BackButton.onClick(this.goBack);
  }

  private setCompileMode(aceEditor: ace.Ace.Editor): void {
    switch (this.languageCompiler) {
      case LanguageCompiler.JavaScript:
        aceEditor.session.setMode("ace/mode/js");
        break;

      case LanguageCompiler.CSharp:
        aceEditor.session.setMode("ace/mode/csharp");
        break;

      default:
        aceEditor.session.setMode("ace/mode/js");
        break;
    }
  }

  private getLanguage(): string {
    let language = '';

    switch (this.languageCompiler) {
      case LanguageCompiler.JavaScript:
        language = 'javascript';
        break;

      case LanguageCompiler.CSharp:
        language = 'csharp'
        break;

      default:
        language = 'javascript';
        break;
    }

    return language;
  }

  private toogleShowHideButton(value: string): void {
    value !== '' ? this.telegram.MainButton.show() : this.telegram.MainButton.hide();
  }
}
