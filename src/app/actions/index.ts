
import {NgModule} from '@angular/core';

import { LoadCourseItemsAction } from './load-course-items.action';
import { SendMenuSelectionAction } from './send-menu-selection.action';
import { CourseItemsLoadedAction } from './course-items-loaded.action';
import { ErrorBackendCallAction } from './error-backend-call.action';
import { MenuSelectionSendAction } from './menu-selection-send.action';

export * from './course-items-loaded.action';
export * from './load-course-items.action';
export * from './error-backend-call.action';
export * from './send-menu-selection.action';
export * from './menu-selection-send.action';

@NgModule({
  providers: [
    SendMenuSelectionAction,
    CourseItemsLoadedAction,
    LoadCourseItemsAction,
    ErrorBackendCallAction,
    MenuSelectionSendAction
  ]
})
export class CourseMenuActionModule {}
