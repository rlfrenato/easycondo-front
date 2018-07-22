import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { Http } from "@angular/http";
import { HttpModule } from '@angular/http';
import { TNSFontIconModule } from 'nativescript-ng2-fonticon';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/i18n', '.json');
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    HttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    TNSFontIconModule.forRoot({
      'mdi': 'material-design-icons.css'
    }),
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
