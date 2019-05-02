import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { User } from './shared';
import { CloudMessageService } from './services/cloud-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;
  message: any;

  constructor(
    private swUpdate: SwUpdate,
  ) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((next) => {
        if (confirm('Nova versão disponível. Recarregar a página para receber?')) {
          window.location.reload();
        }
      });
    }
  }
}
