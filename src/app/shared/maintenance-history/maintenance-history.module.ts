import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceHistoryComponent } from './maintenance-history.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ MaintenanceHistoryComponent ],
    exports: [ MaintenanceHistoryComponent ]
})

export class MaintenanceHistoryModule {}
