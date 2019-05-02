import { ViewChild } from '@angular/core';
import { ModalMessage, AlertTypes } from 'src/app/components';



export abstract class PageList {

  @ViewChild(ModalMessage) modal: ModalMessage;
  page = 0;
  count = 5;
  counts: number[] = [2, 5, 10, 20, 50];
  pages: Array<number>;
  totalElements: number;
  search = '';
  // Paginação Realtime Database to Firebase //
  numberItems = 5;
  starKey = 0;
  nextKey: any;
  prevKeys: any[] = [];

  constructor() { }

  pagination(event) {
    this.page = event.page;
    this.count = event.count;
    this.getList(event.page, event.count);
  }

  openModal(msg, type) {
    this.modal.showAlert(msg, type);
  }

  getList(page, count) { }
}
