import { Component } from '@angular/core';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'authUI';

  constructor(private identityService: IdentityService) {

    this.identityService.getTest().subscribe(
      data => {
        console.log(data);
        this.title = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
