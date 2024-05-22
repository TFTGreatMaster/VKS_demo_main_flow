import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulCardComponent } from './defaul-card.component';

describe('DefaulCardComponent', () => {
  let component: DefaulCardComponent;
  let fixture: ComponentFixture<DefaulCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaulCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaulCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
