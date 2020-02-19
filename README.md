"# github-search-web-app" 

<h2>developed by:</h2>
	<p>Asher Fisher<br>
		<a href="mailto:osher636@gmail.com">osher636@gmail.com</a><br>
    </p>
    <h2>description:</h2>
    <p><b>client:</b> We did the Ajax in 3 separate reads when one depends on the other,<br>
    when we use for asynchronous in the .then function,<br>
    and do a test on each mode if the Promises returns to normal,<br>
    and finally I print the whole result.
    </p>
    <p><b>server:</b> dependencies by {nodejs-express, SQLite, sequelize, css}<br>
    express: For easy and fast connection.<br>
    request: to makes a asynchronous request.<br><br>
    <b>Algorithm server:</b> We used app.use that comes with using express.<br>
    <b>save:</b>When the user enters a name to save, the server checks if the name exists,<br>
    and if it does return an error, and if it does not return the updated list.<br>
    <b>delete:</b>When the user enters a path to delete,<br>
    the server checks if the name exists and if it does,<br>
    returns the updated list and if it does not return an error<br></p>
    <p><b>login</b><br>
	We added a special (login / password) using bootstrap style<br>
	We have done really professional validation on both the client and server side<br>
	to create unique passport we using passport lubrery<br>
	It is possible to add a sign-up and thus log into the app<br>
	the admin can olvase entered with name: 'admin' password: '1234'<br>
	after the user enterd by admin or by registered the index page will loaded<br>
	and the save list will loaded and updated by the user using the buttons 'save' or 'delete'
    </p>
    <h2>Running:</h2>
    <p>enter in the command-line:<br>
	<b>npm install</b></br>
	<b>node server.js</b> or <b>npm run devStart</b></br>
	in browser go to localhost:4000</br></p>
