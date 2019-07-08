const ItemCtrl = (function(){
  
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const items = StorageCtrl.getItems();

  // state
  const data = {
    items,
    currentItem: null,
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      //create id
      let id;
      if(data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      calories = parseInt(calories);

      const newItem = new Item(id, name, calories);

      data.items.push(newItem);

      // push into localstorage
      StorageCtrl.setItem(newItem);

      //update total calories
      data.totalCalories += newItem.calories;

      return newItem;
    },
    getData: function() {
      return data;
    },
    setItem: function(name, calories) {
      // set new items
      const currentItem = data.items.find(item => data.currentItem.id === item.id);
      
      if(currentItem) {
        data.totalCalories -= currentItem.calories; //remove old calories

        currentItem.name = name;
        currentItem.calories = parseInt(calories);

        // update in localstorage
        StorageCtrl.setItem(currentItem);

        data.totalCalories += currentItem.calories; //add to total calories
      }

      return currentItem; 
    },
    getTotalCalories: function() {
      return data.items.reduce((acc, curr) => { 
        return acc += curr.calories }, 0);
    },
    setTotalCalories: function () {
      data.totalCalories = newTotalCalories;
    },
    getItemById: function(id) {
      return data.items.find(item => item.id === id);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    deleteItem: function() {
      const updatedItems = data.items.filter(item => item.id !== data.currentItem.id);

      // remove from local storage
      StorageCtrl.deleteItem(data.currentItem);

      data.items = updatedItems;
      data.currentItem = null;

      data.totalCalories = this.getTotalCalories();
    },
    clearAllItems: function() {
      data.items = [];
      data.currentItem = null;
      data.totalCalories = 0;
      StorageCtrl.clearAllItems();

    }
  }
})(StorageCtrl);
