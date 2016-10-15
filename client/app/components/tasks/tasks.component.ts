import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { Task } from '../../models/Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})
export class TasksComponent {

  tasks: Task[];
  title: string;


  constructor(private taskService: TaskService) {

    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      })
  }

  addTask(event) {
    event.preventDefault();

    var newTask = {
      _id: null,
      title: this.title,
      isDone: false
    }

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = "";
      });

  }

  deleteTask(id: string) {

    console.log("del: " + id);

    this.taskService.delete(id)
      .subscribe(d => {

        this.tasks = this.tasks.filter(t => {
          return t._id != id;
        });
      });
  }
}