import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page001Component } from './page-001.component';

describe('Page001Component', () => {
  let component: Page001Component;
  let fixture: ComponentFixture<Page001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
