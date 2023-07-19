- Implement log out

- When a user is logged in give them a link to “Create a new message” (but only show it if they’re logged in!). Create the new-message form.

- Display all member messages on the home page, but only show the author and date of the messages to other club-members.

- Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages. You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.

- By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author and date of each message. Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages. Obviously this is a simple and silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!

- Deploy project