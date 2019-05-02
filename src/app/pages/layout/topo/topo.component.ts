import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ ]
})
export class TopoComponent implements OnInit {

  showMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  controlNavMenu() {
    if (this.showMenu === false) {
      document.getElementById('sidenavMenu').style.width = '250px';
      this.showMenu = true;
      setTimeout(() => {
        document.getElementById('sidenavMenu').style.width = '0';
        this.showMenu = false;
      }, 3000);
    } else {
      document.getElementById('sidenavMenu').style.width = '0';
      this.showMenu = false;
    }
  }

  controlNavProfile() {
    if (this.showMenu === false) {
      document.getElementById('sidenavProfile').style.width = '250px';
      this.showMenu = true;
      setTimeout(() => {
        document.getElementById('sidenavProfile').style.width = '0';
        this.showMenu = false;
      }, 3000);
    } else {
      document.getElementById('sidenavProfile').style.width = '0';
      this.showMenu = false;
    }
  }
}
