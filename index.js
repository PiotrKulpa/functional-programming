// Hybrid programming - use objects and functions
class Person {
  constructor(id, firstname, lastname, ssn) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }
  get ssn() {
    return this._ssn;
  }
  get firstname() {
    return this._firstname;
  }
  get lastname() {
    return this._lastname;
  }
  get address() {
    return this._address;
  }
  get birthYear() {
    return this._birthYear;
  }
  set birthYear(year) {
    this._birthYear = year;
  }
  set address(addr) {
    this._address = addr;
  }
  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }
}

class Address {
  constructor(country, state, city, zip, street) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }
  get street() {
    return this._street;
  }
  get city() {
    return this._city;
  }
  get state() {
    return this._state;
  }
  get zip() {
    return this._zip;
  }
  get country() {
    return this._country;
  }
}

const person1 = new Person(1, 'Haskell', 'Curry', '444-44-4444');
person1.address = new Address(
'USA', 'NJ', 'Princeton',
'1234', 'Alexander St.');

const person2 = new Person(1, 'John', 'Kowalski', '555-44-4444');
person2.address = new Address(
'PL', 'MAZ', 'Warsaw',
'12346', 'Niepodlegla St.');

const person3 = new Person(1, 'Adrian', 'Smith', '666-44-4444');
person3.address = new Address(
'UK', 'QN', 'Boston',
'34234', 'St. Miller St.');

const people = [person1, person2, person3];

/**
 *
 * 2.Higher level JS operations
 *
 */

/* 2.1 imperative way */
const printPeopleInTheUs = (people) => {
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
    if (thisPerson.address.country === "USA") {
      console.log("2.1 imperative way", thisPerson);
    }
  }
}
printPeopleInTheUs(people);

/* 2.1 declarative way */
const printPeople = (people, selector, printer) => {
  people.forEach(function (person) {
    if (selector(person)) {
      printer("2.1  declarative way", person);
    }
  });
}

const inUs = (person) => person.address.country === "USA";

// By using the higher order function
// becomes visible
// the declarative nature of the code.
// This expression clearly defines,
// what the program does.
printPeople(people, inUs, console.log);
