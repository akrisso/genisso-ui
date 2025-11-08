import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BlockLoaderModalComponent } from '../_modals/block-loader-modal/block-loader-modal.component';

@Component({
  selector: 'app-block-loader-in-modal-example',
  imports: [
    MatButton
  ],
  templateUrl: './block-loader-in-modal-example.component.html',
  styleUrl: './block-loader-in-modal-example.component.scss'
})
export class BlockLoaderInModalExampleComponent {
  private dialog = inject(MatDialog);

  showDialog() {
    this.dialog.open(BlockLoaderModalComponent);
  }
}
