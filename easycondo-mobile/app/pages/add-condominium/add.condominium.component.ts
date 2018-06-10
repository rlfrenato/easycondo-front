import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { TranslateService } from "ng2-translate";
import * as Platform from "platform";
import { PlatformLocation } from '@angular/common';

import { Condominium } from "../../shared/condominium/condominium";
import { CondominiumService } from "../../shared/condominium/condominium.service";
import { Config } from "../../shared/config";

@Component({
  selector: "add-condominium",
  providers: [CondominiumService],
  templateUrl: "./pages/add-condominium/add.condominium.html",
  styleUrls: ["./pages/add-condominium/add.condominium-common.css"]
})
export class AddCondominiumComponent implements OnInit {

  public language: string;

  condominium: Condominium;

  nameIcon: string;
  addressIcon: string;
  emailIcon: string;
  phoneIcon: string;
  websiteIcon: string;
  navigationBackIcon: string;
  navigationSaveIcon: string;
  warningIcon: string;

  nameMandatoryValidationFail : boolean;
  streetMandatoryValidationFail : boolean;
  neighborhoodMandatoryValidationFail : boolean;
  numberMandatoryValidationFail : boolean;
  cityMandatoryValidationFail : boolean;
  stateMandatoryValidationFail : boolean;
  zipCodeMandatoryValidationFail : boolean;

  constructor(private router: Router, private translate: TranslateService, 
    private condominiumService: CondominiumService, private page: Page) {

    this.language = Platform.device.language;
    this.translate.setDefaultLang(Config.defaultLanguage);
    this.translate.use(Platform.device.language.split("-")[0]);
    
    this.condominium = new Condominium();
    this.nameIcon = String.fromCharCode(0xe903);
    this.addressIcon = String.fromCharCode(0xe947);
    this.emailIcon = String.fromCharCode(0xe945);
    this.phoneIcon = String.fromCharCode(0xe942);
    this.websiteIcon = String.fromCharCode(0xe9ca);
    this.navigationBackIcon = String.fromCharCode(0xea40);
    this.navigationSaveIcon = String.fromCharCode(0xea10);
    this.warningIcon = String.fromCharCode(0xea07);
  }

  ngOnInit() {
  }

  saveCondominium() {
    
    if (!this.validateMandatoryFields()) {
      return;
    }

    this.condominiumService.save(this.condominium)
      .subscribe((result) => {
        this.router.navigate(["/listCondominium"]);
      }, (error) => {
        alert(error); 
      }
    );
  }

  navigationBack() {    
    this.router.navigate(["/listCondominium"]);
  }

  validateMandatoryFields() {

    let validationResultSuccess : boolean;
    validationResultSuccess = true;

    if(typeof this.condominium.name == 'undefined' && !this.condominium.name) {
      this.nameMandatoryValidationFail = true;   
      validationResultSuccess = false;
    }

    if(typeof this.condominium.street == 'undefined' && !this.condominium.street) {    
      this.streetMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    if(typeof this.condominium.neighborhood == 'undefined' && !this.condominium.neighborhood) {    
      this.neighborhoodMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    if(typeof this.condominium.number == 'undefined' && !this.condominium.number) {    
      this.numberMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    if(typeof this.condominium.city == 'undefined' && !this.condominium.city) {    
      this.cityMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    if(typeof this.condominium.state == 'undefined' && !this.condominium.state) {    
      this.stateMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    if(typeof this.condominium.zipCode == 'undefined' && !this.condominium.zipCode) {    
      this.zipCodeMandatoryValidationFail = true;
      validationResultSuccess = false;
    }

    return validationResultSuccess;
  }
    
}
