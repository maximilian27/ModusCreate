import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import tasks, { Task } from '../tasks/tasks';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // use a behaviorsubject to maintain the sync between components
  private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private sanitizer: DomSanitizer,
              private router: Router) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  getTasks(): Array<Task> {
    return tasks.map(task => {
      const updatedTask: Task = { description: '' };
      if (task.links && task.links.length) {
        for (const link of task.links) {
          updatedTask.description = task.description.replace(
            '{{link}}',
            `<a href='${link}'>${link}</a>`
          );
        }
      } else if (task.routerLinks && task.routerLinks.length) {
        for (const link of task.routerLinks) {
          updatedTask.description = task.description.replace(
            '{{link}}',
            `<a href='/${link}' routerLink='${link}'>${link} route</a>`
          );
        }
      }
      updatedTask.description = this.sanitizer.bypassSecurityTrustHtml(
        updatedTask.description
      ) as string;
      return Object.assign({}, task, updatedTask);
    });
  }

  login() {
    this.isLoggedIn$.next(true);
    // the timeout is only for visual efect in order to to show the welcome message
    setTimeout(() => {
      this.router.navigate(['/users-list']);
    }, 1500);

  }

  logout() {
    this.isLoggedIn$.next(false);
    // nagigate to home page, once logged in
    this.router.navigate(['/home']);

  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }
}
