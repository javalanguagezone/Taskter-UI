import { CreateProject } from '../../shared/models/createProject.model';

export function projectFormValidator(data: CreateProject): string[] | null {
  const error: string[] = [];

  if (!data.projectName) {
    error.push('Project name must not be empty.');
  }
  if (!data.projectCode) {
    error.push('Project code must not be empty.');
  }
  if (!data.client) {
    error.push('Project client must not be empty.');
  }
  if (data.userIds.length === 0) {
    error.push('Project users must not be empty.');
  }
  if (data.tasks.length === 0) {
    error.push('Project tasks must not be empty.');
  }

  return error.length === 0 ? null : error;
}
