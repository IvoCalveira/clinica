import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";


import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:4200"],
          disallowedRoutes: ["http://localhost:4200/login/", "http://localhost:4200/usuario/", "http://localhost:4200/usuario-logueado/"],
        },
      }),
      
   ]), provideAnimationsAsync()] 
  } 
export function tokenGetter() {
  return localStorage.getItem("UsuarioToken");
}


