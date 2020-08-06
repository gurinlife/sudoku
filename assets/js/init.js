window.onbeforeunload = function() {
    return "Changes you made may not be saved.";
}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

var getParams   = getSearchParameters();
let data        = '';
let inputNumber = [];
let sudokuTable = document.getElementById('__sudoku_table');

if (getParams.diff) {
    const arrData = sudoku.board_string_to_grid(sudoku.generate(getParams.diff));

    for (let i = 0; i < 9; i++) {
        inputNumber.push(`<tr>`);

        for (let j = 0; j < 9; j++) {
            inputNumber.push(`<td><input type="tel" class="form-control" value="${(arrData[i][j] != '.') ? arrData[i][j] : ''}" ${(arrData[i][j] != '.') ? 'disabled' : ''}></td>`);
        }

        inputNumber.push(`</tr>`);
    }

    sudokuTable.innerHTML = inputNumber.join('');     
    $('[type="button"]').show();

    $('.diff').removeClass('btn-outline-secondary');
    $('.diff').addClass('btn-outline-secondary');
    $('.diff.'+getParams.diff).removeClass('btn-outline-secondary');
    $('.diff.'+getParams.diff).addClass('btn-secondary');
}

function validate_sudoku() {
    let inputData = '';
    let is_solved = true;

    $('.form-control').each(function() {
        if ($(this).val().length > 0) {
            inputData += $(this).val();
        } else {
            inputData += '.';

            is_solved = false;
        }
    });

    if (is_solved) {
        if (!sudoku.solve(inputData)) {
            is_solved = false;
        }
        
    }

    if (is_solved) {
        $('#__message').html('<span class="text-success">Sukses! Reload untuk main lagi.</span>');
    } else {
        $('#__message').html('<span class="text-danger">Masih ada yang salah, coba cek kembali.</span>');
    }
}