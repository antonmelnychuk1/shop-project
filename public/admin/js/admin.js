function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showProducts
    );
}

function showProducts(data) {
    // data = JSON.parse(data);
    console.log(data);
    // var out='<select>';
    // out +='<option data-id="0">Новый товар</option>';
    // for (var id in data) {
    //     out +=`<option data-id="${id}">${data[id].title}</option>`;
    // }
    // out +='</select>';
    // $('.products-out').html(out);
}

$(document).ready(function () {
    init();
});