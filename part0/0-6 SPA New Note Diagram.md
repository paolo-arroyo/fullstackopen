SPA New Note Diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Process Form Data (create new note, add to notes, re-render notes on page)

    browser->>server: POST JSON data to https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    note left of server: Server prevents default handling (no redirect)
    server-->>browser: Status Code 201 Created
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document, CSS, Javascript
    deactivate server

    Note right of browser: Browser renders page, executes js


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: Browser renders notes
```