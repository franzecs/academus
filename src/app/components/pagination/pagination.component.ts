import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ikPagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  adjacente: number = 2;
  tpages

  @Input() page: number = 0;
  @Input() count: number = 2;
  @Input() pages: Array<number>;
  @Input() totalElements: number;

  @Output() _pageData: EventEmitter<{page: number, count: number}> = new EventEmitter<{page: number, count: number}>();
  
  constructor() { }

  ngOnInit() {
    this.page = this.page || 0;
    this.count = this.count || 2;
    this.tpages = this.pages

  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.paginar(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.paginar(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.paginar(this.page, this.count);
  }

  paginar(page: number, count: number){
    this._pageData.emit({page, count});
    //this.geralinks()
  }

  geralinks(){
    this.pages = [];
		let iniAdjacente = (this.page - this.adjacente <= 0) ? 1 : 
				(this.page - this.adjacente);
		let fimAdjacente = (this.page + this.adjacente >= this.tpages) ? 
				this.tpages : (this.page + this.adjacente);
		for (let i=iniAdjacente; i<=fimAdjacente; i++) {
			this.pages.push(i);
		}
  }

}
