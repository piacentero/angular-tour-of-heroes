import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';

@Component({
  selector: 'toh-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms: Subject<string> = new Subject();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this.heroSearchService.search(term) : of([])),
      map(heroes => heroes as Hero[])
    );
    // this.heroes = this.searchTerms
    //     .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    //     .distinctUntilChanged()   // ignore if next search term is same as previous
    //     .switchMap(term => term   // switch to new observable each time the term changes
    //         // return the http search observable
    //         ? this.heroSearchService.search(term)
    //         // or the observable of empty heroes if there was no search term
    //         : Observable.of<Hero[]>([]))
    //     .catch(error => {
    //       // TODO: add real error handling
    //       console.log(error);
    //       return Observable.of<Hero[]>([]);
    //     });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
