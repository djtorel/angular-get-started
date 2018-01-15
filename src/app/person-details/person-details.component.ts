import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  @Input() person: Person;
  sub: any;
  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

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

  savePersonDetails() {
    this.peopleService.save(this.person);
  }

}
