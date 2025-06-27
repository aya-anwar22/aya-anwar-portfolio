import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-admin-projects',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectComponent implements OnInit {
  title = '';
  description = '';
  techStack = '';
  githubLink = '';
  liveDemo = '';
  selectedFile: File | null = null;
  message = '';
  allProjects: any[] = [];
  isEditing = false;
  editingId: string | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.allProjects = res.project || [];
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    if (!this.title || !this.description || !this.techStack || !this.githubLink || !this.liveDemo) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('techStack', this.techStack);
    formData.append('githubLink', this.githubLink);
    formData.append('liveDemo', this.liveDemo);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const obs = this.isEditing && this.editingId
      ? this.projectService.updateProject(this.editingId, formData)
      : this.projectService.createProject(formData);

    obs.subscribe({
      next: () => {
        this.message = this.isEditing ? 'Updated successfully!' : 'Created successfully!';
        this.resetForm();
        this.fetchProjects();
      },
      error: (err) => {
        console.error(err);
        this.message = this.isEditing ? 'Update failed.' : 'Create failed.';
      }
    });
  }

  editProject(project: any) {
    this.title = project.title;
    this.description = project.description;
    this.techStack = project.techStack;
    this.githubLink = project.githubLink;
    this.liveDemo = project.liveDemo;
    this.selectedFile = null;
    this.editingId = project._id;
    this.isEditing = true;
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.message = 'Deleted successfully!';
          this.resetForm();
          this.fetchProjects();
        },
        error: (err) => {
          console.error(err);
          this.message = 'Delete failed.';
        }
      });
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.techStack = '';
    this.githubLink = '';
    this.liveDemo = '';
    this.selectedFile = null;
    this.editingId = null;
    this.isEditing = false;
  }
}
