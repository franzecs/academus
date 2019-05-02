import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ik-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 @Input() menus: OpcaoMenu[];

  ngOnInit() {
  }
}

export class OpcaoMenu {
  constructor(
    public titulo: string,
    public img: string,
    public button: string,
    public url: string
  ) {}
}

export class ItemMenu {
  constructor(
    public titulo: string,
    public url: string,
    public img: string) {}
}
