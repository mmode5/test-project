import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserApiService } from '../service/user-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  users$: Observable<User[]> = this.api.getUsers();
  constructor(private api: UserApiService) {}
}
