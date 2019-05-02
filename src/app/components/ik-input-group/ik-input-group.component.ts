import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ik-input-group',
  templateUrl: './ik-input-group.component.html',
  styleUrls: ['./ik-input-group.component.css']
})
export class IkInputGroupComponent implements OnInit {

  @Input() label: string;
  @Input() size: number;

  constructor() { }

  ngOnInit() {
  }

}
