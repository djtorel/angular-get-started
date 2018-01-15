import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-details',
  template: `
    <section
      *ngIf="person"
      >
      <h2> You selected: {{ person.name }} </h2>
      <h3> Description </h3>
      <p>
        {{ person.name }} weighs {{ person.weight }} and
        is {{ person.height }} tall.
      </p>
    </section>

    <button
      (click)="gotoPeoplesList()"
      > Back to peoples list
    </button>
  `,
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  @Input() person: Person;
  sub: any;

  constructor(private peopleService: PeopleService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      this.person = this.peopleService.get(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoPeoplesList() {
    const link = ['/persons'];
    this.router.navigate(link);
  }

}
