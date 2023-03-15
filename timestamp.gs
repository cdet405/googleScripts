function onEdit() {
    var s = SpreadsheetApp.getActiveSheet();
        var r = s.getActiveCell();
        if (r.getColumn() == 1) { //checks that the cell being edited is in column A
            var nextCell = r.offset(0, 3);
            if (nextCell.getValue() === '') //checks if the adjacent cell is empty or not?
                nextCell.setValue(new Date());
        }
    }
