import { Component } from '@angular/core';
import { PageComponent } from '@meta/page/page.component';
import { PageContentDirective } from '@meta/page/page-content.directive';
import { PageTitleDirective } from '@meta/page/page-title.directive';
import { PlaygroundComponent } from '@meta/playground/playground.component';
import {
  BasicBlockLoaderExampleComponent
} from '../_examples/basic-block-loader-example/basic-block-loader-example.component';
import {
  BlockLoaderInModalExampleComponent
} from '../_examples/block-loader-in-modal-example/block-loader-in-modal-example.component';

@Component({
  imports: [
    PageComponent,
    PageContentDirective,
    PageTitleDirective,
    PlaygroundComponent,
    BasicBlockLoaderExampleComponent,
    BlockLoaderInModalExampleComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
