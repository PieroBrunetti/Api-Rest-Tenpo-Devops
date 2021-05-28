// Operations are related with users
module.exports = (sequelize, Sequelize) => {
    const Operation = sequelize.define("operations", {
      term1: {
        type: Sequelize.DOUBLE
      },
      term2: {
        type: Sequelize.DOUBLE
      },
      result: {
          type: Sequelize.DOUBLE
      }
    });
  
    return Operation;
  };