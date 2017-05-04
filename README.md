<h2 align="center">Organizer</h2>
=========

**Provides API**

<hr>

- <h4>Royal TODO API</h3>



- Add new item:
```
var form = {
    "royal_todobundle_item[_token]": "d3zFkDy4J8Z0hF4zyFzX1ON3lPnSJ_8FVEKnU_oKk6I",
    "royal_todobundle_item[content]": "Content",
    "royal_todobundle_item[title]": "Test",
    "royal_todobundle_item[status]": 4
};
var r = $.post("http://127.0.0.1:4242/royal/todo/item/new", form, function (data) {
    console.log(data);
});
```
- Edit item:
```
var form = {
    "royal_todobundle_item[_token]": "d3zFkDy4J8Z0hF4zyFzX1ON3lPnSJ_8FVEKnU_oKk6I",
    "royal_todobundle_item[content]": "Content",
    "royal_todobundle_item[title]": "Test item",
    "royal_todobundle_item[status]": 4
};
var r = $.post("http://127.0.0.1:4242/royal/todo/item/{item_id}/edit", form, function (data) {
    console.log(data);
});
```
- Delete item:
```
$.ajax({
    url: 'http://127.0.0.1:4242/royal/todo/item/{item_id}/delete',
    type: 'delete',
    data: {
        "form[_token]": "3Y3LdMOVzbQJy74YAR5z3lKgw99tiUcJrlDglvKt73Q"
    },
    success: function(data) {
        console.log(data);
    }
});
```

<hr>
