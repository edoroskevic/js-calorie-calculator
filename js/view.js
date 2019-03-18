const View = (function(){
	const UISelector = {
		itemList: document.querySelector('#item-list'), 
		totalCalories: document.querySelector('#total-calories'),

		inItemName: document.querySelector('#item-name'),
		inItemCalories: document.querySelector('#item-calories'),

		btnAdd: document.querySelector('#add-btn'),
		btnBack: document.querySelector('#back-btn'),
		btnUpdate: document.querySelector('#update-btn'),
		btnClearAll : document.querySelector('#clearAll-btn')
	};
	
	const UITextFormat = {
		fmtInputData: item => {
						 return `	
							<li class='collection-item' id='item-${item.id}'>
								<strong>${item.name}: </strong>
								<em>${item.calories} Calories</em>
								<a href='#' class='secondary-content'>
									<i class='fas fa-times delete-item'></i>
								</a>
								<a href='#' class='secondary-content'>
									<i class='fas fa-pencil-alt edit-item'></i>
								</a>
							</li>
						`;}
	};

	function stateDefault(){
		UISelector.btnAdd.style.display = 'inline-block';
		UISelector.btnUpdate.style.display = 'none';
		UISelector.btnBack.style.display = 'none';
	}

	function stateEdit(){
		UISelector.btnAdd.style.display = 'none';
		UISelector.btnUpdate.style.display = 'inline-block';
		UISelector.btnBack.style.display = 'inline-block';
	}

	return {
		setDefaultState: stateDefault,

		setEditState: stateEdit,
		
		clearInput: () => {
			UISelector.inItemName.value = '';
			UISelector.inItemCalories.value = '';
		},

		clearItemList: () => {
			UISelector.itemList.innerHTML = '';
		},

		clearTotalCalories: () => {
			UISelector.totalCalories.innerHTML = '0';
		},

		clearAll: () => {
			UISelector.inItemName.value = '';
			UISelector.inItemCalories.value = '';

			UISelector.itemList.innerHTML = '';

			UISelector.totalCalories.innerHTML = '0';
		},

		getItemName: () => {
			return UISelector.inItemName.value;
		},

		getItemCalories: () => {
			return UISelector.inItemCalories.value;
		},

		getSelectors: () => {
			return UISelector
		},

		addItemElement: item => {
			UISelector.itemList.innerHTML += UITextFormat.fmtInputData(item);
		},

		removeItemElement: item => {
			UISelector.itemList.remove(item);		
		},
		
		displayItemElements: items => {
			let html = '';

			const element = UISelector.itemList;
			
			element.innerHTML = '';

			items.forEach( data => {
				html += UITextFormat.fmtInputData(data);	
			});	

			element.innerHTML = html;
		},

		displayTotalItemCalories: calories => {
			const element = UISelector.totalCalories;
			element.innerHTML = calories;
		} 
	}

})();
