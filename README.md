# User-Product Portal App

## Setup instructions:

After cloning the repository, 

1. Go to `client` folder and do `npm install`.
2. Go to `server` folder and do `npm install`.
3. In one terminal, go to `client` folder and run `npm start` to start the React client-side application. This starts the app at [http://localhost:3000](http://localhost:3000)
4. In another terminal, go to `server` folder and run `node app.js` to start the API backend. This starts the server at [http://localhost:3002](http://localhost:3002)
5. Open the app at [http://localhost:3000](http://localhost:3000) for evaluation.

## Login instructions:

1. When [http://localhost:3000](http://localhost:3000) is hit, it opens the home page automatically. 
2. You can either login with any of the below credentials:
    - User ID: `chaitanya` and Password: `chaitanya`
    - User ID: `appuser` and Password: `apppwd`
    - User ID: `admin` and Password: `admin`
3. Or you may also register in the registration form below that. Fill in all the details to proceed. Once the registration is successful, user will be taken to the success page.

## Product Navigation and Management:

1. User may now go to the products listing page by either clicking on the `Products` navigation link or the `Go to Products` link in the home page after login.
2. User can see all the products added by all users in the listing page.
3. User may proceed to product details page by clicking on the title of any product.
4. If the current user has authored that product, there will be `Edit` and `Delete` buttons next to the title of the product in the details page.
5. User may click on `Edit` button to update the product details like product name, description and price and click on `Update` button in the form to update the details in the API or `Cancel` button to go to read-only view.
6. User may click on `Delete` button to remove the entry from the API and go back to the listing view automatically.
7. Additionally, user has option to add a new product by clicking on the green `Add New Product` button in the listing page. Saving the form will update the API and take user back to the listing page with the new entry coming at the beginning onf the list.

## User Management:

1. User may see the list of users by clicking on the `Users` navigation link above.
2. Then the user may go to individual user details screen by clicking on the title of each user card.
3. If the user has opened their own user details, there are `Edit` and `Delete` buttons in the page beside the name of the user.
4. User may now proceed to edit their details like name, about (description) and designation.
5. Clicking on `Delete` button will remove the user in the API and log the user out.

## Errors: 

When login fails, a graceful error shows up in the screen below the `Submit` button to allow user to check their credentials.

## Technical limitations:

1. Due to firewall restrictions within the training rooms, I am unable to use any cloud based databases (like mLab for MongoDB or Firebase).
2. So, the API stays in the server side as in-memory data and any restart of the server will reset the data.
3. Also, refreshing the page will log the user out due to no persistent database to maintain session.
4. Due to limited time and extensive requirement, I could not write test cases for the code that I created.