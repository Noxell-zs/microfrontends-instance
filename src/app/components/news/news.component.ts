import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  data = 'shared'
}
