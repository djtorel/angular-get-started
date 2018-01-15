import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  template: `
    <section *ngIf="isLoading && !errorMessage" >
      Loading our hyperdrives!!! Retrieving data...
    </section>
    <ul>
      <li
        *ngFor="let person of people"
        >
        <a [routerLink]="['/persons', person.id]" >
          {{ person.name }}
        </a>
      </li>
    </ul>
    <section *ngIf="errorMessage" >
      {{ errorMessage }}
    </section>
  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.peopleService
      .getAll()
      .subscribe(
          p => this.people = p,
          e => this.errorMessage = e,
          () => this.isLoading = false);
  }

}
