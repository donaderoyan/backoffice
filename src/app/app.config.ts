import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { EmployeeReducer } from './shared/states/employee/employee.reducer';
import { provideEffects } from '@ngrx/effects';
import { EmployeeEffect } from './shared/states/employee/employee.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation : 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration : 'enabled'
      }),
    ), 
    
    importProvidersFrom(
      BrowserModule,
    ),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: 'employee', reducer: EmployeeReducer }),
    provideEffects(EmployeeEffect),
  ]
};

