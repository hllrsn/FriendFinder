var friendsData = require("../data/friends");

module.exports = function (app) {
    
    // User is shown data
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // User submits data
    app.post("/api/friends", function (req, res) {

        function indexOfMin(array) {
            let leastDifference = 0;
            for (let i = 1; i < array.length; i++) {
                if (array[i] < array[leastDifference]) {
                    leastDifference = i;
                }
            }
            return leastDifference;
        }

        // User survey data
        let newUserData = req.body;
        console.log(newUserData);

        // Convert user scores
        let newUserScoreInts = newUserData.scores.map(Number);
        console.log("New User Scores: " + newUserScoreInts);

        // Create an array to capture totalDifference values
        let totalDifferenceArr = [];

        // Convert scores for each friend from strings to integers
        for (let i = 0; i < friendsData.length; i++) {

            let friendsScoreInts = friendsData[i].scores.map(Number);
            console.log("Friend #" + (i + 1) + ": " + friendsScoreInts);

            // Tally totalDifference value between user and friend
            let totalDifference = 0;

            for (let questionNum = 0; questionNum < 10; questionNum++) {
                totalDifference += (Math.abs(friendsScoreInts[questionNum] - newUserScoreInts[questionNum]));
            }

            totalDifferenceArr.push(totalDifference);
        };

        console.log("Total Difference: " + totalDifferenceArr);

        console.log("Most Compatible: " + indexOfMin(totalDifferenceArr));

        let mostCompatibleFriend = friendsData[indexOfMin(totalDifferenceArr)];

        res.send(mostCompatibleFriend);
        
        friendsData.push(newUserData);

    });
};
