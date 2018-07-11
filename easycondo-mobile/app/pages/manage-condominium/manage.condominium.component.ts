import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Page } from "ui/page";
import { TranslateService } from "ng2-translate";
import * as Platform from "platform";
import { PlatformLocation } from '@angular/common';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

import { Condominium } from "../../shared/condominium/condominium";
import { CondominiumService } from "../../shared/condominium/condominium.service";
import { Config } from "../../shared/config";

@Component({
  selector: "manage-condominium",
  providers: [CondominiumService],
  templateUrl: "./pages/manage-condominium/manage.condominium.html",
  styleUrls: ["./pages/manage-condominium/manage.condominium-common.css"]
})
export class ManageCondominiumComponent implements OnInit {

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
  deleteIcon: string;

  nameMandatoryValidationFail : boolean;
  streetMandatoryValidationFail : boolean;
  neighborhoodMandatoryValidationFail : boolean;
  numberMandatoryValidationFail : boolean;
  cityMandatoryValidationFail : boolean;
  stateMandatoryValidationFail : boolean;
  zipCodeMandatoryValidationFail : boolean;

  pageTitle : string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private translate: TranslateService, 
    private condominiumService: CondominiumService, private page: Page, private icon: TNSFontIconService) {

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
    this.deleteIcon = String.fromCharCode(0xe9ac);
  }

  ngOnInit() {
    let condominiumId;
    this.activatedRoute.params.subscribe( params => 
      condominiumId = params["id"]
    );

    if (!(typeof condominiumId === 'undefined')) {
      this.condominiumService.getCondominiumById(condominiumId)
      .subscribe(
        condominium => this.condominium = condominium,
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
      this.pageTitle = "Edit Condominium";
    } else {    
      this.pageTitle = "Add Condominium";
    }
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

  getTranslatedText(text: string) {
    let translatedText;
    this.translate.get(text).subscribe((data: string) => {
      translatedText = data;
    }); 
    return translatedText;
  }

  getTranslatedTextWithParameters(text: string, parameters) {
    let translatedText;
    this.translate.get(text, parameters).subscribe((data: string) => {
      translatedText = data;
    });
    return translatedText;
  }

  deleteCondominium() {
     
    var dialogs = require("ui/dialogs");
    dialogs.confirm({
        title: this.getTranslatedText("Delete"),
        message: this.getTranslatedTextWithParameters("Do you really want to delete?", {parameter: this.condominium.name}),
        okButtonText: this.getTranslatedText("Delete"),
        cancelButtonText: this.getTranslatedText("Cancel")
    }).then(function (result) {
        if (result) {
          this.condominiumService.deleteCondominiumById(this.condominium.id)
          .subscribe((result) => {
            this.router.navigate(["/listCondominium"]);
          }, (error) => {
            alert(error);
          } 
        );
        }
    });
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
