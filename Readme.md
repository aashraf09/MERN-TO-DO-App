# TO-DO MERN APP

This app has been created using React, Node.js, Express JS and MongoDB

## How to run the application?

You can follow these steps to run this app.

 ### __Frontend__
 ___________

- Open the main file in terminal or command shell.

- Change directory to frontend `cd frontend`
- Simply type `npm install` (It will install all the dependencies)
- Once the step 3 is completed, type `npm start` in the terminal. It will run the frontend application.


### __Backend__
___________

- Once you have run the frontend app, type `cd ..` to get back into the main folder.
- Change directory to backend `cd backend`
- Simply type `npm install` (It will install all the dependencies)
- Uncomment variables in `.env` file.
- Once the above steps are completed, type `npm start` in the terminal. It will run the backend application.

<br>

## App features and working
_________________________

This MERN to-do app has following features:

1. __Login/ SignUp:__ User can create a new account or log into the existing acount using `email` and `password`.
2. __Home Page:__ Once user has logged in, now he/ she can view the previous to-do list imported from the backend and can add new tasks.
3. __Log Out:__ There's a logout button on the `'/'` page.  Once the user clicks it, user will be redirected to the `'/login'` page.

<br>

### Working
____________

If the user is not loggedin, he/ she will not be allowed to access the `'/'` URL. Once the user logs in, a list of previously added to-dos is shown that are rendered from the backend. Now, user can `add new to-dos` by simply typing the to-do and clicking the __Add Item__ button _(Or by just pressing enter button)_. User can also `delete to-do` by clicking on __Trash__ icon. There's also a functionality of `editing a to-do` by clicking on __Edit__ icon. Finally, when the user click on `Save Button`, all the changes will be saved to the backend and database.
If the user clicks on `Logout` button, user will be loggedout and redirected to `/login` page.

## Note
______________
Since I had to use the user data in just one file instead of multiple files so I choosed to use `window.localStorage` instead of setting up a `Contex API` and developing custom hooks.