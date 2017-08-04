<h2 align="center">Organizer</h2>

<hr>

**Royal TODO API**

- Get items:
```
$.get("http://127.0.0.1:4242/royal/todo/item", function (data) {
    // handling
});
```
- Add new item:
```
var form = {
    "content": "Content",
    "title": "Test",
    "status": 4
};
$.post("http://127.0.0.1:4242/royal/todo/item/new", form, function (data) {
    // handling
});
```
- Show item:
```
$.get("http://127.0.0.1:4242/royal/todo/item/{item_id}/show", function (data) {
    // handling
});
```
- Edit item:
```
var form = {
    "content": "Content",
    "title": "Test item",
    "status": 4
};
$.post("http://127.0.0.1:4242/royal/todo/item/{item_id}/edit", form, function (data) {
    // handling
});
```
- Delete item:
```
$.ajax({
    url: 'http://127.0.0.1:4242/royal/todo/item/{item_id}/delete',
    type: 'delete',
    success: function(data) {
        // handling
    }
});
```

<hr>