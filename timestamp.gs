// inserts date and username of editor upon modification
function onEdit() {
    var s = SpreadsheetApp.getActiveSheet();
    var u = Session.getEffectiveUser().getEmail().split("@")[0];
        var r = s.getActiveCell();
        if (r.getColumn() == 1) { //checks that the cell being edited is in column A
            var tsCell = r.offset(0, 3);
            var usrCell = r.offset(0,4);
            if (tsCell.getValue() === '') //checks if the ts target cell is empty or not?
                tsCell.setValue(new Date());
            if (usrCell.getValue() === '') //checks if the username target cell is empty or not?
                usrCell.setValue(u);
        }
    }
