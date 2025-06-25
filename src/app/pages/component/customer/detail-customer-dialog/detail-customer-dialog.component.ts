import { Component, inject, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Product, Title } from '../../../../core/service/model/customer.model';
import { TextareaModule } from 'primeng/textarea';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-detail-customer-dialog',
  imports: [
    InputTextModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    TextareaModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './detail-customer-dialog.component.html',
  styleUrl: './detail-customer-dialog.component.css',
  providers: [MessageService, ConfirmationService]
})
export class DetailCustomerDialogComponent {
  data!: Product;
  labelButton: string = '';
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required)
  });

  constructor(public ref: DynamicDialogRef,
    private dataDynamicDialog: DynamicDialogConfig,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.data = this.dataDynamicDialog.data.even;
    this.labelButton = this.dataDynamicDialog.data.page; 
    this.form.patchValue(this.data);
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'ยืนยันการ' + this.labelButton,
      rejectButtonProps: {
        label: 'ยกเลิก',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'ตกลง',
      },
      accept: () => {
        let data = this.form.value;
        this.ref.close(data);
      },
      reject: () => {
      },
    });
  }

  cancel() {
    this.ref.close(null);
  }
}
