import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '@shared/models/hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: HttpClient) {
  }

  search(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`);
        // .map(response => response.json().data as Hero[]);
  }
}
