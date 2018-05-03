var friends = require('../data/friends.js');


module.exports = function (app) {
// Show all friends in API format

app.get("/api/friends/:friend?", function (req, res) {
  var chosen = req.params.friend;

  if (chosen) {
    for (var i = 0; i < friends.length; i++) {
      console.log(chosen);

      if (friends[i].routeName === chosen) {
        res.json(friends[i])
        return;
      }
    }
    res.send("No friend found");
  } else {
    res.json(friends);
	}
})



// Get friend post req
app.post('/api/friends', function(req, res){
	// Find friend
	var index = findFriend(req.body,friends);
	// Add friend
	friends.push(req.body);
	//jsonfile.writeFileSync(file, friends, {spaces: 2});
	// Respond to client with friend
	res.json(friends[index]);
})
}


function findFriend(self,friends) {
	var friend = {};
	// Loop through all friends
	for (var i in friends) {
		var diff = 0;
		// Loop through all scores
		for (var j in friends[i].scores) {
			// Calculate difference
			diff += Math.abs(Number(self.scores[j]) - Number(friends[i].scores[j]));
		}
		// If there is no diff already found, add
		if (friend.diff === undefined) {
			friend.diff = diff;
			friend.index = i;
			// Else see if difference is lower then add diff and index
		} else {
			if (diff < friend.diff) {
				friend.diff = diff;
				friend.index = i;
			}
		}
	}
	console.log(friend);
	return friend.index;
}
