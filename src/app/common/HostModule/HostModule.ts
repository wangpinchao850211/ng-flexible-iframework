import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaCategoryFilterPipe } from '../pipes/categoryFilter.pipe';
import { PaAddTaxPipe } from '../pipes/addTax.pipe';
import { UtcDatePipe } from '../pipes/dateUtc.pipe'
import * as Timezone from '../pipes/dateUtc.pipe';
@NgModule({
    imports: [ CommonModule],
    declarations: [  
        UtcDatePipe, 
        PaAddTaxPipe, 
        PaCategoryFilterPipe 
    ],
    exports: [ 
        UtcDatePipe,
        PaAddTaxPipe, 
        PaCategoryFilterPipe
    ],
   
})

export class PipeModuel {}