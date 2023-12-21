
const shardQueries = require('../../../../persistence/ShardQueries');


module.exports = async (req, res) => {

    console.log('getting shard file');

    let sourceid = req.params.sourceid;
    let shardid = req.params.shardid;


    let queryShard = await shardQueries.selectShard(shardid);

    // equals empty array?? not intuitive but it works...
    if (queryShard == '') {
        console.log('shard does not exist');
        res.status(400).send({ 'message': `Shard not found` })
    }
    else {

        const file = `/data/live/sources/${sourceid}/shards/${shardid}_sh.${queryShard[0].fileEnding}`;

        console.log(`Downloaded file for shard #${shardid}, at path ${file}`);

        res.download(file);

    }




};