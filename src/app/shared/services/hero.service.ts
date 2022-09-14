import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '@shared/models/hero';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }


  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.heroesUrl}/${id}`, { headers: this.headers}).pipe(
          catchError(error => {
            return this.handleError(error);
          })
        );
  }

  create(name: string, id:number): Observable<Hero> {
      return this.http.post<Hero>(`${this.heroesUrl}`, {name , id }, { headers: this.headers}).pipe(
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, { headers: this.headers}).pipe(
          catchError(error => {
            return this.handleError(error)
          })
        );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); // for demo purposes only
    return throwError(() => error);
  }
}

