
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles:[`
    
.enter-container {
  border: 1px solid #dddddd;
  font-weight: bold;
  font-size: 20px;
}
.enter-animation {
  animation: slide-fade 1s;
}
@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`]
})
export class MetricCardComponent {
  icon = input.required<string>();
  title = input.required<string>();
  value = input.required<string>();
  trend = input.required<string>();
  trendDirection = input.required<'up' | 'down'>();
}
