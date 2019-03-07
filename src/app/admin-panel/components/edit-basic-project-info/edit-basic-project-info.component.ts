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
    projectName: [this.data.name, Validators.required],
    projectCode: [this.data.code, Validators.required]
  });

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    const editedData: EditBasicProjectInfo = {
      id: this.data.id,
      name: this.basicInfoFormGroup.get('projectName').value,
      code: this.basicInfoFormGroup.get('projectCode').value,
    };
    this.projectService.editBasicProjectInformation(editedData)
      .subscribe(
        data => console.log('Success'),
        err => console.log(err)
      );
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
