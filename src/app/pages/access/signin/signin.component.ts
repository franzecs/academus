import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@Angular/forms';

import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';
import { ModalMessage } from 'src/app/components';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild(ModalMessage) modal: ModalMessage;
  signinForm: FormGroup;
  message: string;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.modal.showLoading();
    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.router.navigate(['/']);
        }
        this.modal.dismiss();
      }).catch((error: any) => {
        this.message = error;
        this.modal.dismiss();
      });
  }
}
