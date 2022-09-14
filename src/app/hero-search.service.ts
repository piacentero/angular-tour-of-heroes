import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeroSearchService {

  constructor(private http: HttpClient) {
  }

  search(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`);
        // .map(response => response.json().data as Hero[]);
  }
}
