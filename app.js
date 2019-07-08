const App = (function(ItemCtrl, UICtrl){
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors;

  // Load event listeners
  const loadEventListeners = () => {
    // add list item listener
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // edit list item listener
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditSubmit);

    // edit item listener
    document.querySelector(UISelectors.editBtn).addEventListener('click', itemUpdateSubmit);

    // back item listener
    document.querySelector(UISelectors.backBtn).addEventListener('click', () => UICtrl.clearItemInput());

    // delete item listener
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // clear all items listener
    document.querySelector(UISelectors.clearAllBtn).addEventListener('click', itemClearAllSubmit);
  }

  // handler itemAdd
  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();

    const newItem = ItemCtrl.addItem(input.name, input.calories);
    UICtrl.addListItem(newItem);

    // update the total calories
    document.querySelector(UISelectors.totalCalories).innerText = ItemCtrl.getTotalCalories();

    UICtrl.clearItemInput();

    e.preventDefault();
  }

  const itemEditSubmit = (e) => {
    if (e.target.classList.contains(UISelectors.editItem)) {
      const listId = e.target.parentNode.parentNode.id;
      const id = parseInt(listId.split('-')[1]);
      const item = ItemCtrl.getItemById(id);

      UICtrl.editListItem(item);
    }
  }

  const itemUpdateSubmit = (e) => {
    const name = document.querySelector(UISelectors.itemNameInput).value;
    const calories = document.querySelector(UISelectors.itemCaloriesInput).value;

    ItemCtrl.setItem(name, calories); 

    // clear the input and update the list
    UICtrl.clearItemInput();

    const updatedItems = ItemCtrl.getItems();
    UICtrl.populateItems(updatedItems);
    UICtrl.defaultActionButtons();

    // update the total calories
    document.querySelector(UISelectors.totalCalories).innerText = ItemCtrl.getTotalCalories();
  }

  const itemDeleteSubmit = (e) => {
    ItemCtrl.deleteItem();

    // clear the input and update the list
    UICtrl.clearItemInput();

    const updatedItems = ItemCtrl.getItems();
    UICtrl.populateItems(updatedItems);
    UICtrl.defaultActionButtons();

    // update the total calories
    document.querySelector(UISelectors.totalCalories).innerText = ItemCtrl.getTotalCalories();
  }

  const itemClearAllSubmit = (e) => {
    ItemCtrl.clearAllItems();

    // clear the input and update the list
    UICtrl.clearItemInput();

    UICtrl.populateItems(ItemCtrl.getData().items);
    UICtrl.defaultActionButtons();

    // update the total calories
    document.querySelector(UISelectors.totalCalories).innerText = ItemCtrl.getTotalCalories();
  }

  return {
    init: function() {
      // get default action buttons
      UICtrl.defaultActionButtons();

      const items = ItemCtrl.getItems();

      document.querySelector(UISelectors.totalCalories).innerText = ItemCtrl.getTotalCalories();

      // disable enter key to submit
      document.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          return false;
        }
      })

      if (items.length < 1) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItems(items);
      }

      // load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();