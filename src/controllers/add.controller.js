const db = require("../models");
const Operation = db.operation;
const User = db.user;
exports.add = async (req, res) => {
    let userId = req.userId;
    let sumTerms = Array.from(req.body);
    let termsCountAllowed = 2;
    if (sumTerms.length != termsCountAllowed) {
        res.status(422).send({
            "terms": Array.from(req.body),
            "error": `Too many terms: ${sumTerms.length}. It has to be exactly ${termsCountAllowed}`
        });
        return;
    }
    let result = req.body.reduce((a, b) => a + b);
    console.log('User', User, typeof User);

    const user = await User.findOne({
        where: {
          id: userId
        }
      });
    
      if (user == null ) {
        res.status(500).send({
            "terms": Array.from(req.body),
            "error": `Error retrieving data.`
        });
        return;
      }
    

    let operation = await Operation.create({
        term1: sumTerms[0],
        term2: sumTerms[1],
        result: result,
        userId: user.id
    });
    // FIXME: Log possible error
    
    res.status(200).send({
        "values": Array.from(sumTerms),
        "result": result
    });
};