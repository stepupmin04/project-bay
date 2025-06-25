import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports: [DrawerModule, ButtonModule, PanelMenuModule, CardModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() menuVisible: boolean = false;
  @Output() sidenavToggleClicked = new EventEmitter();
  items!: any[];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.items = [
      {
        label: 'customer',
        icon: 'pi pi-users',
        items: [
          {
            label: 'customer',
            icon: 'pi pi-users',
            command: () => {
                  this.router.navigate(['/customer']);
                  this.menuVisible = false;
            }
          }
        ]
      }
    ]
  }
}
