import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCompleted: [false]
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe(newTask => {
        this.tasks.push(this.taskForm.value);
        this.taskForm.reset({ isCompleted: false });
      });
    }
  }
}
