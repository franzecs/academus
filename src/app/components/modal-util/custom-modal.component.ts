import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['modal.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class CustomModal {

  @Input() id: string;
  public MessageIsVisible: boolean;

  showModal() {
    this.MessageIsVisible = true;
  }

  hideMsg() {
    this.MessageIsVisible = false;
  }
}
