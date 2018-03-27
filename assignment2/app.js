(function() {
'use strict';

var app = angular.module('ShoppingListCheckOff', []);
app.controller('ToBuyController', ToBuyController);
app.controller('AlreadyBoughtController', AlreadyBoughtController);
app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var service = this;
  // Initial values in shopping list.
  var shoppingList = [
     {name: "Bread", quantity: 2, units: "loaves"},
     {name: "Cheese", quantity: 600, units: "grams"},
     {name: "Mustard", quantity: 2, units: "jars"},
     {name: "Tomatoes", quantity: 6, units: ""},
     {name: "Lettuce", quantity: 1, units: "heads"},
     {name: "Cashews", quantity: 200, units: "grams"}
  ];
  var toBuyList = shoppingList.slice();
  var boughtList = [];

  service.buyItem = function(itemIndex) {
    var item = toBuyList[itemIndex];
    boughtList.push(item);
    toBuyList.splice(itemIndex, 1);
    service.numberToBuy = toBuyList.length;
    service.numberBought = boughtList.length;
    console.log("service.toBuyList:", service.numberToBuy);
    console.log("service.boughtList:", service.numberBought);
  };

  service.returnItem = function(itemIndex) {
    var item = boughtList[itemIndex];
    toBuyList.push(item);
    boughtList.splice(itemIndex, 1);

    service.numberToBuy = toBuyList.length;
    service.numberBought = boughtList.length;
    console.log("[service.returnItem] numberToBuy:", service.numberToBuy);
    console.log("[service.returnItem] numberBought:", service.numberBought);
  };

  service.getToBuyItems = function() {
    return toBuyList;
  };
  service.getBoughtItems = function() {
    return boughtList;
  };
  service.getNumberToBuy = function() {
    return toBuyList.length;
  };
  service.getNumberBought = function() {
    return boughtList.length;
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.itemList = ShoppingListCheckOffService.getToBuyItems();
  toBuy.numItems = ShoppingListCheckOffService.getNumberToBuy();

  // console.log("toBuyController:", toBuy.itemList.length,
  //   toBuy.numItems, toBuy.numItems==0);

  toBuy.buyItem = function(itemIndex) {
    // Call .buyItem() method in service to update lists.
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

  toBuy.getNumberToBuy = function() {
    toBuy.numItems = ShoppingListCheckOffService.getNumberToBuy();
    return toBuy.numItems;
  };
} // ends ToBuyController

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.itemList = ShoppingListCheckOffService.getBoughtItems();
  bought.numItems = ShoppingListCheckOffService.getNumberBought();
  // console.log("boughtController:", bought.itemList.length,
  //   bought.numItems, bought.numItems==0);

  bought.returnItem = function(itemIndex) {
    // Call .returnItem() in service.
    ShoppingListCheckOffService.returnItem(itemIndex);
  };

  bought.getNumberBought = function() {
    bought.numItems = ShoppingListCheckOffService.getNumberBought();
    return bought.numItems
  };
} // ends AlreadyBoughtController

})(); // ends iffe
