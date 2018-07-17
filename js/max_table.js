window.maxTable = (function () {
	var table_obj;
	function createElement(ele) {
		if (typeof ele != undefined && ele != "") {
			return document.createElement(ele);
		} else {
			return "";
		}
	}

	function make_table_header(table, els) {
		var header = table.createTHead();
		var row = header.insertRow(0);
		var field = els.fields.length
		for (var i = 0; i < field; i++) {
			var cell = row.insertCell(i);
			cell.innerHTML = " " + els.fields[i].title;
			cell.className = "glyphicon glyphicon-sort";
			cell.setAttribute('tabindex', i);
			cell.addEventListener("click", table_sorting)
		}
		return table;
	}

	function table_sorting(cell) {
		var sorting = table_obj.fields[cell.path[0].cellIndex].isAscending = !table_obj.fields[cell.path[0].cellIndex].isAscending;
		var field = table_obj.fields[cell.path[0].cellIndex].field;
		if (sorting) {
			table_obj.data = table_obj.data.sort(function (a, b) {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			});
		} else {
			table_obj.data = table_obj.data.sort(function (a, b) {
				if (a[field] < b[field]) return 1;
				if (a[field] > b[field]) return -1;
				return 0;
			});
		}
		createTable(table_obj)
	}

	function search_results() {
		let keyWord = this.value;
		var newObject = table_obj.data;
		console.log(table_obj.data)
		var newArray = [];
		table_obj.data.filter(function (value, key) {
			// return this.value === value.name
			console.log(key)
			for (var i in value) {
				// debugger;
				// console.log(value[i].toString().indexOf(keyWord))
				if (value[i].toString().toLowerCase().indexOf(keyWord) != -1) {
					console.log(value)
					newArray[key] = value;
				}
			}

		})
		if (newArray.length > 0) {
			newObject.data = newArray;
		} else {
			newObject.data = table_obj.data;
		}
		createTable(newObject)
		// this.value
		// console.log(newObject.data);
	}

	function make_table_body(table, els) {
		var header = table.createTBody();
		var field = els.fields.length;
		var dataLength = els.data.length;
		for (var i = 0; i < dataLength; i++) {
			var row = header.insertRow(i);
			for (var j = 0; j < field; j++) {
				var cell = row.insertCell(j);
				cell.innerHTML = els.data[i][els.fields[j].field];
				cell.className = "max-body";
			}
		}
		return table;
	}

	function createTable(els) {
		table_obj = els;
		var div = document.getElementById(els.tableId);
		// div.innerHTML = "";	
		var divGroup = createElement("div");
		var divGroupChild = createElement("div");
		divGroup.className = "form-group pull-right";
		divGroupChild.className = "col-md-10 padding-right-none";
		var input = createElement("input");
		var label = createElement("label");
		label.className = "control-label col-md-2";
		label.innerHTML = "Search";
		input.className = "form-control";
		input.setAttribute("id", "search");
		input.setAttribute("type", "text");
		input.addEventListener('keyup', search_results)
		divGroup.appendChild(label)
		divGroupChild.appendChild(input)
		divGroup.appendChild(divGroupChild)
		var table = createElement("table");
		table.className = "table table-bordered";
		make_table_header(table, els);
		make_table_body(table, els);
		div.appendChild(divGroup)
		div.appendChild(table);
	}

	var maxTable = {
		get: function (selector) {
			createTable(selector);
		}
	};

	return maxTable;
}());