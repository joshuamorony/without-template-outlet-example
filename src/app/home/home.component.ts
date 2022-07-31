import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponentModule } from '../shared/ui/table.component';

@Component({
  selector: 'app-home',
  template: `
    <!-- IMPORTANT: This is a bad example to demonstrate why *ngTemplateOutlet is a better option -->

    <!-- No templates provided, will use default layout -->
    <app-table [data]="employees"></app-table>

    <!-- Basic configured template -->
    <app-table [data]="employees" [headers]="['First', 'Last']"></app-table>

    <!-- Highly configured template with conditional elements -->
    <app-table
      [data]="inventory"
      [headers]="['Item', 'Price', '']"
      actionButton="Buy now"
      (actionClicked)="purchaseItem($event)"
    >
      <ng-template #rows let-row>
        <td>{{ row.name }}</td>
        <td>{{ row.price | currency: row.currency }}</td>
        <td>
          <button *ngIf="row.inStock > 0" (click)="purchaseItem(row.plu)">
            Buy now
          </button>
        </td>
      </ng-template>
    </app-table>
  `,
})
export class HomeComponent {
  employees = [
    { firstName: 'Employee', lastName: 'One' },
    { firstName: 'Employee', lastName: 'Two' },
    { firstName: 'Employee', lastName: 'Three' },
    { firstName: 'Employee', lastName: 'Four' },
    { firstName: 'Employee', lastName: 'Five' },
  ];

  inventory = [
    {
      plu: 110,
      supplier: 'X Corp',
      name: 'Table extender',
      inStock: 500,
      price: 50,
      currency: 'GBP',
    },
    {
      plu: 120,
      supplier: 'X Corp',
      name: 'Heated toilet seat',
      inStock: 0,
      price: 80,
      currency: 'GBP',
    },
    {
      plu: 155,
      supplier: 'Y Corp',
      name: 'Really good pencil',
      inStock: 1,
      price: 8000,
      currency: 'AUD',
    },
  ];

  // TODO - transform inventory array to apply currency conversion

  purchaseItem(item: any) {
    console.log('handle purchase for', item.plu);
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TableComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
