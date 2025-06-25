import { Component, Output, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuComponent } from '../menu/menu.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../core/service/api/authentication.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import moment from 'moment';

@Component({
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule, IconFieldModule, InputIconModule, SplitButtonModule, MenuComponent, ConfirmPopupModule, ToastModule, ConfirmDialogModule
    , SpeedDialModule, OverlayPanelModule, RouterOutlet
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  providers: [MessageService, ConfirmationService]
})
export class TopbarComponent {
  // @ViewChild('MenuComponent') MenuComponent: MenuComponent;
  @Output() menuVisible: boolean = false;
  items: any;
  user: any;
  date: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    this.user = JSON.stringify(localStorage.getItem('user'));
    const currentDate = new Date(); // Your JavaScript Date object
    this.date = moment(currentDate).format('DD/MM/YYYY HH:mm:ss');
  }

  getDateUser() {
    this.user = this.authenticationService.getUser();
  }

  async logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}


