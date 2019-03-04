/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for MyHospital', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be MyHospital', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('MyHospital');
    })
  });

  it('network-name should be test@0.0.3-deploy.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('test@0.0.3-deploy.1.bna');
    });
  });

  it('navbar-brand should be MyHospital',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('MyHospital');
    });
  });

  
    it('MedicalRecordField component should be loadable',() => {
      page.navigateTo('/MedicalRecordField');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MedicalRecordField');
      });
    });

    it('MedicalRecordField table should have 5 columns',() => {
      page.navigateTo('/MedicalRecordField');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('MedicalRecord component should be loadable',() => {
      page.navigateTo('/MedicalRecord');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MedicalRecord');
      });
    });

    it('MedicalRecord table should have 5 columns',() => {
      page.navigateTo('/MedicalRecord');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('MedicalResultReport component should be loadable',() => {
      page.navigateTo('/MedicalResultReport');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MedicalResultReport');
      });
    });

    it('MedicalResultReport table should have 6 columns',() => {
      page.navigateTo('/MedicalResultReport');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('MedicalResultReportDetail component should be loadable',() => {
      page.navigateTo('/MedicalResultReportDetail');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MedicalResultReportDetail');
      });
    });

    it('MedicalResultReportDetail table should have 4 columns',() => {
      page.navigateTo('/MedicalResultReportDetail');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('MedicalDiagnosis component should be loadable',() => {
      page.navigateTo('/MedicalDiagnosis');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('MedicalDiagnosis');
      });
    });

    it('MedicalDiagnosis table should have 5 columns',() => {
      page.navigateTo('/MedicalDiagnosis');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Department component should be loadable',() => {
      page.navigateTo('/Department');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Department');
      });
    });

    it('Department table should have 3 columns',() => {
      page.navigateTo('/Department');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Employee component should be loadable',() => {
      page.navigateTo('/Employee');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Employee');
      });
    });

    it('Employee table should have 5 columns',() => {
      page.navigateTo('/Employee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Patient component should be loadable',() => {
      page.navigateTo('/Patient');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Patient');
      });
    });

    it('Patient table should have 5 columns',() => {
      page.navigateTo('/Patient');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Doctor component should be loadable',() => {
      page.navigateTo('/Doctor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Doctor');
      });
    });

    it('Doctor table should have 6 columns',() => {
      page.navigateTo('/Doctor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Hospital component should be loadable',() => {
      page.navigateTo('/Hospital');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Hospital');
      });
    });

    it('Hospital table should have 4 columns',() => {
      page.navigateTo('/Hospital');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateDepartment component should be loadable',() => {
      page.navigateTo('/CreateDepartment');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateDepartment');
      });
    });
  
    it('UpdateDepartment component should be loadable',() => {
      page.navigateTo('/UpdateDepartment');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateDepartment');
      });
    });
  
    it('CreateEmployee component should be loadable',() => {
      page.navigateTo('/CreateEmployee');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateEmployee');
      });
    });
  
    it('UpdateEmployee component should be loadable',() => {
      page.navigateTo('/UpdateEmployee');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateEmployee');
      });
    });
  
    it('CreateDoctor component should be loadable',() => {
      page.navigateTo('/CreateDoctor');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateDoctor');
      });
    });
  
    it('UpdateDoctor component should be loadable',() => {
      page.navigateTo('/UpdateDoctor');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateDoctor');
      });
    });
  
    it('CreatePatient component should be loadable',() => {
      page.navigateTo('/CreatePatient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreatePatient');
      });
    });
  
    it('UpdatePatient component should be loadable',() => {
      page.navigateTo('/UpdatePatient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdatePatient');
      });
    });
  
    it('UpdateMedicalRecordField component should be loadable',() => {
      page.navigateTo('/UpdateMedicalRecordField');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMedicalRecordField');
      });
    });
  
    it('CreateDemo component should be loadable',() => {
      page.navigateTo('/CreateDemo');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateDemo');
      });
    });
  
    it('CreateHospital component should be loadable',() => {
      page.navigateTo('/CreateHospital');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateHospital');
      });
    });
  
    it('UpdateHospital component should be loadable',() => {
      page.navigateTo('/UpdateHospital');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateHospital');
      });
    });
  
    it('CreateMedicalRecord component should be loadable',() => {
      page.navigateTo('/CreateMedicalRecord');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateMedicalRecord');
      });
    });
  
    it('UpdateMedicalRecord component should be loadable',() => {
      page.navigateTo('/UpdateMedicalRecord');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMedicalRecord');
      });
    });
  
    it('CreateMedicalResultReport component should be loadable',() => {
      page.navigateTo('/CreateMedicalResultReport');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateMedicalResultReport');
      });
    });
  
    it('CreateMedicalResultReportDetail component should be loadable',() => {
      page.navigateTo('/CreateMedicalResultReportDetail');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateMedicalResultReportDetail');
      });
    });
  
    it('CreateMedicalDiagnosis component should be loadable',() => {
      page.navigateTo('/CreateMedicalDiagnosis');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateMedicalDiagnosis');
      });
    });
  

});