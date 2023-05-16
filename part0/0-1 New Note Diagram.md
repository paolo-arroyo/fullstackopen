```mermaid
sequenceDiagram
    participant browser
    participant server

    

    browser->>server: POST req.body.note
    activate server
    server-->>browser: Redirect /notes
    deactivate server

    note left of server: push new note to notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document, CSS, Javascript
    deactivate server

    Note right of browser: Renders page, executes js


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```