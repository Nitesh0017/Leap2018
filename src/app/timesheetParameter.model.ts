export interface Timesheet
{
    empId: number;
    RMId: number;
    projectId: string;
    timesheet1Date: Date;
    timesheet1DateEffort: number;
    timesheet2DateEffort: number;
    timesheet3DateEffort: number;
    timesheet4DateEffort: number;
    timesheet5DateEffort: number;
    timesheet6DateEffort: number;
    timesheet7DateEffort: number;
    taskDescription: string;
    timesheetStatus: string;
}