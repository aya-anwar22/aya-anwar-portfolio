import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.scss'
})


export class AdminContactComponent implements OnInit {
  allMessages: any[] = [];
  selectedMessageId: string | null = null;
  adminReply = '';
  message = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages() {
    this.contactService.getAllMessages().subscribe({
      next: (res: any) => {
        this.allMessages = res || [];
      },
      error: (err: any) => {
        console.error('Failed to fetch messages:', err);
      }
    });
  }

  selectMessage(messageId: string) {
    this.selectedMessageId = messageId;
    this.adminReply = '';
    this.message = '';
  }

  sendReply() {
    if (!this.selectedMessageId || !this.adminReply.trim()) {
      this.message = 'Please select a message and write a reply.';
      return;
    }

    const data = {
      messageId: this.selectedMessageId,
      adminReply: this.adminReply.trim()
    };

    this.contactService.replyToMessage(data).subscribe({
      next: () => {
        this.message = 'Reply sent successfully!';
        this.adminReply = '';
        this.selectedMessageId = null;
        this.fetchMessages(); 
      },
      error: (err: any) => {
        console.error('Failed to send reply:', err);
        this.message = 'Failed to send reply.';
      }
    });
  }
}

