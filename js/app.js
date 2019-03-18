const App = (function(model, view){
	const idGenerator = (function* (){
		let id = 1;
		
		while(true){
			yield id++;
		}
	})();

	const load = () => {
		const selectors = view.getSelectors();
		
		selectors
		.btnClearAll
		.addEventListener('click', clearAll);

		selectors
		.btnAdd
		.addEventListener('click', addItem);

		selectors
		.itemList
		.addEventListener('click', (event) => {
			let target; 

			const targetElement = event.target;
			const targetClasses = targetElement.classList;
			
			if(targetClasses.contains('edit-item') || targetClasses.contains('delete-item')){
				let items = model.getDataItems();
				let linkElement = targetElement.parentElement;
				let itemElement = linkElement.parentElement;

				let id = parseInt(itemElement.id.split('-')[1]);

				target = items.filter( item => item.id === id )[0];
			}

			if(targetClasses.contains('edit-item')){
				editItem(target);
			}
			else if(targetClasses.contains('delete-item')){
				removeItem(target);
			}
			
			event.preventDefault();
		});
		selectors
		.btnUpdate
		.addEventListener('click', updateItem);

		selectors
		.btnBack
		.addEventListener('click', clearInput);
	};
	
	const addItem = event => {
		const generator = idGenerator;
	
		const id = generator.next().value;
		const name = view.getItemName();
		const calories = parseInt(view.getItemCalories());
	
		if(name !== '' && calories !== NaN){
			model.addItem(id, name, calories); 	

			const items = model.getDataItems();
			const totalCalories = model.getTotalItemCalories();

			view.displayItemElements(items);
			view.displayTotalItemCalories(totalCalories);
		}
		
		event.preventDefault();
	};

	const updateItem = event => {
		const data = model.getData();
		const items = model.getDataItems();
		const target = model.getCurrentItem();

		let newTargetName = view.getItemName();
		let newTargetCalories = parseInt(view.getItemCalories());
	
		if(newTargetName === '' && newTargetCalories === ''){
			view.setDefaultState();		
		}
		else if(newTargetName === ''){
			newTargetName = target.name;
		}
		else if(newTargetCalories === ''){
			newTargetCalories = target.calories;
		}

		model.removeFromTotalCalories(target.calories);
		model.updateItem(newTargetName, newTargetCalories);
		model.addToTotalCalories(target.calories);
	
		view.displayItemElements(items);		
		view.displayTotalItemCalories(model.getTotalItemCalories());

		view.clearInput();
		view.setDefaultState();
	};
	
	const editItem = item => {
		view.clearInput();
		view.setEditState();

		model.setCurrentItem(item);
	};

	const removeItem = target => {
		const items = model.getDataItems();
	
		model.removeItem(target);

		const calories = model.getTotalItemCalories();

		view.displayItemElements(items);
		view.displayTotalItemCalories(calories);
	};

	const clearInput = event => {
		view.clearInput();
		view.setDefaultState();

		event.preventDefault();
	};

	const clearAll = event => {
		model.clearAll();

		view.clearAll();
		view.setDefaultState();
	
		if(localStorage.getItem('items')){
			localStorage.setItem('items', JSON.stringify([]));
		}

		event.preventDefault();
	};

	return {
		init: () => {
			const items = model.getDataItems();
			const calories = model.getTotalItemCalories();
			
			view.setDefaultState();
			view.displayItemElements(items);
			view.displayTotalItemCalories(calories);

			load();
		} 
	}	
})(Model, View);

App.init();
