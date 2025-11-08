import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBlockLoaderExampleComponent } from './basic-block-loader-example.component';

describe('BasicBlockLoaderExampleComponent', () => {
  let component: BasicBlockLoaderExampleComponent;
  let fixture: ComponentFixture<BasicBlockLoaderExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicBlockLoaderExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicBlockLoaderExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
