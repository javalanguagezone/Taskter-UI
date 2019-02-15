import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'tsk-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  clientName: string;
  clientForm: FormGroup;

  constructor(
    private clientservice: ClientService,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.clientForm = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.clientForm.invalid || this.clientForm.untouched || this.clientForm.value == "")
      return;

    this.postNewClient();
    this.clientForm.reset();


  }
  postNewClient() {
    this.clientservice.addNewClient(this.clientForm.value).subscribe(
      () => { },
      (err: any) => {
        console.warn(err);
      }
    )
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}