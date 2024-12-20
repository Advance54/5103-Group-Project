import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// added imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


//r MatTooltipModule.
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, MatLabel } from
'@angular/material/form-field';
const MaterialComponents = [MatButtonModule,
 MatCardModule,
 MatNativeDateModule,
 MatDatepickerModule,
 MatSelectModule,
 MatTableModule,
 MatSortModule,
 MatTooltipModule,
 MatFormFieldModule,
 MatIconModule,
 MatInputModule,
 MatListModule,
 MatMenuModule,
 MatToolbarModule,
 MatLabel
];
@NgModule({
 declarations: [],
 providers: [
 {
 provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
 useValue: { appearance: 'fill' },
 },
 ],
 imports: [CommonModule, ...MaterialComponents],
 exports: [...MaterialComponents],
})
export class MatComponentsModule {}
