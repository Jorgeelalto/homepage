console.log("Processing film list...")

// ----------------
// Global variables
// ----------------

// Get placeholder and remove it later
film_table = document.getElementById("film-table")
placeholder = film_table.rows[1].cloneNode(true)
film_table.deleteRow(1)
// Film list
list = [];


// ---------
// Functions
// ---------

function getListFromHTML() {
	html_list = document.getElementById("draft-film-list").innerText.split("\n")
	html_list = html_list.map((element) => element.trim())
	console.log("Found " + html_list.length + " films")
	list = []
	for (const film of html_list) {
		if (film) {
			name = film.replace(RegExp(' \\\([0-9- ]+\\\)', "i"), "")
			year = film.match(RegExp('\\\([0-9- ]+\\\)', "i"))[0]
				.replace("(", "").replace(")", "")
			list.push({'title': name, 'year': year})
		}
	}
	return list
}


function cleanListInHTML() {
	film_table = document.getElementById("film-table")
	while (film_table.rows.length > 1) {
		film_table.deleteRow(-1)
	}
	return true;
}


function drawListIntoHTML(list) {
	cleanListInHTML()
	for (const film of list) {
		if (film) {
			new_item = film_table.insertRow()

			name_cell = new_item.insertCell(0)
			name_cell.className = placeholder.cells[0].className
			name_cell.innerText = film['title']

			year_cell = new_item.insertCell(1)
			year_cell.className = placeholder.cells[1].className
			year_cell.innerText = film['year']
		}
	}
	return list
}


function sortListByTitle(list) {
	return list.sort(
		(a, b) => (a['title'] > b['title']) ? 1 : ((a['title'] < b['title']) ? -1 : 0)
	)
}

function sortListByYear(list) {
	return list.sort(
		(a, b) => (a['year'] > b['year']) ? 1 : ((a['year'] < b['year']) ? -1 : 0)
	)
}


// -----
// Hooks
// -----

function hookSortByTitle() {
	console.log("Sorting list by title...")
	return drawListIntoHTML(sortListByTitle(list))
}

function hookSortByYear() {
	console.log("Sorting list by year...")
	return drawListIntoHTML(sortListByYear(list))
}

// ----------
// Executions
// ----------

list = getListFromHTML()
drawListIntoHTML(list)
