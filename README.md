<h2 align="center">Organizer</h2>

###Todo-list API

Route      | Method      | Parameters                                                                              | Note                              |
---------- | ----------- | --------------------------------------------------------------------------------------- | --------------------------------- |
**/**      | **GET**     |                                                                                         | Get all items                     |
**/**      | **POST**    | Title:string; content:string (text)                                                     | Create new item                   |
**/{id}**  | **GET**     |                                                                                         | Get an item by id                 |
**/{id}**  | **POST**    | Title:string; content:string (text), status:integer<span style="color:#C00000">*</span> | Update an item                    |
**/{id}**  | **DELETE**  |                                                                                         | Delete an item _(permanently)_    |

<sub>
  <sub>
    <span style="color:#C00000">*</span> There are possible statuses:<br />
       &nbsp;&nbsp;&nbsp;4: "Active" <br />
       &nbsp;&nbsp;&nbsp;3: "Postponed" <br />
       &nbsp;&nbsp;&nbsp;2: "Done" <br />
       &nbsp;&nbsp;&nbsp;1: "Not active" (can be used for trash etc.) <br />
       &nbsp;&nbsp;&nbsp;0: "Deleted" (item will be remaining on server, but does not participate in the list) <br />
       <br />
       <sub>
         <span color="grey">Actually, the last two statuses (not active and deleted) need clarification.</span>
       </sub>
  </sub>
</sub>

 <details>
    <summary>Item structure</summary>
    <small>Approximate item structure:</small>
    
```json
   {
       "id": 1,
       "title": "Example item name",
       "content": "Example item content. The should be long text...",
       "status": 4,
       "userId": 1,
       "createdAt": 1494336605,
       "updatedAt": 1503582000
   }
```
    
</details>

- - - -
