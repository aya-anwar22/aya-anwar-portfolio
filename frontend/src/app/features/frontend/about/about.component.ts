import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../services/about.service'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  about: any = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getFirstAbout().subscribe({
      next: (res) => {
        this.about = res.about?.[0] || null;
         console.log('About Data:', this.about);
      },
      error: (err) => {
        console.error('Error loading about section:', err);
      }
    });
  }
}
