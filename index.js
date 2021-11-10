/**
 *
 * Chapter I
 * 2.Higher level JS operations
 *
 */

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

const person1 = new Person(1, "Haskell", "Curry", "444-44-4444");
person1.address = new Address(
  "USA",
  "NJ",
  "Princeton",
  "1234",
  "Alexander St."
);

const person2 = new Person(1, "John", "Kowalski", "555-44-4444");
person2.address = new Address(
  "PL",
  "MAZ",
  "Warsaw",
  "12346",
  "Niepodlegla St."
);

const person3 = new Person(1, "Adrian", "Smith", "666-44-4444");
person3.address = new Address("UK", "QN", "Boston", "34234", "St. Miller St.");

const people = [person1, person2, person3];

/* 2.1 code example - imperative way */
const printPeopleInTheUs = (people) => {
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
    if (thisPerson.address.country === "USA") {
      console.log("2.1 imperative way", thisPerson);
    }
  }
};
printPeopleInTheUs(people);

/* 2.1 code example - declarative way */
const printPeople = (people, selector, printer) => {
  people.forEach(function (person) {
    if (selector(person)) {
      printer("2.1  declarative way", person);
    }
  });
};

const inUs = (person) => person.address.country === "USA";

// By using the higher order function
// becomes visible
// the declarative nature of the code.
// This expression clearly defines,
// what the program does.
printPeople(people, inUs, console.log);

/**
 *
 * Chapter II
 * 2.Chains
 *
 */

var names = [
  "alonzo church",
  "Haskell curry",
  "stephen_kleene",
  "John Von Neumann",
  "stephen_kleene",
];

const isValid = (val) => !_.isUndefined(val) && !_.isNull(val);

/* 3.6 code example - imperative way */
var result = [];
for (let i = 0; i < names.length; i++) {
  var n = names[i];
  if (n !== undefined && n !== null) {
    var ns = n.replace(/_/, " ").split(" ");
    for (let j = 0; j < ns.length; j++) {
      var p = ns[j];
      p = p.charAt(0).toUpperCase() + p.slice(1);
      ns[j] = p;
    }
    if (result.indexOf(ns.join(" ")) < 0) {
      result.push(ns.join(" "));
    }
  }
}
result.sort();

/* 3.7 code example - declarative way */
// Pros: code reduction, simple and clear structure.
_.chain(names)
  .filter(isValid)
  .map((s) => s.replace(/_/, " "))
  .uniq()
  .map(_.startCase)
  .sort()
  .value();

// 4.3 Currying - transform multi-argument function to sequence of unary functions.
// Pros:
// - emulating function interfaces,
// - implementing reusable modular function templates.

// using curry method from ramda
const checkType = R.curry((typeDef, obj) => {
  if (!R.is(typeDef, obj)) {
    let type = typeof obj;
    throw new TypeError(`Nieodpowiedni typ. Oczekiwano
  [${typeDef}], ale wykryto [${type}]`);
  }
  return obj;
});

console.log(checkType(String)("Curry"));
// console.log(checkType(String)(42));

//function factories (alternative to factory of objects in objectiv programming)
const useDb = false;
const arr = ["444-44-4444", "44-44-4444", "111"];

const fetchStudentFromDb = R.curry(function (db, ssn) {
  return find(db, ssn);
});

const fetchStudentFromArray = R.curry(function (arr, ssn) {
  return arr[ssn];
});

const findStudent = useDb ? fetchStudentFromDb(db) : fetchStudentFromArray(arr);
findStudent("444-44-4444");

// Compose examples
const str = `We can only see a short distance
ahead but we can see plenty there
that needs to be done`;
const explode = (str) => str.split(/\s+/);
const count = (arr) => arr.length;
const countWords = R.compose(count, explode);
console.log("Composition:", countWords(str));

const trim = (str) => str.replace(/^\s*|\s*$/g, '');
const normalize = (str) => str.replace(/\-/g, '');
const validLength = (param, str) => str.length === param;
const checkLengthSsn = _.partial(validLength, 9);
const cleanInput = R.compose(normalize, trim);
const isValidSsn = R.compose(checkLengthSsn, cleanInput);
console.log(cleanInput(' 444-44-4444 ')); //-> '444444444'
console.log(isValidSsn(' 444-44-4444 ')); //-> true

// Functor (Array is a functor) - is a structure of data which shares interface 
// to map on this data
// identity - copy of Array not reference
// composition -we can use compositiona and chaining
const double = value => value * 2;
const triple = x => x * 3;
const add2 = x => x + 2;

const Functor = (x) => ({
  map: (fn) => Functor(fn(x)),
  valueOf: () => x
});

const number = Functor(5);
const functorResult = number.map(double).map(add2).valueOf();
console.log('Functor result: ', functorResult);