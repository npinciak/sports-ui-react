interface IEntityBaseAttributes<T> {
  id: T;
  uid: T;
  name: T;
  shortName: T;
  abbreviation: T;
  slug: T;
}

export type EntityBase = IEntityBaseAttributes<string>;
