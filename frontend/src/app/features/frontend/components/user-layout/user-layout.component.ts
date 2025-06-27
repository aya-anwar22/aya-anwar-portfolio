import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/componentsts/navbar/navbar.component';
import { HeaderComponent } from '../../shared/componentsts/header/header.component';
import { FooterComponent } from '../../shared/componentsts/footer/footer.component';

@Component({
  selector: 'app-user-layout',
  imports: [NavbarComponent, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
