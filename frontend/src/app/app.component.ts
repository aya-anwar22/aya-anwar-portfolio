import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './features/frontend/about/about.component';
import { SkillsComponent } from './features/frontend/skills/skills.component';
import { ProjectsComponent } from './features/frontend/components/projects/projects.component';
import { EducationComponent } from './features/frontend/components/education/education.component';
import { HeaderComponent } from './features/frontend/shared/componentsts/header/header.component';
import { FooterComponent } from './features/frontend/shared/componentsts/footer/footer.component';
import { NavbarComponent } from './features/frontend/shared/componentsts/navbar/navbar.component';
// import { ContactComponent } from './features/frontend/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aya-portfolio';
}
