import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'WE CAN BE HEROES';

  constructor() { }

  ngOnInit(): void {
  }

}
