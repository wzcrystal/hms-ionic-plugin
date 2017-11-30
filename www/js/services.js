angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
})
  .factory('DataService', function($q){
    var factory = {getData:getData};
    return factory;
    function getData(page,pageSize, conditionValue){
      var data = {
        status: 'S',
        message: '',
        rows: [
          {addressId: 0, address: '长沙0'},
          {addressId: 1, address: '长沙1'},
          {addressId: 2, address: '长沙2'},
          {addressId: 3, address: '长沙3'},
          {addressId: 4, address: '长沙4'},
          {addressId: 5, address: '长沙5'},
          {addressId: 6, address: '长沙6'},
          {addressId: 7, address: '长沙7'},
          {addressId: 8, address: '长沙8'},
          {addressId: 9, address: '长沙9'},
          {addressId: 10, address: '长沙10'},
          {addressId: 11, address: '长沙11'},
          {addressId: 12, address: '长沙12'},
          {addressId: 13, address: '长沙13'},
          {addressId: 14, address: '长沙14'},
          {addressId: 15, address: '长沙15'},
          {addressId: 16, address: '长沙16'},
          {addressId: 17, address: '长沙17'},
          {addressId: 18, address: '长沙18'},
          {addressId: 19, address: '长沙19'},
          {addressId: 20, address: '长沙20'},
          {addressId: 21, address: '长沙21'},
          {addressId: 22, address: '长沙22'},
          {addressId: 23, address: '长沙23'},
          {addressId: 24, address: '长沙24'},
          {addressId: 25, address: '长沙25'},
          {addressId: 26, address: '长沙26'},
          {addressId: 27, address: '长沙27'},
          {addressId: 28, address: '长沙28'},
          {addressId: 29, address: '长沙29'},
          {addressId: 30, address: '长沙30'},
          {addressId: 31, address: '长沙31'},
          {addressId: 32, address: '长沙32'}
        ]
      };

      var rows = data.rows;
      var len = rows.length;
      var response = {
        status: 'S',
        message: '',
        total: 24,
        rows: []
      };
      var defer = $q.defer();
      var index = 0;
      for (var i = page * pageSize; i < (page + 1) * pageSize & i < len; i++) {
        response.rows[index] = rows[i];
        index++;
      }
      defer.resolve(response);
      return defer.promise;//data;//defer.promise;
    }
  });
