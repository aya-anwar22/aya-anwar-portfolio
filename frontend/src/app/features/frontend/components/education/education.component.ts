import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations: any[] = [];

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getAllEducations().subscribe({
      next: (res) => {
        this.educations = res.education || [];
      },
      error: (err) => {
        console.error('Error fetching education:', err);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).getFullYear().toString(); // 2025
  }
}
