import { Component, OnInit } from '@angular/core';
import { Hero } from '@shared/models/hero';
import { HeroService } from '@shared/services/hero.service';


@Component({
  selector: 'toh-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    // this.heroService.getHeroes()
    //     .then(heroes => this.heroes = heroes.slice(1, 5));
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
