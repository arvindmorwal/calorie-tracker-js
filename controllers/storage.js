// Storage Controller

const LOCAL_STORAGE_ITEMS = 'items';

const StorageCtrl = (function(){

  const setItem = function(newItem) {
    let items;
    if (localStorage.getItem(LOCAL_STORAGE_ITEMS) === null) {
      items = [];
      items.push(newItem);
    } else {
      items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS));

      // remove old item 
      items = items.filter(item => item.id !== newItem.id);
      
      // add the new or updated Item
      items.push(newItem);
    }

    localStorage.setItem(LOCAL_STORAGE_ITEMS, JSON.stringify(items));
  }

  const getItems = function() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS)) || [];
  }

  const deleteItem = function (toBeRemovedItem) {
    items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS));

    // remove old item 
    items = items.filter(item => item.id !== toBeRemovedItem.id);

    localStorage.setItem(LOCAL_STORAGE_ITEMS, JSON.stringify(items));
  }

  const clearAllItems = function() {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS);
  }

  return {
    setItem,
    getItems,
    deleteItem,
    clearAllItems
  }
})();