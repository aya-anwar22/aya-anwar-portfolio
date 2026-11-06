import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent {

  // مسار الـ CV
  cvUrl: string = '/Aya_Anwar_CV.pdf';

  // الشهادات (Static Data) - تم تعديل المسارات بناءً على مجلد public
  certificates = [
    {
      title: 'ALX Software Engineering',
      issuer: 'ALX Africa',
      date: 'Nov 2024',
      description: '12-Month Programme with a specialization in Back-end.',
      imageUrl: '/alx.png',
    },
    {
      title: 'MEAN Stack Web Developer',
      issuer: 'NTI & Digital Egypt Youth',
      date: 'Jul 2025',
      description: '180 Technical Hours + 30 Freelancing Hours. Score: 100%.',
      imageUrl: '/nti.png',
    },
    {
      title: 'DevOps Engineer',
      issuer: 'Digital Egypt Pioneers (DEPI)',
      date: 'Nov 2025 - Jul 2026',
      description: 'Core learning outcomes in DevOps Engineering.',
      imageUrl: '/depi.jpg',
    }
  ];
}
