import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoaderModalComponent } from './block-loader-modal.component';

describe('BlockLoaderModalComponent', () => {
  let component: BlockLoaderModalComponent;
  let fixture: ComponentFixture<BlockLoaderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLoaderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockLoaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
