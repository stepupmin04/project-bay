import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../service/model/customer.model';
@Component({
  selector: 'app-popup',
  imports: [ButtonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  data!: Product;

  constructor(public ref: DynamicDialogRef
  ) { }

  confirm() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }
}
