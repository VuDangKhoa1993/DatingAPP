import { MemberEditComponent } from './../../../../app/members/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure to close form? Any changes will be lost if it hasn\'t saved');
        }
        return true;
    }
}