import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import {registerElement} from "nativescript-angular/element-registry";
registerElement("Ripple", () => require("nativescript-ripple").Ripple);

import { AppModule } from "./app.module";
import { setStatusBarColors } from "./utils/status-bar-util";

// setStatusBarColors();
platformNativeScriptDynamic().bootstrapModule(AppModule);