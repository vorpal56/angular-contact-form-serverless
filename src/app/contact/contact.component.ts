import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    });
  }
  ngOnInit(): void {
  }

  isValidForm(): boolean {
    if (this.honeypot.value != "") { return false; } // make sure the honey pot is not filled in
    if (this.name.hasError("required")) { return false; }
    if (this.email.hasError("required") || this.email.hasError("email")) { return false; }
    if (this.message.hasError("required") || this.message.hasError("maxLength")) { return false; }
    return true;
  }
  onSubmit() {
    if (this.isValidForm()) {
      var formData: any = new FormData();
      formData.append("name", this.form.get("name").value);
      formData.append("email", this.form.get("email").value);
      formData.append("message", this.form.get("message").value);
      this.http.post("YOUR GOOGLE WEB APP URL HERE", formData).subscribe(
        (response) => {
          this.submitted = true;
          console.log(response);
        },
        (error) => { console.log(error); this.submitted = true; }
      );
    }
  }

}

