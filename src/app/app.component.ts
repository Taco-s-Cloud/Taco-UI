// app.component.ts
// This is the main component of the Angular app.

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // TODO: Add properties and methods to interact with microservices.
  title = 'Angular 17 Crud example';
}

//Examp[le of how to make HTTP requests to microservices]
// export class AppComponent implements OnInit {
//     constructor(private http: HttpClient) {}
  
//     ngOnInit() {
//       this.fetchUsers();
//       this.fetchTasks();
//       this.fetchSchedules();
//     }
  
//     fetchUsers() {
//       this.http.get(`${environment.apiUrl}/users`).subscribe((data) => {
//         console.log('Users:', data);
//         // TODO: Handle user data
//       });
//     }
  
//     fetchTasks() {
//       this.http.get(`${environment.apiUrl}/tasks`).subscribe((data) => {
//         console.log('Tasks:', data);
//         // TODO: Handle task data
//       });
//     }
  
//     fetchSchedules() {
//       this.http.get(`${environment.apiUrl}/schedules`).subscribe((data) => {
//         console.log('Schedules:', data);
//         // TODO: Handle schedule data
//       });
//     }
//   }