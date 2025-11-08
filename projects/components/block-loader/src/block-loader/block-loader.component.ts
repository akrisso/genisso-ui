import { booleanAttribute, ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'emr-block-loader',
  exportAs: 'emrBlockLoader',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './block-loader.component.html',
  styleUrl: './block-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'emr-block-loader',
    '[class.is-loading]': 'loading()'
  }
})
export class BlockLoaderComponent {
  readonly loading = input(false, {
    transform: booleanAttribute
  });
  readonly spinnerDiameter = input(48, {
    transform: numberAttribute
  });
  readonly spinnerStrokeWidth = input(4, {
    transform: numberAttribute
  });
}
