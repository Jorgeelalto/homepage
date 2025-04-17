console.log("Processing film list...")

// Get list from HTML
list = document.getElementById("draft-film-list").innerText.split("\n")
list = list.map((element) => element.trim())
console.log("Found " + list.length + " films")

// Draw list into HTML
film_table = document.getElementById("film-table")
placeholder = film_table.rows[1].cloneNode(true)
for (const film of list) {
	if (film) {
		name = film.replace(RegExp(' \\\([0-9- ]+\\\)', "i"), "")
		year = film.match(RegExp('\\\([0-9- ]+\\\)', "i"))[0]
			.replace("(", "").replace(")", "")

		new_item = film_table.insertRow()

		name_cell = new_item.insertCell(0)
		name_cell.className = placeholder.cells[0].className
		name_cell.innerText = name

		year_cell = new_item.insertCell(1)
		year_cell.className = placeholder.cells[1].className
		year_cell.innerText = year
	}
}

// Remove placeholder
film_table.deleteRow(1)
