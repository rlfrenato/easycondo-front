import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

import { setStatusBarColors } from "./utils/status-bar-util";

@Component({
  selector: "main",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  private selectedPage: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(private routerExtensions: RouterExtensions) {
    // setStatusBarColors();
  }

  ngOnInit() {
    this.selectedPage = "Home";
    this._sideDrawerTransition = new SlideInOnTopTransition();
  }

  get sideDrawerTransition() {
    return this._sideDrawerTransition;
  }

  isPageSelected(pageTitle: string) {
    return pageTitle === this.selectedPage;
  }

  onNavItemTap(navItemRoute: string) {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });
    this.selectedPage = navItemRoute;

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }
}
