const express = require("express");
const app = express();

const apps = require('./playstore.js');

app.listen(8000, () => {
    console.log("Server started on PORT 8000");
});


function filterByGenre(objs, genres) {

    retval = [];
    for (var i=0; i<objs.length; i++) {

        if (objs[i].Genres.includes(genres))
            retval.push(objs[i]);
    }

    return retval;
}

function compareAppStrings(obj1, obj2) {

    compare1 = obj1.Genres.toUpperCase();
    compare2 = obj2.Genres.toUpperCase();

    if (compare1 < compare2)
        return -1;

    if (compare2 < compare1)
        return 1;

    return 0;
}

function compareAppNumbers(obj1, obj2) {

    return obj2.Rating - obj1.Rating;
}


app.get("/apps", (req,res) => {

    retval = apps;

    const {sort, genres} = req.query;

    /* filter list if necessary */

    if (genres) {

        switch(genres) {

            case "Action":
            case "Puzzle":
            case "Strategy":
            case "Casual":
            case "Arcade":
            case "Card":
                retval = filterByGenre(retval, genres);
                break;
            
            default:
                return res.status(400).send("Parameter to sort is not understood");
        }
    }


    /* then sort */

    if (sort) {

        switch (sort) {
            case "rating":
                retval = retval.sort(compareAppNumbers);
                break;
            case "genres":
                retval = retval.sort(compareAppStrings);
                break;
            default:
                return res.status(400).send("Parameter to sort is not understood");
        }


    }

    res.json(retval);
});