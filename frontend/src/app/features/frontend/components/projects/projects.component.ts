import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // مهم عشان routerLink
import { ProjectService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule], // ضفنا RouterModule
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  displayedProjects: any[] = []; // المشاريع اللي هتتعرض
  hasMoreProjects: boolean = false; // هل فيه مشاريع أكتر من 6؟
  maxDisplay: number = 6; // الحد الأقصى للعرض

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res.project || [];

        // عرض أول 6 مشاريع بس
        this.displayedProjects = this.projects.slice(0, this.maxDisplay);

        // لو عدد المشاريع أكبر من 6، نظهر الزرار
        this.hasMoreProjects = this.projects.length > this.maxDisplay;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }
}
