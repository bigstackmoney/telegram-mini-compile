import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OutputCompileData } from '../shared/models/output-compile-data.model';
import { InputCompileData } from '../shared/models/input-compile-data.model';
import { AppApiLinks } from '../shared/app-api-links';

@Injectable({
  providedIn: 'root'
})
export class CompileService {
  compileUserCodeChanged: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  compileUserCode(body: InputCompileData): Observable<OutputCompileData> {
    return this.http.post<OutputCompileData>(AppApiLinks.compileCode, body).pipe(
      tap(response => this.compileUserCodeChanged.next(response.output))
    );
  }
}
