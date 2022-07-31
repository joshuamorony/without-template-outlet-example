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
      <thead>
        <tr>
          <ng-container *ngIf="headers; else defaultHeaders">
            <th *ngFor="let header of headers">
              {{ header }}
            </th>
          </ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <ng-container *ngFor="let row of row | keyvalue">
            <td *ngIf="rowVisible(row.key)">
              {{ row.value }}
            </td>
          </ng-container>

          <td *ngIf="actionButtonFn && actionButtonFn(row)">
            <button (click)="actionClicked.emit(row)">
              {{ actionButtonFn(row) }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ng-template #defaultHeaders>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>
  `,
  styles: [
    `
      table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
        font-family: sans-serif;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

        thead tr {
          background-color: #dd0031;
          color: #ffffff;
          text-align: left;
        }

        tbody tr:hover {
          background-color: #f6f6f6;
        }

        th,
        td {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class TableComponent {
  @Input() data!: any[];
  @Input() headers: string[] | undefined;
  @Input() hideRows: string[] = [];
  @Input() actionButtonFn: Function | undefined;

  @Output() actionClicked = new EventEmitter();

  rowVisible(key: unknown) {
    return !this.hideRows.includes(key as string);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableComponentModule {}
