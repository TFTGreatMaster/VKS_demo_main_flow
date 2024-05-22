import {Component} from '@angular/core';
import {ImageModule} from 'primeng/image'
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [ImageModule, DialogModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  displayVideoDialog: boolean = false;
  videoUrl: string = 'https://www.youtube.com/watch?v=OCwXj8jEFYw&list=PLUDwpEzHYYLtQzEEEldbjPAR-gnStv4sR&index=5';

  showVideoDialog() {
    this.displayVideoDialog = true;
  }
}
