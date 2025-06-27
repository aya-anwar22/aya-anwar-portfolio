import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-admin-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.scss'
})
export class AdminSkillsComponent implements OnInit {
  title = '';
  itemsText = '';
  allSkills: any[] = [];
  message = '';
  isEditing = false;
  editingId: string | null = null;

  constructor(private skillService: SkillsService) { }

  ngOnInit(): void {
    this.fetchSkills();
  }

  fetchSkills() {
    this.skillService.getAllSkills().subscribe({
      next: (res) => {
        this.allSkills = res.skills || [];
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      }
    });
  }

  submitForm() {
    if (!this.title || !this.itemsText) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const data = {
      title: this.title,
      items: this.itemsText.split(',').map(item => item.trim())
    };

    const obs = this.isEditing && this.editingId
      ? this.skillService.updateSkill(this.editingId, data)
      : this.skillService.createSkill(data);

    obs.subscribe({
      next: () => {
        this.message = this.isEditing ? 'Updated successfully!' : 'Created successfully!';
        this.resetForm();
        this.fetchSkills();
      },
      error: (err) => {
        console.error(err);
        this.message = this.isEditing ? 'Update failed.' : 'Create failed.';
      }
    });
  }

  editSkill(skill: any) {
    this.title = skill.title;
    this.itemsText = skill.items.join(', ');
    this.editingId = skill._id;
    this.isEditing = true;
  }

  deleteSkill(id: string) {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(id).subscribe({
        next: () => {
          this.message = 'Deleted successfully!';
          this.resetForm();
          this.fetchSkills();
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
    this.itemsText = '';
    this.editingId = null;
    this.isEditing = false;
  }
}

