/*
	author: edoroskevic
	date: 14/06/2017
*/
const Model = (function(){
	const Item = function(id, name, calories){
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	const data = {
		items: [],
		current: null,
		calories: 0
	};

	if(localStorage.getItem('items')){
		const storage = JSON.parse(localStorage.getItem('items'));
		data.items = storage;
		data.items.forEach(item => data.calories += item.calories);
	}

	return {
		getData: () => {
			return data
		},

		setDataItems: items => {
			data.items = items;
		},

		getDataItems: () => {
			return data.items
		},

		setCurrentItem: item => {
			data.current = item
		},

		getCurrentItem: () => {
			return data.current
		},

		addToTotalCalories: calories => {
			data.calories += calories
		},

		removeFromTotalCalories: calories => {
			data.calories -= calories
		},
	
		getTotalItemCalories: () => {
			return data.calories
		},

		clearAll: () => {
			data.items = [];
			data.current = null;
			data.calories = 0;
		},

		addItem: (id, name, calories) => {
			data.calories += calories;
			data.items.push(new Item(id, name, calories));	
		
			localStorage.setItem('items', JSON.stringify(data.items));
		},

		updateItem: (name, calories) => {
			const target = data.current;
			
			target.name = name;
			target.calories = calories;

			localStorage.setItem('items', JSON.stringify(data.items));
		},

		removeItem: item => {
			const items = data.items;
			const index = items.indexOf(item);

			if(index > -1){
				items.splice(index, 1);
				data.calories -= item.calories;

				localStorage.setItem('items', JSON.stringify(data.items));
			}
		}

			
	}
})();
