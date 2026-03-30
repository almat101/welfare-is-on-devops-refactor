/// <reference types="@angular/localize" />


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient , withInterceptors} from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UserInfoService } from './app/services/userInfo/user-info.service';
import { httpTokenInterceptor } from './app/services/interceptor/http-token.interceptor';
import { UserService } from './app/services/services/user.service';

//withinterceptors is a function that takes an array of interceptors and returns a function that takes a httpclient and returns a httpclient
// it handles multiple interceptors ( multi true is not needed anymore)
bootstrapApplication(AppComponent, {
  providers: [
  UserInfoService,
  UserService,
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    ...appConfig.providers // Include other providers if needed
  ],
})
  .catch((err) => console.error(err));


// cant use httpclientModule cause is deprecated
// check notion for more info
