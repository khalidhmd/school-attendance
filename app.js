var model = {
  init: function () {
    if (!localStorage.attendance) {
       this.attendance = [
        { name: 'khalid', data: [true, false, true, true, true, true, true, true, true, false, true] },
        { name: 'Noreen', data: [true, false, true, true, true, true, true, true, true, false, true] },
        { name: 'Mawada', data: [true, false, true, true, true, true, true, true, true, false, true] },
        { name: 'Mayar', data: [true, false, true, true, true, true, true, true, true, false, true] },
        { name: 'Reham', data: [true, false, true, true, true, true, true, true, true, false, true] }
      ];
      localStorage.attendance = JSON.stringify(this.attendance);
    }
    this.attendance = JSON.parse(localStorage.attendance);

  },
  getAttendance: function () {
    return this.attendance;
  },

  saveAttendance: function () {
    localStorage.clear();
    localStorage.attendance = JSON.stringify(this.attendance);
  }
};



var view = {
  init: function () {
    this.attendance = model.getAttendance();
    this.render();
  },
  render: function () {
    var DOMTableBodyElem = document.getElementById('tbody');
    DOMTableBodyElem.innerHTML = '';

    for (let index = 0; index < this.attendance.length; index++) {
      const studentData = this.attendance[index];
      var row = document.createElement('tr');
      row.setAttribute('data-rowid', index);
      row.classList.add('student');
      row.innerHTML += `<td class='name-col'>${studentData.name}</td>`
      var numMissed = 0;
      for (let index = 0; index < studentData.data.length; index++) {
        var checked = ''
        if (studentData.data[index] == true) {
          checked = 'checked'
        } else {
          numMissed++;
        };
        var cellHTML = `<td class='attend-col'><input type='checkbox' ${checked}></td>`;
        row.innerHTML += cellHTML;
      }
      row.innerHTML += `<td class='missed-col'>${numMissed}</td>`
      var self = this;
      row.addEventListener('click', (function () {
        return function() {
          self.updateAbsense(index);
        }
      })(index));
      DOMTableBodyElem.appendChild(row);
    }
  },
  updateAbsense: function (i) {
    var rows = document.getElementsByClassName('student');
    var attendCells = rows[i].getElementsByClassName('attend-col');
    var missedCells = rows[i].getElementsByClassName('missed-col');
    var numMissed = 0;
    for (let index = 0; index < attendCells.length; index++) {
      const cell = attendCells[index];
      if (!cell.children[0].checked) {
        numMissed++;
      }
      octobus.updateModel(i, index, cell.children[0].checked);
    }
    missedCells[0].innerText = numMissed;
    
  }
};

var octobus = {
  init: function () {
    model.init();
    view.init();
  },
  updateModel: function (rowId, cellId, cellValue) {
    
       model.attendance[rowId].data[cellId] = cellValue;
      model.saveAttendance();
    
   
  }
};

octobus.init();