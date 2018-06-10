import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { TranslateService } from "ng2-translate";
import * as Platform from "platform";

import { Condominium } from "../../shared/condominium/condominium";
import { CondominiumService } from "../../shared/condominium/condominium.service";
import { Config } from "../../shared/config";

@Component({
  selector: "list-condominium",
  providers: [CondominiumService],
  templateUrl: "./pages/list-condominium/list.condominium.html",
  styleUrls: ["./pages/list-condominium/list.condominium-common.css"]
})
export class ListCondominiumComponent implements OnInit {

  private language: string;
  private condominiumList: Array<Condominium>; 

  private removeIcon: string;
  private editIcon: string;
  private addressIcon: string;

  constructor(private router: Router, private condominiumService: CondominiumService, 
    private page: Page, private translate: TranslateService) {

    this.language = Platform.device.language;
    this.translate.setDefaultLang("en");
    this.translate.use(Platform.device.language.split("-")[0]);
    this.removeIcon = String.fromCharCode(0xe9ac);
    this.editIcon = String.fromCharCode(0xe905);
    this.addressIcon = String.fromCharCode(0xe947);
  }

  ngOnInit() {
    this.loadCondominiums();
  }

  loadCondominiums() {
    this.condominiumService.get()
    .subscribe(
      condominiums => this.condominiumList = condominiums,
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  addCondominium() {
    this.router.navigate(["/addCondominium"])
  }  

  toggle(condominium: Condominium) {
    condominium.visible = !condominium.visible;
  }

}