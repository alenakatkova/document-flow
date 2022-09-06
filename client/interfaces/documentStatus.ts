export interface DocumentStatusFromDB {
  id : number;
  stage? : string;
  internalDepartmentId? : number;
  isAssistantResponsibility? : boolean;
  teamId? : number;
  createdAt? : string;
  updatedAt? : string;
}