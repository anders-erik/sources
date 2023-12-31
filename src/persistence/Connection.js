

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = process.env.SQLITE_DB_LOCATION || '/data/live/sources.db';

let db;



db = new sqlite3.Database(location, err => {
    if (err) return rej(err);

    if (process.env.NODE_ENV !== 'test')
        console.log(`Using sqlite database at ${location}`);

    //console.log('Database Init: ');
    //console.log(dirName);

    // Foreign Key not applying??
    // https://stackoverflow.com/questions/9937713/does-sqlite3-not-support-foreign-key-constraints
    // You need to enable foreign key ON EVERY QUERY, in order to fulfill backwards compatibility with sqlite 2.x
    // PRAGMA FOREIGN_keys = on;
    // 
    // I will for now, NOT be applying the constraints

    // CHANGED PLANS. I GUESS THIS WORKS??
    // https://github.com/TryGhost/node-sqlite3/issues/896
    db.get("PRAGMA foreign_keys = ON");

    db.run(
        `CREATE TABLE IF NOT EXISTS sources (
            "id"	INTEGER,
            "title"	varchar(255),
            "url"	varchar(255),
            "dateCreated"	varchar(16),
            "hasFile"	INTEGER,
            "fileType"	varchar(8),
            "fileEnding"	varchar(8),
            PRIMARY KEY("id" AUTOINCREMENT)
        );`,
        (err, result) => {
            if (err) return rej(err);
        },
    );
    db.run( 
        `CREATE TABLE IF NOT EXISTS "sourceReviewDates" (
            "id"	INTEGER,
            "date"	varchar(10),
            "completed"	INTEGER,
            "sourceId"	INTEGER NOT NULL,
            FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
        (err, result) => {
            if (err) return rej(err);
        },
    ); 
    db.run( 
        `CREATE TABLE IF NOT EXISTS shards (
            "id"	INTEGER,
            "prompt"	varchar(255),
            "dateCreated"	varchar(10),
            "fileType"	varchar(8),
            "fileEnding"	varchar(8),
            "textContent"	TEXT,
            "sourceId"	INTEGER NOT NULL,
            FOREIGN KEY("sourceId") REFERENCES "sources"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
        (err, result) => {
            if (err) return rej(err);
        },
    ); 
    db.run(
        `CREATE TABLE IF NOT EXISTS shardReviewDates (
            "id"	INTEGER,
            "date"	varchar(10),
            "completed"	INTEGER,
            "shardId"	INTEGER NOT NULL,
            FOREIGN KEY("shardId") REFERENCES "shards"("id"),
            PRIMARY KEY("id" AUTOINCREMENT)
        );`, // FOREIGN KEY(sourceId) REFERENCES sources(id)
        (err, result) => {
            if (err) return rej(err);
        },
    );
    
    // this is needed. Otherwise program exits!!
    //acc();
});

async function teardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}


module.exports = {
    db,
	//init,
	teardown
}



