import {
  provideHttpClient,
  withFetch,
  //withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
//import { ErrorResponseInterceptor } from './shared/error-response.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      //withInterceptors(),
<<<<<<< HEAD
    ), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
=======
    ), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
>>>>>>> e25656afd22290a38eaa4d8c6b32d3c65d5573e5
  ],
};
