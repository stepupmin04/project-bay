import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '../../../core/service/model/customer.model';
import { ButtonModule } from 'primeng/button';
import { DetailCustomerDialogComponent } from './detail-customer-dialog/detail-customer-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PopupComponent } from '../../../core/dialog/popup/popup.component';

@Component({
  selector: 'app-customer',
  imports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    SelectModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [DialogService, ConfirmationService, MessageService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  products: Product[] = [];
  ref: DynamicDialogRef | undefined;
  first1: number = 0;
  rows1: number = 10;
  totalRecords: number = 0;
  constructor(public dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('listCustomer') as string);
    this.totalRecords = this.products ? this.products.length : 0;
  }

  delete(even: Product) {
    this.confirmationService.confirm({
      header: 'ยืนยันลบข้อมูล',
      rejectButtonProps: {
        label: 'ยกเลิก',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'ตกลง',
      },
      accept: () => {
        const indexToDelete = this.products.findIndex(item => item.id === even.id);
        if (indexToDelete !== -1) {
          this.products.splice(indexToDelete, 1);
          this.totalRecords = this.products ? this.products.length : 0;
          localStorage.setItem('listCustomer', JSON.stringify(this.products))
        }
      },
      reject: () => {
      },
    });
  }

  add() {
    this.ref = this.dialogService.open(DetailCustomerDialogComponent, {
      header: 'Add Customer',
      width: '50vw',
      modal: true,
      data: {
        page: 'บันทึก'
      },
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe((data: Product) => {
      if (data) {
        if (!this.products) {
          this.products = [];
        }
        let number = this.products.length !== 0 ? this.products[this.products.length - 1].id : 0;
        this.products.push({
          id: (number ?? 0) + 1,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          address: data.address
        });
        this.totalRecords = this.products ? this.products.length : 0;
        localStorage.setItem('listCustomer', JSON.stringify(this.products));
      }
    });
  }

  edit(even: Product) {
    this.ref = this.dialogService.open(DetailCustomerDialogComponent, {
      header: 'Edit Customer',
      width: '50vw',
      modal: true,
      data: {
        even: even,
        page: 'แก้ไข'
      },
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        for (var i in this.products) {
          if (this.products[i].id == data.id) {
            this.products[i].firstName = data.firstName;
            this.products[i].lastName = data.lastName;
            this.products[i].email = data.email;
            this.products[i].address = data.address;
            break;
          }
        }
        this.totalRecords = this.products ? this.products.length : 0;
        localStorage.setItem('listCustomer', JSON.stringify(this.products));
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onPageChange1(event: PaginatorState) {
    this.first1 = event.first ?? 0;
    this.rows1 = event.rows ?? 5;
  }
}
