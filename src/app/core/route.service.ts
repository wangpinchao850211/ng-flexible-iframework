import { Route as ngRoute, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { Component } from '@angular/core';
import { FlowLayoutComponent } from '../flow-layout/flow-layout.component';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using shell as the base.
   */
  static withShell(routes: Routes, condition: boolean = true): ngRoute {
    return {
        path: '',
        component: FlowLayoutComponent,
        children: routes,
        canActivate: condition ? [AuthenticationGuard] : null,
      };
  }

}
