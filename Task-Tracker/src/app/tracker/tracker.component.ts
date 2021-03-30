import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskHandlerService } from '../task-handler.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  dataList: any;
  tasks: Array<Task> = new Array();
  dataSource: any = new MatTableDataSource<Task>(this.tasks);
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];

  constructor(public tasksHandlerServ: TaskHandlerService) {
  }

  ngOnInit(): void {
    this.tasksHandlerServ.getTasks().subscribe(result => this.tasks = result, error => console.log(error), () => { this.refresh() });
  }

  storeTask(taskRef: any): void {
    let isDupe:boolean = false;
    if (taskRef) {
      for(let task of this.dataList[0]) {
        if(task.id == taskRef.id) {
          isDupe = true;
        }
      }
      if (taskRef.name != "" && taskRef.task != "" && taskRef.deadline != "" && isDupe == false) {
        this.tasksHandlerServ.storeTask(taskRef);
      } else {
        alert("Please enter a unique id and all remaining fields");
      }
      this.refresh();
    }
  }

  refresh(): void {
    this.dataList = Object.values(this.tasks).map((obj, index) => {
      return obj;
    });
    this.dataSource = new MatTableDataSource<Task>(this.dataList[0]);
  }
}
