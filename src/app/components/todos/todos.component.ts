import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Todo from 'src/app/Models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos(5)
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  toggleTodo(todo){
    todo.completed = ! todo.completed;
    this.updateTodo(todo);
  }

  updateTodo(todo){
    this.todoService.update(todo).subscribe(() => {
      
      this.todos = this.todos.map(item => {
        if(todo.id === item.id){
          return todo;
        }
        return item;
      });
    });
  }

  deleteTodo(todo){
    this.todoService.delete(todo.id).subscribe(() => {
      this.todos = this.todos.filter(item => {
        return item !== todo;
      });
    });
  }
 
  addTodo(todo){
    this.todoService.add(todo).subscribe((newTodo) => {
      this.todos.push(newTodo);
    });
  }

}
