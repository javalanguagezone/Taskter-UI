import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditBasicProjectInfo } from '../../../shared/models/editBasicProjectInfo.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'tsk-edit-basic-project-info',
  templateUrl: './edit-basic-project-info.component.html',
  styleUrls: ['./edit-basic-project-info.component.scss']
})
export class EditBasicProjectInfoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBasicProjectInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditBasicProjectInfo,
    public projectService: ProjectService
    ) { }

  basicInfoFormGroup = this.fb.group({
    projectName: [this.data.Name, Validators.required],
    projectCode: [this.data.Code, Validators.required]
  });

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    this.projectService.editBasicProjectInformation(this.data)
      .subscribe(
        data => console.log('Success'),
        err => console.log(err)
      );
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
