import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TopnavbarComponent} from './topnavbar.component';

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [
        BrowserModule,
        FormsModule
    ],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule {}
