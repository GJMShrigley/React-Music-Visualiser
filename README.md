# SPOTIFY SEARCH & STREAM APP

A React-based Spotify player with built-in search functionality. Search the Spotify catalogue for songs, artists, playlists or podcasts and listen to your selection with a single click.

NOTICE: This application requires a Spotify Premium account to access streaming functionality. Without a premium account only search will be available.

## HOW TO USE:

In order to deploy your own isntance of this application, you'll first need to sign up to 'Spotify for Developers' (https://developer.spotify.com/.) 

Once you've created an account, in the 'Dashboard' section (https://developer.spotify.com/dashboard/applications), select 'Create an app' and fill out the name and description of your new application.

In the 'Edit settings' page of the App Overview, enter 'http://localhost:3000/' in the Redirect URIs section and click the 'add' button.

Once your application has been registered with Spotify, open the src/App.js file in your editor and replace the 'client_id' variable with the Client ID details provided by Spotify. Also replace the 'redirect_uri' variable with the same 'http://localhost:3000/' address.

In the project directory, run `npm install` to ensure that all dependancies are up to date.

The app is now ready to run locally. Run the command `npm run start` in the project directory to open a local instance for testing and further development or `npm run build` to build for production.

To give other users access, you must add their accounts under the 'Users and access' section of the App Overview.

### Logging in

To log into Spotify, click the 'Login' text on the header bar. The app will forward you to Spotify's authorisation page where you can enter your details and provide the app access to your account.

### Searching Spotify

The header bar will now contain a text field, button and dropdown menu for searching the Spotify catalogue. Select your desired search type (artists, tracks, podcasts, albums, or playlists) and enter a search term in the text field. Click the 'Search' button and a list of results will display in the area below the player.

### Playing a selection

Simply clicking on one of the displayed results in the list section will load that selection into the player and begin playing automatically. For selections of multiple tracks such as 'artist', 'album', 'podcast', or 'playlist' searches, you will be able to skip through the selection of tracks. Single tracks will require selecting a new track once the current selection has finished playing.

## HOW IT WORKS:

This project was designed for the purposes of teaching myself how to make use of RESTful APIs. I initially chose Spotify's API due to the thorough documentation available. This choice came with a number of challenges, such as Spotify's recent decision to limit the 'streaming' scope to premium accounts on third party applications.

The first step in creating a working application was to gain authorization for the user. 

At the top level of the application, a series of variables contain important information necessary for Spotify's API to authorize the user. These are the 'client_id', which identifies the application, the 'redirect_uri' which specifies the page to return to once authorization has taken place, the 'auth_endpoint' which specifies where the application should direct the browser for authorization, the 'response_type' which specifies the response expected, and the 'scope' which specifies what privileges the application is requesting access to.

The above variables are passed as props to the Menu component. This component checks for the presence of the 'token' prop. As the 'token' prop is only set after authorization it will not initially be present and the Menu component will render a 'login' element. 

When clicked, the 'login' element will combine the data from the props into a url and query string used to pass the relevant information to the Spotify auhorization page where the user can enter their login details and allow the application access to their account. Once completed, the browswer will redirect them back to the application page.

React's useEffect hook allows for code contained in the first argument to be run only upon certain conditions being met. Specifically, code contained within the first argument will run only when changes occur to specified dependencies. These dependencies are contained in an array included as a second argument. As the dependencies array of this useEffect hook is empty, it will only run once (when the log in is first made.)

The useEffect hook in question  is set to check the hash of the window's location. Upon returning from Spotify's authorization page, the url will contain a hash with a number of important pieces of information. The app will then check the browser's local storage for a 'token' entry and set it as the 'spotifyToken' variable if it is found.

If the app finds that the url contains a hash, but there is no spotifyToken present in the browser's local storage it will obtain one from the hash and set an entry in the local storage with the key 'token' before clearing the hash.

The spotifyToken is then passed to the 'spotify-web-api-js' library and used to fetch the user's data. Once this step is complete the useEffect hook will update the 'spotifyToken' and 'loggedIn' states. As stated before, since the dependencies array is empty, this useEffect hook will only run once.

With the user authorized and the 'loggedIn' state set to True, the application will now display the Menu and Player components as well as a list section to be populated by the results of a search. 



## CREDITS:

## LINKS:

