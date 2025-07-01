/**
 * @file Application-level configuration for the Angular app.
 * Sets up core providers including error listeners, routing, hydration, and zoneless change detection.
 */

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

/**
 * Configuration object that defines core providers for the Angular application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Adds global error listeners for browser-based error reporting.
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * Enables zoneless change detection (experimental).
     */
    provideZonelessChangeDetection(),

    /**
     * Provides the application routes to Angular's router.
     */
    provideRouter(routes),

    /**
     * Enables client-side hydration for server-side rendering, with event replay support.
     */
    provideClientHydration(withEventReplay())
  ]
};