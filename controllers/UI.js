// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#list-items',
    addBtn: '.add-btn',
    editBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    editItem: "edit-item",
    clearAllBtn: ".clear-btn"
  }

  const getName = () => document.querySelector(UISelectors.itemNameInput).value;
  const getCalories = () => document.querySelector(UISelectors.itemCaloriesInput).value;

  const setName = (name) => document.querySelector(UISelectors.itemNameInput).value = name;
  const setCalories = (calories) => document.querySelector(UISelectors.itemCaloriesInput).value = calories;

  return {
    populateItems: function (items) {
      const html = items.map(item => {
        return `<li id=list-${item.id} class="collection-item">
          <strong>${item.name}</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
      `;
      });

      // Add to UI
      document.querySelector(UISelectors.itemList).innerHTML = html.join(" ");
    },
    getSelectors: UISelectors,
    getItemInput: function () {
      return {
        name: getName(),
        calories: getCalories()
      }
    },
    clearItemInput: function () {
      setName('');
      setCalories('');
    },
    addListItem: function (item) {
      // show the listItems 
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const newListElement = document.createElement('li');
      // Add class name
      newListElement.classList.add('collection-item');
      // add id
      newListElement.id = `list-${item.id}`;
      // add html
      newListElement.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

      //Add it after the last li
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', newListElement);
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    editListItem: function (item) {
      this.editActionButtons();

      ItemCtrl.setCurrentItem(item);

      document.querySelector(UISelectors.itemNameInput).value = item.name;
      document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
    },
    defaultActionButtons: function () {
      document.querySelector(UISelectors.addBtn).style.display = 'block';
      document.querySelector(UISelectors.editBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },
    editActionButtons: function () {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.editBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
    }
  }
})();