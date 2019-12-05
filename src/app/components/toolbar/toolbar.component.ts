import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {  

  constructor(public _authService: AuthService) {}

  ngOnInit() {
  }

  logout(): void{
    this._authService.logOut();
  }

}
