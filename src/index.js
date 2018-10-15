const mongoose = require('mongoose');

module.exports = function ({ db = {}, collections }) {
  const {
    host = 'localhost', port = 27017, user, password, database,
  } = db;

  mongoose.connect(`mongodb://${host}:${port}`, {
    user,
    pass: password,
    dbName: database,
    useNewUrlParser: true,
  });

  const addColumn = (model, column, defaultValue = null) => model.updateMany({}, { $set: { [column]: defaultValue } });
  const deleteColumn = (model, column) => model.updateMany({}, { $unset: { [column]: '' } });
  const renameColumn = (model, oldColumn, newColumn) => model.updateMany({}, { $rename: { [oldColumn]: newColumn } });

  return collections.reduce((object, collection) => {
    const schema = new mongoose.Schema({}, { strict: false });
    const model = mongoose.model(collection, schema);

    return {
      ...object,
      [collection]: {
        addColumn: (column, defaultValue) => addColumn(model, column, defaultValue),
        deleteColumn: column => deleteColumn(model, column),
        renameColumn: (oldColumn, newColumn) => renameColumn(model, oldColumn, newColumn),
      },
    };
  }, {});
};
