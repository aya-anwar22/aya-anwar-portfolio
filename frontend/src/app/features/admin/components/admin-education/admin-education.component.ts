import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-admin-education',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.scss']
})
export class AdminEducationComponent implements OnInit {
  educationName = '';
  program = '';
  startDate = '';
  endDate = '';
  description = '';
  message = '';
  allEducations: any[] = [];
  isEditing = false;
  editingId: string | null = null;

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.fetchEducations();
  }

  fetchEducations() {
    this.educationService.getAllEducations().subscribe({
      next: (res) => {
        this.allEducations = res.education || [];
      },
      error: (err) => {
        console.error('Error fetching educations:', err);
      }
    });
  }

  submitForm() {
    if (!this.educationName || !this.program || !this.startDate || !this.endDate || !this.description) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const data = {
      educationName: this.educationName,
      program: this.program,
      startDate: this.startDate,
      endDate: this.endDate,
      description: this.description
    };

    const obs = this.isEditing && this.editingId
      ? this.educationService.updateEducation(this.editingId, data)
      : this.educationService.createEducation(data);

    obs.subscribe({
      next: () => {
        this.message = this.isEditing ? 'Updated successfully!' : 'Created successfully!';
        this.resetForm();
        this.fetchEducations();
      },
      error: (err) => {
        console.error(err);
        this.message = this.isEditing ? 'Update failed.' : 'Create failed.';
      }
    });
  }

  editEducation(edu: any) {
    this.educationName = edu.educationName || '';
    this.program = edu.program || '';
    this.startDate = edu.startDate?.slice(0, 10) || '';
    this.endDate = edu.endDate?.slice(0, 10) || '';
    this.description = edu.description || '';
    this.editingId = edu._id;
    this.isEditing = true;
  }

  deleteEducation(id: string) {
    if (confirm('Are you sure you want to delete this?')) {
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          this.message = 'Deleted successfully!';
          this.resetForm();
          this.fetchEducations();
        },
        error: (err) => {
          console.error(err);
          this.message = 'Delete failed.';
        }
      });
    }
  }

  resetForm() {
    this.educationName = '';
    this.program = '';
    this.startDate = '';
    this.endDate = '';
    this.description = '';
    this.isEditing = false;
    this.editingId = null;
  }
}
