
const connection = require('./Connection');



async function selectAllLikeString(searchstring, limit, order) {

    // Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';
    //console.log(order);


    // 'Need' to change 'ORDER BY ASC/DESC'. 
    //  API provides a boolean value to be passed, which is converted to ASC/DESC at API endpoint
    // https://stackoverflow.com/questions/39559072/sqlite3-query-order-by-parameter-with-notation
    let queryString = `

        SELECT * FROM sources 
        WHERE title 
        LIKE ? 
        ORDER BY id {}
        LIMIT ?

    `
    queryString = queryString.replace('{}', order);
    

    return new Promise((acc, rej) => {
        // 'IS NULL' was added to not ignore newly created entries
        connection.db.all( queryString, [string, limit], (err, rows) => {

            // changed 2023-12-20
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function selectDatesAndLikeString(searchstring, limit, fromdate, todate, order) {

	// Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';

    // 'Need' to change 'ORDER BY ASC/DESC'. 
    //  API provides a boolean value to be passed, which is converted to ASC/DESC at API endpoint
    // https://stackoverflow.com/questions/39559072/sqlite3-query-order-by-parameter-with-notation
    let queryString = `

        SELECT * FROM sources 
        WHERE dateCreated >= ? 
        AND dateCreated <= ? 
        AND title LIKE ?
        ORDER BY id {}
        LIMIT ?

    `
    queryString = queryString.replace('{}', order);


    return new Promise((acc, rej) => {
        connection.db.all(queryString, [fromdate, todate, string, limit], (err, rows) => {

            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}




async function selectForReview(searchstring, limit) {

	// Didnt get the query parameter to work with " LIKE '%?%' ". 
    // No idea why the linked example works either. Probably something to do with the apstrophes.
    // https://stackoverflow.com/questions/63652590/issue-in-sqlite-while-using-node-js-like-operator-and-parameters
    let string = '%' + searchstring + '%';

    return new Promise((acc, rej) => {
        connection.db.all(`

                SELECT DISTINCT sources.* from sources
                INNER JOIN sourceReviewDates
                ON sources.id = sourceReviewDates.sourceId
                WHERE sourceReviewDates.date <= DATE('now')
                AND sourceReviewDates.completed = 0
                AND sources.title LIKE ?
                ORDER BY sourceReviewDates.date DESC
                LIMIT ?
        
            `, [string , limit ], (err, rows) => {

            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}




// NOT WORKING - somehow 'fileType' and 'fileEnding' were both converted to objects. Referencing index '0' solved it...
// https://stackoverflow.com/questions/67517796/row-is-object-object-when-fetching-a-database-row-in-sqlite3
// I guess the match-regex i used to extract the infromation returns matches in an array. But the old query automatically extracted the string value...

// UPDATE: I no longer pass an array with ONE string. good job past me...
async function updateSourceFileInfo(sourceId, fileType, fileEnding) {

    //console.log('POSTPOST' +' '+ sourceId +' '+ fileType +' '+ fileEnding);
    //console.log(typeof(fileType[0]));

    return new Promise((acc, rej) => {
        connection.db.all("UPDATE sources SET fileType = ?, fileEnding=?, hasFile=1 WHERE id=?", [fileType, fileEnding, sourceId], (err, rows) => {
            if (err) {
                return rej(err);
                //throw err;
            } 
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}


async function insertEmptySource() {
    return new Promise((acc, rej) => {
        connection.db.run(
            "INSERT INTO sources (title, url, dateCreated, hasFile) values('', '', DATE('now'), 0)",
            (err, rows)  => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

async function selectMaxId() {
    return new Promise((acc, rej) => {
        connection.db.all('SELECT MAX(id) FROM sources', (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}


async function selectSource(sourceId) {
    return new Promise((acc, rej) => {
        connection.db.all('SELECT * FROM sources WHERE id=?', [sourceId], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}



async function updateSourceTitleUrl(sourceId, title, url) {

    return new Promise((acc, rej) => {
        connection.db.all("UPDATE sources SET title=?, url=? WHERE id=?", [title, url, sourceId], (err, rows) => {
            if (err) {
                return rej(err);
                //throw err;
            } 
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}


async function deleteSource(id) {
    return new Promise((acc, rej) => {
        connection.db.all('DELETE FROM sources WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}




////////////////////////////////////////////////////


// async function getSource(id) {
//     return new Promise((acc, rej) => {
//         connection.db.all('SELECT * FROM sources WHERE id=?', [id], (err, rows) => {
//             if (err) return rej(err);
//             acc(
//                 rows.map(item =>
//                     Object.assign({}, item, {
//                         completed: item.completed === 1,
//                     }),
//                 ),
//             );
//         });
//     });
// }

// async function storeSource() {
//     return new Promise((acc, rej) => {
//         connection.db.run(
//             "INSERT INTO sources (dateCreated, hasFile) values(DATE('now'), 0)",
//             (err, rows)  => {
//                 if (err) return rej(err);
//                 acc();
//             },
//         );
//     });
// }

// async function updateSource(item) {
//     return new Promise((acc, rej) => {
//         connection.db.run(
//             'UPDATE sources SET id=?, title=?, url=?, dateCreated=? WHERE sources.id=?',
//             [item.id, item.title, item.url, item.dateCreated, item.id],
//             err => {
//                 if (err) return rej(err);
//                 acc();
//             },
//         );
//         return 'query ok :)';
//     });
// }

// async function deleteSource(id) {
//     return new Promise((acc, rej) => {
//         connection.db.all('DELETE FROM sources WHERE id=?', [id], (err, rows) => {
//             if (err) return rej(err);
//             acc(
//                 rows.map(item =>
//                     Object.assign({}, item, {
//                         completed: item.completed === 1,
//                     }),
//                 ),
//             );
//         });
//     });
// }


module.exports = {
    selectAllLikeString,
    selectDatesAndLikeString,
    selectForReview,
    updateSourceFileInfo,
    insertEmptySource,
    selectMaxId,
    selectSource,
    updateSourceTitleUrl,
    deleteSource,

	// getSource,
    // storeSource,
    // updateSource,
    
}
