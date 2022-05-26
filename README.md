# Projet Name :Velocipede
###  Live Link: https://cycle-41db3.web.app/
### Server Link: https://github.com/programming-hero-web-course1/manufacturer-website-server-side-jabin34
### Client Link: https://github.com/programming-hero-web-course1/manufacturer-website-client-side-jabin34
### Project Description:

* Basic Manufacture website
* Home page  has a Header Banner, Tools/Parts, Business Summary, Reviews, and Footer. 
* Each tool/part should has  a  name, image, short description, minimum order quantity, available quantity, price (per unit price), a place order button. If a user clicks on the purchase or buy now button it will take the user to the purchase page
* The `purchase' page is   a private/protected route.  private route redirects to the login page if the user is not logged in. After login, the user will be redirected to the page he/she wanted to go to. Also, after reloading the page of a private/protected route, the user is not redirected to the login page. The purchase page  detailed information about the item the user has clicked somewhere at the top. It will also display the user's name and email address from the login system. The user will have a field to provide an address, phone number, and other necessary information (if applicable) to place the order or complete the purchase.
* On the Purchase page, users able to change the order quantity (increase/decrease) in an input field. The initial value of the quantity will be the minimum order quantity.
* Implemented an email/ password (login/Register) based login system. The registration form should have the name, and once a user is logged in, the user name and the logout button appear on the header, which will log out the user once clicked.
* If a user is logged in, they will see another option on the header is called Dashboard. Inside the dashboard, a user (not an admin) will see options like My Orders, Add A Review, My Profile options on the side nav.
* On My Orders page, the logged-in user will see only their orders. If the user wants, they should be able to cancel (canceling is just deleting the order) any order that is not paid yet. 
* On the My Orders page, there is a payment button for each order. The user has not paid yet. The pay button will take the user to the payment page. The user  able to pay by using a credit card here.
* On the Add A Review page, users should be able to add a review.
* The My profile route is  available for every user (admin or non-admin. everyone will see this link). The user can  see their name and email address on this profile in this link. Also, this page has a  fields to add fields like education, location (city/district), phone number, LinkedIn profile link, etc. And users  are  able to save this information in the database. Also, the user will be able to update this information.
* An Admin can make another user an admin. 

### Used Technology 

* React Js
* Node JS
* MongoDb
* Firebase
* Express
* Stripe
* Tailwind CSS
* Daisy UI
* Heroku
