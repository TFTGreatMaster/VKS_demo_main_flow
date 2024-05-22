import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVuAnComponent } from './detail-vu-an.component';

describe('DetailVuAnComponent', () => {
  let component: DetailVuAnComponent;
  let fixture: ComponentFixture<DetailVuAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailVuAnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailVuAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
