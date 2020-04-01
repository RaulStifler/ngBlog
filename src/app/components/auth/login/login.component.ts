import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {}

  onLogin(user: User){
    this._authService.loginByEmail(user)
    .then(res => {
      this._router.navigate(['/']);
    })
    .catch(err => console.log('Error', err)
    )
  }
}
