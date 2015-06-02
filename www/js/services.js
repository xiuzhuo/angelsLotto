angular.module('starter.services', [])
.factory('Games', function($http, $window){
  var server = {
    host : 'https://www.lotto.de/'
  };
  var createNumberArray = function(end, begin){
    if (!begin || begin <= 0){
      begin = 1;
    }
    var nums = [];
    for (var i = 0 + begin; i<=end; i++){
      nums.push(i);
    }
    return nums;
  }
  var games = [
      {
        id  : 0,
        name : '6aus49',
        apis : {
          archiv : 'bin/6aus49_archiv/'
        },
        normalNumbersCount : 6,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 1,
        specialNumbers : createNumberArray(10),
      },
      {
        id  : 1,
        name : 'Spiel77',
        apis : {
          archiv : 'bin/ej_archiv/'
        },
        normalNumbersCount : 5,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 2,
        specialNumbers : createNumberArray(10),
      },
      {
        id  : 2,
        name : 'Super6',
        apis : {
          archiv : 'bin/gs_archiv/'
        },
        normalNumbersCount : 6,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 1,
        specialNumbers : createNumberArray(10),
      },
      {
        id  : 3,
        name : 'Keno',
        apis : {
          archiv : 'bin/keno_archiv/'
        },
        normalNumbersCount : 6,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 1,
        specialNumbers : createNumberArray(10),
      }
  ];
  var actions = {
    all : function() {
      return games;
    },
    size : function() {
      return games.length;
    },
    get : function(gameId) {
      for (var i = 0; i < games.length; i++) {
        if (games[i].id === parseInt(gameId) || games[i].id === gameId) {
          return games[i];
        }
      }
      return null;
    },
    call : function(game){
      console.log(server.host + game.apis.archiv);
    },
    getSelected : function(){
      var selectedGameId = $window.localStorage['selectedGameId'] || 0;
      return actions.get(selectedGameId);
    },
    saveSelected : function(game){
      $window.localStorage['selectedGameId'] = game.id;
    }
  };
  return actions;
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
