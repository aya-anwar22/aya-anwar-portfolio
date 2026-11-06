import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../services/about.service';

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
    console.log('🟡 [AboutComponent] ngOnInit بدأ');

    this.aboutService.getFirstAbout().subscribe({
      next: (res) => {
        // 1. اطبعي الاستجابة الكاملة عشان تشوفي شكلها
        console.log('🟢 [AboutComponent] Response كامل:', res);

        // 2. اطبعي نوع الاستجابة
        console.log('🟢 [AboutComponent] typeof res:', typeof res);
        console.log('🟢 [AboutComponent] res keys:', res ? Object.keys(res) : 'null/undefined');

        // 3. اطبعي الـ about جوه الـ res
        console.log('🟢 [AboutComponent] res.about:', res?.about);
        console.log('🟢 [AboutComponent] res.about نوعه:', Array.isArray(res?.about) ? 'Array' : typeof res?.about);

        // 4. اطبعي العنصر الأول
        console.log('🟢 [AboutComponent] res.about[0]:', res?.about?.[0]);

        // 5. الحل: خدي الداتا بأكتر من طريقة
        // لو res.about مصفوفة
        this.about = Array.isArray(res?.about) ? res.about[0] : (res?.about ?? null);

        // 6. اطبعي اللي اتخزن فعلاً
        console.log('✅ [AboutComponent] this.about النهائي:', this.about);

        // 7. اطبعيه كـ JSON عشان تشوفيه منظم
        console.log('✅ [AboutComponent] this.about (JSON):',
          JSON.stringify(this.about, null, 2)
        );
      },
      error: (err) => {
        console.error('🔴 [AboutComponent] Error:', err);
        console.error('🔴 [AboutComponent] Error message:', err?.message);
        console.error('🔴 [AboutComponent] Error status:', err?.status);
        console.error('🔴 [AboutComponent] Error error:', err?.error);
      },
      complete: () => {
        console.log('⚪ [AboutComponent] Observable اكتمل');
      }
    });
  }
}
