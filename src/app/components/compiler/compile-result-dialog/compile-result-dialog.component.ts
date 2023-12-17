import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CompileService } from '../../../services/compile.service';

@Component({
  selector: 'app-compile-result-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './compile-result-dialog.component.html',
})
export class CompileResultDialogComponent {
  get compileResult(): string {
    return this.compileService.compileUserCodeChanged.value;
  }

  constructor(private compileService: CompileService) { }
}
