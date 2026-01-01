import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

@NgModule({
    declarations: [
        AuthModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        AuthModalComponent
    ]
})
export class AuthModule { }
