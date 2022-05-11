var table = {};
function fillAllTable(n) {
  const cab = document.getElementById("cab");
  $("#table tbody").remove();
  if (jQuery.isEmptyObject(table)) {
    fetch("https://git-repo-api.shynz0.repl.co")
      .then((resp) => resp.json())
      .then(function (data) {
        table = data;
        for (const item in data) {
          let value = data[item];
          cab.insertAdjacentHTML('beforebegin',
            `<tr><td><a href="${value.url}" target="_blank">${item}</a></td><td style="text-align: center">${value.date}</td></tr>`)
        }
      });
  } else {
    if (n == 0) {
      for (const item in table) {
        let value = table[item];
        cab.insertAdjacentHTML('beforebegin',
          `<tr><td><a href="${value.url}" target="_blank">${item}</a></td><td style="text-align: center">${value.date}</td></tr>`);
      }
    } else if (n == 1) {
      for (const item in table) {
        let value = table[item];
        if (value.archived == true) {
          cab.insertAdjacentHTML('beforebegin',
            `<tr><td><a href="${value.url}" target="_blank">${item}</a></td><td style="text-align: center">${value.date}</td></tr>`);
        }
      }
    } else if (n == 2) {
      for (const item in table) {
        let value = table[item];
        if (value.license == true) {
          cab.insertAdjacentHTML('beforebegin',
            `<tr><td><a href="${value.url}" target="_blank">${item}</a></td><td style="text-align: center">${value.date}</td></tr>`);
        }
      }
    } else if (n == 3) {
      for (const item in table) {
        let value = table[item];
        if (value.language == 'Python') {
          cab.insertAdjacentHTML('beforebegin',
            `<tr><td><a href="${value.url}" target="_blank">${item}</a></td><td style="text-align: center">${value.date}</td></tr>`);
        }
      }
    }
  }
}

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (n == 1) {
        datex = convertDate(x.innerHTML);
        datey = convertDate(y.innerHTML);
        if (dir == "asc") {
          if (datex > datey) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (datex < datey) {
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function convertDate(d) {
  var p = d.split("/");
  return +(p[2] + p[1] + p[0]);
}
