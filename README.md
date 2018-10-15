# @bifot/mongodb-migrator

MongoDB super-simple migrator.

## Install

```sh
$ npm i @bifot/mongodb-migrator -S
```

## Usage

```js
const Migrator = require('@bifot/mongodb-migrator');

const migrator = new Migrator({
  db: {
    host: 'localhost',
    port: 27017,
    user: 'admin',
    password: '123456',
    database: 'my-app',
  },
  collections: ['users'],
});

const migrate = async () => {
  await migrator.users.addColumn('lastName', '');
  await migrator.users.deleteColumn('age');
  await migrator.users.renameColumn('name', 'firstName');
};

migrate();
```

## API

### Migrator methods

#### constructor(settings)

Create instance of migrator with specified collections. After creating, you can use collections methods (e.g. `users.addColumn`, `books.deleteColumn`).

### Collection methods

#### .addColumn(column[, defaultValue])

Add column with optional default value.

```js
// add column 'lastName' with default value ''
await migrator.users.addColumn('lastName', '');
```

#### .deleteColumn(column)

Delete column.

```js
// delete column 'age'
await migrator.users.deleteColumn('age');
```

#### .renameColumn(oldColumn, newColumn)

Rename column.

```js
// rename column 'name' to 'firstName'
await migrator.users.renameColumn('name', 'firstName');
```


## License

MIT.
