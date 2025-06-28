import { Routes } from '@angular/router';

// user pages
import { HomeComponent } from './features/frontend/components/home/home.component';
import { AboutComponent } from './features/frontend/about/about.component';
import { SkillsComponent } from './features/frontend/skills/skills.component';
import { ProjectsComponent } from './features/frontend/components/projects/projects.component';
import { EducationComponent } from './features/frontend/components/education/education.component';

// admin pages
import { LayoutComponent } from './features/admin/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminAboutComponent } from './features/admin/components/admin-about/admin-about.component';
import { authGuard } from './guards/auth.guard';
import { AdminSkillsComponent } from './features/admin/components/admin-skills/admin-skills.component';
import { AdminProjectComponent } from './features/admin/components/admin-projects/admin-projects.component';
import { AdminEducationComponent } from './features/admin/components/admin-education/admin-education.component';
import { AdminContactComponent } from './features/admin/components/admin-contact/admin-contact.component';
import { ContactComponent } from './features/frontend/components/contact/contact.component';
import { UserLayoutComponent } from './features/frontend/components/user-layout/user-layout.component';
import { AdminDashboardComponent } from './features/admin/components/admin-dashboard/admin-dashboard.component';
import { LogoutComponent } from './features/auth/logout/logout.component';
// import { ContactComponent } from './features/frontend/contact/contact.component';

export const routes: Routes = [

  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'logout', component: LogoutComponent },

    ]
  },

  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },


      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'about', component: AdminAboutComponent },
      { path: 'skills', component: AdminSkillsComponent },
      { path: 'projects', component: AdminProjectComponent },
      { path: 'education', component: AdminEducationComponent },

      { path: 'contact', component: AdminContactComponent },
      {path: 'logout',component: LogoutComponent}

    ]
  }
];
