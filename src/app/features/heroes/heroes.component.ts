import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '@shared/models/hero';
import { HeroService } from '@shared/services/hero.service';
import { BehaviorSubject, debounceTime, finalize, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'toh-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  selectedHero: Hero;
  lastIdHeroes: number;
  loadingHeroes: boolean = false;

  private refreshHeroes: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.heroes$ = this.refreshHeroes.asObservable().pipe(
      debounceTime(100),
      tap(() => this.loadingHeroes = true),
      switchMap(() => this.heroService.getHeroes().pipe(
        finalize(() => this.loadingHeroes = false)
      )),
      tap((heroes) => this.lastIdHeroes = heroes[heroes.length-1].id)
    );
    // this.loadingHeroes = true;
    // this.heroes$ = this.heroService
    //     .getHeroes().pipe(
    //       tap((heroes)=> {
    //         this.lastIdHeroes= heroes[heroes.length-1].id;
    //       }),
    //       finalize(()=> {
    //         this.loadingHeroes = false;
    //       })
    //     );
  }

  add(name: string, id: number): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name,id)
        .subscribe(hero => {
          // this.getHeroes();
          this.refreshHeroes.next();
          this.selectedHero = null;
        });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .subscribe(() => {
          // this.getHeroes();
          this.refreshHeroes.next();
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
