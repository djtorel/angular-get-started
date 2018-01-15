import { Injectable } from '@angular/core';
import { Person } from './person';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const PEOPLE: Person[] = [];

function mapPersons(response: Response): Person[] {
  return response.json().results.map(toPerson);
}

function mapPerson(response: Response): Person {
  return toPerson(response.json());
}

function toPerson(r: any): Person {
  const person = <Person>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: Number.parseInt(r.mass),
    height: Number.parseInt(r.height),
  });
  console.log('Parsed person: ', person);
  return person;
}

function extractId(personData: any) {
  const extractedId = personData.url
    .replace('https://swapi.co/api/people/', '')
    .replace('/', '');

  return parseInt(extractedId, 10);
}

function handleError(error: any) {
  const errorMsg = error.message || `Yikes! there was a problem with our hyperdrive and we couldn't retrieve your data!`;
  console.error(errorMsg);

  return Observable.throw(errorMsg);
}

@Injectable()
export class PeopleService {

  private baseUrl = 'https://swapi.co/api';

  constructor(private http: Http) { }

  getAll(): Observable<Person[]> {
    const people$ = this.http
      .get(`${ this.baseUrl }/people`, { headers: this.getHeaders() })
      .map(mapPersons)
      .catch(handleError);
      return people$;
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  get(id: number): Observable<Person> {
    const person$ = this.http
      .get(`${ this.baseUrl }/people/${ id }`, { headers: this.getHeaders() })
      .map(mapPerson)
      .catch(handleError);
      return person$;
  }

  save(person: Person): Observable<Response> {
    return this
      .http
      .put(`${ this.baseUrl }/people/${ person.id }`,
          JSON.stringify(person),
          { headers: this.getHeaders() });
  }

  private clone(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

}
