import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ]
})
export class CoreModule {
}
