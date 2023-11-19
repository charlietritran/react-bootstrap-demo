
//////////////////////////////////////
//
// REACT JS QA
//
//////////////////////////////////////


- Open console from terminal and type: npm install
- Run with:  HTTPS=true npm start
- Browser url: https://localhost:8442/demo-react-auth-login
- Browser have tested: Chrome
- PORT can be changed in .env


- Rest API can be changed / adjusted from pre-set in the project: https://localhost:8443/demo-rest-auth-login


- QA:
1) Router link not move to page until refresh?  have to install react-router-dom 5.2.1

2) Network error: Cert. list not popped up?  Need to enter rest url in browser first to allow secure access confirm.
- usually, this happens when first time to call rest or after a clear cache

3) npm start issue?
- delete node-module & pkg-lock.json
- enter: npm install --legacy-peer-deps



4) Helpful links:
- https://djorg83.github.io/react-bootstrap-sweetalert/


$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
5) ROAD MAP:

+ PEOPLE:
- Need to handle edit with upload file
- Need to generate report of people list in pdf.
- Need to be able to download zip of uploaded files.
- Need to clean up files when delete records

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



5) REFS:
- https://claritydev.net/blog/react-hook-form-multipart-form-data-file-uploads
- https://www.baeldung.com/sprint-boot-multipart-requests
- https://sanjanaraj11.medium.com/upload-files-and-multiple-data-together-using-formdata-in-react-8a0bdf891da0
- https://stackoverflow.com/questions/32427212/how-to-prevent-form-submit-when-choosing-a-file-with-input-type-file
- https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter%20with%20Custom%20Data&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
