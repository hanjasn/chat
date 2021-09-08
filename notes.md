- Use environment variables

- Lay out project structure so that server files are **directly** in the root directory and React code is in a client folder

- In package.json: `"heroku-postbuild": cd client && npm i && npm run build`

- ```javascript
  app.use(express.static(path.join(__dirname, './client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
  // Do not put in router.js
  ```
  
- MongoDB allow access to any IP address in 'Network Access' with 0.0.0.0/0

