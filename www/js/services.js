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
          archiv : server.host + 'bin/6aus49_archiv/'
        },
        normalNumbersCount : 6,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 1,
        specialNumbers : createNumberArray(10),
        dummyData : '{"2015-06-03":{"spiel77":{"spieleinsatz":"5487242.50","quoten":[{"klasse":1,"beschreibung":"richtige Gewinnzahl","jackpot":"77588.40","anzahl":1,"quote":"1277777.00","kurzbeschreibung":"7 Endz."},{"klasse":2,"beschreibung":"6 richtige Endziffern","jackpot":null,"anzahl":1,"quote":"77777.00","kurzbeschreibung":"6 Endz."},{"klasse":3,"beschreibung":"5 richtige Endziffern","jackpot":null,"anzahl":16,"quote":"7777.00","kurzbeschreibung":"5 Endz."},{"klasse":4,"beschreibung":"4 richtige Endziffern","jackpot":null,"anzahl":139,"quote":"777.00","kurzbeschreibung":"4 Endz."},{"klasse":5,"beschreibung":"3 richtige Endziffern","jackpot":null,"anzahl":1624,"quote":"77.00","kurzbeschreibung":"3 Endz."},{"klasse":6,"beschreibung":"2 richtige Endziffern","jackpot":null,"anzahl":18014,"quote":"17.00","kurzbeschreibung":"2 Endz."},{"klasse":7,"beschreibung":"1 richtige Endziffer","jackpot":null,"anzahl":174849,"quote":"5.00","kurzbeschreibung":"1 Endz."}],"waehrung":"EUR","gewinnzahlen":"5234062"},"super6":{"spieleinsatz":"2348952.50","quoten":[{"klasse":1,"beschreibung":"6 richtige Endziffern","jackpot":null,"anzahl":1,"quote":"100000.00","kurzbeschreibung":"6 Endz."},{"klasse":2,"beschreibung":"5 richtige Endziffern","jackpot":null,"anzahl":14,"quote":"6666.00","kurzbeschreibung":"5 Endz."},{"klasse":3,"beschreibung":"4 richtige Endziffern","jackpot":null,"anzahl":133,"quote":"666.00","kurzbeschreibung":"4 Endz."},{"klasse":4,"beschreibung":"3 richtige Endziffern","jackpot":null,"anzahl":1303,"quote":"66.00","kurzbeschreibung":"3 Endz."},{"klasse":5,"beschreibung":"2 richtige Endziffern","jackpot":null,"anzahl":12143,"quote":"6.00","kurzbeschreibung":"2 Endz."},{"klasse":6,"beschreibung":"1 richtige Endziffer","jackpot":null,"anzahl":126586,"quote":"2.50","kurzbeschreibung":"1 Endz."}],"waehrung":"EUR","gewinnzahlen":"575570"},"history":{},"date":"2015-06-03","kw":23,"lotto":{"spieleinsatz":"23059778.00","zusatzzahl":null,"quoten":[{"klasse":1,"beschreibung":"6 Richtige + SZ","anzahl":0,"quote":"0.00","kurzbeschreibung":"6 + SZ"},{"klasse":2,"beschreibung":"6 Richtige","anzahl":1,"quote":"846698.30","kurzbeschreibung":"6"},{"klasse":3,"beschreibung":"5 Richtige + SZ","anzahl":39,"quote":"10855.10","kurzbeschreibung":"5 + SZ"},{"klasse":4,"beschreibung":"5 Richtige","anzahl":323,"quote":"3932.00","kurzbeschreibung":"5"},{"klasse":5,"beschreibung":"4 Richtige + SZ","anzahl":2072,"quote":"204.30","kurzbeschreibung":"4 + SZ"},{"klasse":6,"beschreibung":"4 Richtige","anzahl":16256,"quote":"52.00","kurzbeschreibung":"4"},{"klasse":7,"beschreibung":"3 Richtige + SZ","anzahl":40649,"quote":"20.80","kurzbeschreibung":"3 + SZ"},{"klasse":8,"beschreibung":"3 Richtige","anzahl":332038,"quote":"11.40","kurzbeschreibung":"3"},{"klasse":9,"beschreibung":"2 Richtige + SZ","anzahl":317416,"quote":"5.00","kurzbeschreibung":"2 + SZ"}],"waehrung":"EUR","gewinnzahlen":["8","20","23","24","37","48"],"superzahl":"6"},"game":"6 aus 49","complete":1,"year":2015}}',
      },
      {
        id  : 1,
        name : 'Euro Jackpot',
        apis : {
          archiv : server.host + 'bin/ej_archiv/'
        },
        normalNumbersCount : 5,
        normalNumbers : createNumberArray(49),
        specialNumbersCount : 2,
        specialNumbers : createNumberArray(10),
        dummyData : '{"years":[2015,2014,2013,2012],"2015-06-05":{"date":"2015-06-05","ej":{"spieleinsatz":"27821978.00","quoten":[{"klasse":1,"beschreibung":"5 Richtige + 2 Eurozahlen","anzahl":1,"quote":"23251598.30","kurzbeschreibung":"5 + 2"},{"klasse":2,"beschreibung":"5 Richtige + 1 Eurozahl","anzahl":1,"quote":"1182434.00","kurzbeschreibung":"5 + 1"},{"klasse":3,"beschreibung":"5 Richtige + 0 Eurozahlen","anzahl":1,"quote":"417329.60","kurzbeschreibung":"5 + 0"},{"klasse":4,"beschreibung":"4 Richtige + 2 Eurozahlen","anzahl":21,"quote":"6624.20","kurzbeschreibung":"4 + 2"},{"klasse":5,"beschreibung":"4 Richtige + 1 Eurozahl","anzahl":380,"quote":"329.40","kurzbeschreibung":"4 + 1"},{"klasse":6,"beschreibung":"4 Richtige + 0 Eurozahlen","anzahl":650,"quote":"149.80","kurzbeschreibung":"4 + 0"},{"klasse":7,"beschreibung":"3 Richtige + 2 Eurozahlen","anzahl":1181,"quote":"70.60","kurzbeschreibung":"3 + 2"},{"klasse":8,"beschreibung":"2 Richtige + 2 Eurozahlen","anzahl":17738,"quote":"24.30","kurzbeschreibung":"2 + 2"},{"klasse":9,"beschreibung":"3 Richtige + 1 Eurozahl","anzahl":18390,"quote":"22.60","kurzbeschreibung":"3 + 1"},{"klasse":10,"beschreibung":"3 Richtige + 0 Eurozahlen","anzahl":31658,"quote":"18.80","kurzbeschreibung":"3 + 0"},{"klasse":11,"beschreibung":"1 Richtige + 2 Eurozahlen","anzahl":100373,"quote":"10.80","kurzbeschreibung":"1 + 2"},{"klasse":12,"beschreibung":"2 Richtige + 1 Eurozahl","anzahl":289369,"quote":"9.10","kurzbeschreibung":"2 + 1"}],"waehrung":"EUR","gewinnzahlen":["19","38","40","41","50"],"zwei_aus_acht":["1","5"]},"year":"2015"},"2015":[{"pretty":"Freitag, 05.06.2015","date":"2015-06-05"},{"pretty":"Freitag, 29.05.2015","date":"2015-05-29"},{"pretty":"Freitag, 22.05.2015","date":"2015-05-22"},{"pretty":"Freitag, 15.05.2015","date":"2015-05-15"},{"pretty":"Freitag, 08.05.2015","date":"2015-05-08"},{"pretty":"Freitag, 01.05.2015","date":"2015-05-01"},{"pretty":"Freitag, 24.04.2015","date":"2015-04-24"},{"pretty":"Freitag, 17.04.2015","date":"2015-04-17"},{"pretty":"Freitag, 10.04.2015","date":"2015-04-10"},{"pretty":"Freitag, 03.04.2015","date":"2015-04-03"},{"pretty":"Freitag, 27.03.2015","date":"2015-03-27"},{"pretty":"Freitag, 20.03.2015","date":"2015-03-20"},{"pretty":"Freitag, 13.03.2015","date":"2015-03-13"},{"pretty":"Freitag, 06.03.2015","date":"2015-03-06"},{"pretty":"Freitag, 27.02.2015","date":"2015-02-27"},{"pretty":"Freitag, 20.02.2015","date":"2015-02-20"},{"pretty":"Freitag, 13.02.2015","date":"2015-02-13"},{"pretty":"Freitag, 06.02.2015","date":"2015-02-06"},{"pretty":"Freitag, 30.01.2015","date":"2015-01-30"},{"pretty":"Freitag, 23.01.2015","date":"2015-01-23"},{"pretty":"Freitag, 16.01.2015","date":"2015-01-16"},{"pretty":"Freitag, 09.01.2015","date":"2015-01-09"},{"pretty":"Freitag, 02.01.2015","date":"2015-01-02"}]}',
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
        dummyData : '{"2015-06-06":{"gs":{"spieleinsatz":"4220453.00","quoten":[{"klasse":1,"beschreibung":"1 richtige Endziffern","anzahl":"82900.5","quote":"10.00","text":"","kurzbeschreibung":"1 Endz."},{"klasse":2,"beschreibung":"2 richtige Endziffern","anzahl":"10083.2","quote":"20.00","text":"","kurzbeschreibung":"2 Endz."},{"klasse":3,"beschreibung":"3 richtige Endziffern","anzahl":"739.1","quote":"50.00","text":"","kurzbeschreibung":"3 Endz."},{"klasse":4,"beschreibung":"4 richtige Endziffern","anzahl":"71.2","quote":"500.00","text":"","kurzbeschreibung":"4 Endz."},{"klasse":5,"beschreibung":"5 richtige Endziffern","anzahl":"9.5","quote":"5000.00","text":"","kurzbeschreibung":"5 Endz."},{"klasse":6,"beschreibung":"6 richtige Endziffern","anzahl":"2.0","quote":"100000.00","text":"","kurzbeschreibung":"6 Endz."},{"klasse":7,"beschreibung":"7 richtige Endziffern","anzahl":"0.0","quote":"2010000.00","text":"7.500,00 EUR monatlich","kurzbeschreibung":"7 Endz."}],"waehrung":"EUR","gewinnzahlen":["4","56","209","1903","30165",["316590","459504"],["7996629","8949188"]]},"date":"2015-06-06","year":"2015"},"years":[2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991],"2015":[{"pretty":"Samstag, 06.06.2015","date":"2015-06-06"},{"pretty":"Samstag, 30.05.2015","date":"2015-05-30"},{"pretty":"Samstag, 23.05.2015","date":"2015-05-23"},{"pretty":"Samstag, 16.05.2015","date":"2015-05-16"},{"pretty":"Samstag, 09.05.2015","date":"2015-05-09"},{"pretty":"Samstag, 02.05.2015","date":"2015-05-02"},{"pretty":"Samstag, 25.04.2015","date":"2015-04-25"},{"pretty":"Samstag, 18.04.2015","date":"2015-04-18"},{"pretty":"Samstag, 11.04.2015","date":"2015-04-11"},{"pretty":"Samstag, 04.04.2015","date":"2015-04-04"},{"pretty":"Samstag, 28.03.2015","date":"2015-03-28"},{"pretty":"Samstag, 21.03.2015","date":"2015-03-21"},{"pretty":"Samstag, 14.03.2015","date":"2015-03-14"},{"pretty":"Samstag, 07.03.2015","date":"2015-03-07"},{"pretty":"Samstag, 28.02.2015","date":"2015-02-28"},{"pretty":"Samstag, 21.02.2015","date":"2015-02-21"},{"pretty":"Samstag, 14.02.2015","date":"2015-02-14"},{"pretty":"Samstag, 07.02.2015","date":"2015-02-07"},{"pretty":"Samstag, 31.01.2015","date":"2015-01-31"},{"pretty":"Samstag, 24.01.2015","date":"2015-01-24"},{"pretty":"Samstag, 17.01.2015","date":"2015-01-17"},{"pretty":"Samstag, 10.01.2015","date":"2015-01-10"},{"pretty":"Samstag, 03.01.2015","date":"2015-01-03"}]}',
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
        dummyData : '{"2015-06-07":{"game":"20 aus 70","date":"2015-06-07","kw":"23","plus5":{"gewinnzahlen":"11798"},"keno":{"spieleinsatz":"297993.00","waehrung":"EUR","gewinnzahlen":["6","7","20","23","30","32","34","36","38","39","45","49","51","52","57","58","63","64","66","70"]},"complete":1,"year":"2015"},"years":[2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004],"2015":[{"pretty":"23. KW 01.06. - 07.06.","kw":23,"bis":"2015-06-07","von":"2015-06-01"},{"pretty":"22. KW 25.05. - 31.05.","kw":22,"bis":"2015-05-31","von":"2015-05-25"},{"pretty":"21. KW 18.05. - 24.05.","kw":21,"bis":"2015-05-24","von":"2015-05-18"},{"pretty":"20. KW 11.05. - 17.05.","kw":20,"bis":"2015-05-17","von":"2015-05-11"},{"pretty":"19. KW 04.05. - 10.05.","kw":19,"bis":"2015-05-10","von":"2015-05-04"},{"pretty":"18. KW 27.04. - 03.05.","kw":18,"bis":"2015-05-03","von":"2015-04-27"},{"pretty":"17. KW 20.04. - 26.04.","kw":17,"bis":"2015-04-26","von":"2015-04-20"},{"pretty":"16. KW 13.04. - 19.04.","kw":16,"bis":"2015-04-19","von":"2015-04-13"},{"pretty":"15. KW 06.04. - 12.04.","kw":15,"bis":"2015-04-12","von":"2015-04-06"},{"pretty":"14. KW 30.03. - 05.04.","kw":14,"bis":"2015-04-05","von":"2015-03-30"},{"pretty":"13. KW 23.03. - 29.03.","kw":13,"bis":"2015-03-29","von":"2015-03-23"},{"pretty":"12. KW 16.03. - 22.03.","kw":12,"bis":"2015-03-22","von":"2015-03-16"},{"pretty":"11. KW 09.03. - 15.03.","kw":11,"bis":"2015-03-15","von":"2015-03-09"},{"pretty":"10. KW 02.03. - 08.03.","kw":10,"bis":"2015-03-08","von":"2015-03-02"},{"pretty":"09. KW 23.02. - 01.03.","kw":9,"bis":"2015-03-01","von":"2015-02-23"},{"pretty":"08. KW 16.02. - 22.02.","kw":8,"bis":"2015-02-22","von":"2015-02-16"},{"pretty":"07. KW 09.02. - 15.02.","kw":7,"bis":"2015-02-15","von":"2015-02-09"},{"pretty":"06. KW 02.02. - 08.02.","kw":6,"bis":"2015-02-08","von":"2015-02-02"},{"pretty":"05. KW 26.01. - 01.02.","kw":5,"bis":"2015-02-01","von":"2015-01-26"},{"pretty":"04. KW 19.01. - 25.01.","kw":4,"bis":"2015-01-25","von":"2015-01-19"},{"pretty":"03. KW 12.01. - 18.01.","kw":3,"bis":"2015-01-18","von":"2015-01-12"},{"pretty":"02. KW 05.01. - 11.01.","kw":2,"bis":"2015-01-11","von":"2015-01-05"},{"pretty":"01. KW 29.12. - 04.01.","kw":1,"bis":"2015-01-04","von":"2014-12-29"}],"2015-23":[{"pretty":"Sonntag 07.06.2015","date":"2015-06-07"},{"pretty":"Samstag 06.06.2015","date":"2015-06-06"},{"pretty":"Freitag 05.06.2015","date":"2015-06-05"},{"pretty":"Donnerstag 04.06.2015","date":"2015-06-04"},{"pretty":"Mittwoch 03.06.2015","date":"2015-06-03"},{"pretty":"Dienstag 02.06.2015","date":"2015-06-02"},{"pretty":"Montag 01.06.2015","date":"2015-06-01"}]}',
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
