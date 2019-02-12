import { CreateProject } from '../../shared/models/createProject.model';

export function projectFormValidator(data: CreateProject): boolean {
  return data.projectCode &&
    data.client &&
    data.projectName &&
    data.projectName &&
    data.userIds.length !== 0 &&
    data.tasks.length !== 0;
}
