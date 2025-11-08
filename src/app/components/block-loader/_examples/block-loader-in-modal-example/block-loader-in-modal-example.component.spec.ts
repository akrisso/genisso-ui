import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoaderInModalExampleComponent } from './block-loader-in-modal-example.component';

describe('BlockLoaderInModalExampleComponent', () => {
  let component: BlockLoaderInModalExampleComponent;
  let fixture: ComponentFixture<BlockLoaderInModalExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLoaderInModalExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockLoaderInModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
