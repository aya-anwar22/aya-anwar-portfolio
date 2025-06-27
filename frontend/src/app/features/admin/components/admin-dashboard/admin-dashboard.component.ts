import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ContactService } from '../../services/contact.service';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-admin-dashboard',
   standalone: true, // لو standalone فعلاً
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalViews = 12345; // ثابت مؤقتًا
  totalProjects = 0;
  totalMessages = 0;
  totalSkills = 0;
  recentMessages: any[] = [];

  constructor(
    private projectService: ProjectService,
    private contactService: ContactService,
    private skillsService: SkillsService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(res => {
      this.totalProjects = res.project.length;
            console.log('All messages from backend:', res.contact);
console.log('Recent 3 messages:', this.recentMessages);
    });

    this.contactService.getAllMessages().subscribe(res => {
    console.log("Response from backend:", res); // دي شكلها Array
    const allMessages = Array.isArray(res) ? res : res.contact || [];
    this.totalMessages = allMessages.length;
    this.recentMessages = allMessages.slice(-3).reverse(); // آخر ٣ رسايل
    console.log("Recent 3 messages:", this.recentMessages);
  });


    this.skillsService.getAllSkills().subscribe(res => {
      this.totalSkills = res.skill.length;
    });
  }
}
