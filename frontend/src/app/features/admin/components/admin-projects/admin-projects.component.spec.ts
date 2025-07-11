import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectComponent } from './admin-projects.component';

describe('AdminProjectComponent', () => {
  let component: AdminProjectComponent;
  let fixture: ComponentFixture<AdminProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
