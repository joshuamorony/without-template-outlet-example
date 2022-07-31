import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

// IMPORTANT: This is a bad example to demonstrate why *ngTemplateOutlet is a better option
@Component({
  selector: 'app-table',
  template: `
    <table>
      <tr>
        <ng-container *ngIf="headers; else defaultHeaders">
          <th *ngFor="let header of headers">
            {{ header }}
          </th>
        </ng-container>
      </tr>
      <tr *ngFor="let row of data">
        <ng-container *ngFor="let row of row | keyvalue">
          <td *ngIf="hideRows.indexOf(row.key) > -1">
            {{ row.value }}
          </td>
        </ng-container>

        <td *ngIf="actionButton">
          <!-- still need the full row here to emit -->
          <button (click)="actionClicked.emit(row)">{{ actionButton }}</button>
        </td>
      </tr>
    </table>

    <ng-template #defaultHeaders>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>
  `,
})
export class TableComponent {
  @Input() data!: any[];
  @Input() headers: string[] | undefined;
  @Input() hideRows: string[] = [];
  @Input() actionButton: string | undefined;

  @Output() actionClicked = new EventEmitter();
}

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableComponentModule {}
