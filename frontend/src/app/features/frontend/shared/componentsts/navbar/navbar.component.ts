import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 👈 ضيفي ده

@Component({
  selector: 'app-navbar',
  standalone: true, // تأكدي إنها standalone
  imports: [RouterModule], // 👈 ضيفي RouterModule هنا
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
