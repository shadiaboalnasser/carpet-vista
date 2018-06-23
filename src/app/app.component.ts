import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare let toastr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  testForm;
  name;
  email;
  phone;
  mouseOver;
  outputs;
  suggestions;

  ngOnInit() {

    //  create reactive form with validations foe email and name
    this.testForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      phone: new FormControl()
    });

    // send post request and receive result from the server with suggestions emails
    $("#email").focusout(() => {
      $.ajax({
        type: "POST",
        url: `https://www.carpetvista.se/ajax/check-email/${$("#email").val()}`,// send email for check error by parameter
        crossDomain: true, // for access from browser
        success: (result) => { // result from the server
          this.suggestions = JSON.parse(result);
          if (this.suggestions.output) {  // check if there are any suggestions

            this.outputs = this.suggestions.output.slice(0, 2); // take the first two suggestions

          }
        }
      })
    });
  }

  // change email by suggestions when choose one suggest email
  changeEmail() {
    this.testForm.patchValue({
      email: $("#selectSuggest option:selected").val()

    });
  }


  // submit form with sending letter
  onSubmit(form) {
    toastr.success('Form has sent')
  }


}
