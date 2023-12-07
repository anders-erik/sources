const db = require('../persistence/sqlite');

module.exports = async (req, res) => {

    const items = await db.getSources();
    
    console.log(items);
    
    res.send(items);
};
