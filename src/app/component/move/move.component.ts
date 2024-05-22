import {Component} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-move',
  standalone: true,
  imports: [DialogModule, ButtonModule, TableModule],
  templateUrl: './move.component.html',
  styleUrl: './move.component.scss'
})
export class MoveComponent {
  products: { name: string }[] = [
    {
      name: 'Cường'
    }
  ]
  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}
