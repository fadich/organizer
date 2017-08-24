<h2 align="center">Organizer</h2>

* <h4>Todo-list API</h3>

Route      | Method      | Parameters                                                      | Note                              
---------- | ----------- | --------------------------------------------------------------- | --------------------------------- 
**/**      | **GET**     |                                                                 | Get all items (except items, which has "Deleted" status)&nbsp;*
**/**      | **POST**    | **title**:string; **content**:string (text)                     | Create new item                   
**/{id}**  | **GET**     |                                                                 | Get an item by id                 
**/{id}**  | **POST**    | **title**:string; **content**:string (text), **status**:integer | Update an item                    
**/{id}**  | **DELETE**  |                                                                 | Delete an item _(permanently)_    

<sub>
<span style="color:#C00000">*</span> There are possible statuses:<br />
   &nbsp;&nbsp;&nbsp;4: "Active" <br />
   &nbsp;&nbsp;&nbsp;3: "Postponed" <br />
   &nbsp;&nbsp;&nbsp;2: "Done" <br />
   &nbsp;&nbsp;&nbsp;1: "Not active" (can be used for trash etc.) <br />
   &nbsp;&nbsp;&nbsp;0: "Deleted" (item will be remaining on server, but does not participate in the list) <br />
   <sub>
     <span color="grey">Actually, the last two statuses (not active and deleted) need clarification.</span>
   </sub>
</sub>

<br />
<br />

<details>
    <summary>Item structure</summary>
    <sub>Approximate item structure:</sub>
    
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
