import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxItem } from './checkboxItem';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css']
})
export class CheckboxGroupComponent implements OnInit {

  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues = Array<string>();
  @Output() toggle = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {}

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(checkedOptions.map(x => x.value)); 
  }

}
