import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss']
})
export class AdminAboutComponent implements OnInit {
  title: string = '';
  bio: string = '';
  selectedFile: File | null = null;
  message: string = '';
  firstAbout: any = null;
  isEditing: boolean = false;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.fetchFirstAbout();
  }

  fetchFirstAbout() {
    this.aboutService.getFirstAbout().subscribe({
      next: (res) => {
        this.firstAbout = res.about?.[0] || null;
      },
      error: (err) => {
        console.error('Error fetching about:', err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    console.log(`this.title ${this.title} || this.bio ${this.bio}`)
    if (!this.title || !this.bio) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('bio', this.bio);
    if (this.selectedFile) formData.append('photo', this.selectedFile);

    if (this.isEditing && this.firstAbout) {
      // update
      this.aboutService.updateAbout(this.firstAbout._id, formData).subscribe({
        next: () => {
          this.message = 'Updated successfully!';
          this.resetForm();
          this.fetchFirstAbout();
        },
        error: (err) => {
          console.error(err);
          this.message = 'Update failed.';
        }
      });
    } else {
      // create
      this.aboutService.createAbout(formData).subscribe({
        next: () => {
          this.message = 'Created successfully!';
          this.resetForm();
          this.fetchFirstAbout();
        },
        error: (err) => {
          console.error(err);
          this.message = 'Create failed.';
        }
      });
    }
  }

  editAbout() {
    if (this.firstAbout) {
      this.title = this.firstAbout.title;
      this.bio = this.firstAbout.bio;
      this.selectedFile = null;
      this.isEditing = true;
    }
  }

  deleteAbout() {
    if (this.firstAbout && confirm('Are you sure you want to delete this?')) {
      this.aboutService.deleteAbout(this.firstAbout._id).subscribe({
        next: () => {
          this.message = 'Deleted successfully!';
          this.resetForm();
          this.fetchFirstAbout();
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
    this.bio = '';
    this.selectedFile = null;
    this.isEditing = false;
  }
}
