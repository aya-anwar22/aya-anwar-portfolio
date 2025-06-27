import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getAllSkills().subscribe({
      next: (res) => {
        this.skills = res.skills || [];
        console.log('Fetched Skills:', this.skills);
      },
      error: (err) => {
        console.error('Failed to load skills:', err);
      }
    });
  }
}
