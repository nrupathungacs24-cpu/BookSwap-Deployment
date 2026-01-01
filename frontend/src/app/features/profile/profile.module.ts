import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        UserProfileComponent
    ]
})
export class ProfileModule { }
