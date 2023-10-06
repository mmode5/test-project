import { Component, Input } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() users: User[] | null = null;
}
