import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  feedback: string = '';

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    if (!this.name || !this.email || !this.subject || !this.message) {
      this.feedback = 'Please fill in all fields.';
      return;
    }

    const data = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.contactService.sendMessage(data).subscribe({
      next: () => {
        this.feedback = 'Message sent successfully!';
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      error: (err) => {
        console.error(err);
        this.feedback = 'Failed to send message.';
      }
    });
  }
}
