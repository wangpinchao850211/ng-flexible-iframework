import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UseraccessService } from './useraccess/useraccess.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { UtcDatePipe } from '../common/pipes/dateUtc.pipe';
import { PaAddTaxPipe } from '../common/pipes/addTax.pipe';
import { MultiplePipe } from '../common/pipes/multiple.pipe';
// import { PaCategoryFilterPipe } from '../common/pipes/categoryFilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    UtcDatePipe,
    PaAddTaxPipe,
    MultiplePipe,
    // PaCategoryFilterPipe 
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    UseraccessService,
  ],
  exports: [
    FormsModule,
    CommonModule,
    UtcDatePipe,
    PaAddTaxPipe,
    MultiplePipe,
    // PaCategoryFilterPipe 
  ],
  entryComponents: [
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
