# [Keeper](https://www.keeper-turing.com)
Keeper is an application to help users track the projects they are working on to stay on task and accomplish their goals. Keeper is modeled after Google Keep. Users can save notes about multiple projects, add lists of items they need to do in order to complete a project, check them off as they go and edit or delete any part of a note.

### How to Use the App:
  #### As a User:
  - Go to [keeper-turing.com](https://www.keeper-turing.com/)
  - Sign in with Google.
  - Click `+ New Note`
  - Title your note and add however many list items you want.
  - Click the palette icon to change the color of your note.
  - Once you've made multiple notes, drag and drop them into whatever order you like.
  - Check off list items as you complete them.
  - Click on the pencil icon to edit a note.
  - Click the trashcan icon to delete notes you no longer want.
  - Use the search bar to find notes you're looking for.
  - Come back to the app later to keep track of your tasks.
  
  #### As a Contributor: 
  - Fork the repo
  - Open your terminal
  - `cd` to where you want the repo directory to be created
  - Clone your fork down to your machine either
    - with SSH: `git clone git@github.com:`*yourusername*`/keeper.git`
    - or with HTTPS: `git clone https://github.com/`*yourusername*`/keeper.git`
  - `cd keeper`
  - `npm install`
  - `git push` any changes up to your fork
  - Make pull requests from your fork to the original repo
  - Associated backend repo can be found [here](https://github.com/dForDeveloper/keeper-api)

### Preview:
![Keeper video](./src/images/keeper-gif-med.gif)  
### Primary Technologies Used:
* React 
* Redux
* React Router
* Node.js
* Express
* MongoDB
* SCSS

### Testing:
Jest and Enzyme for front-end and back-end testing  
Run `npm test` from the associated root directory  

<img src="./coverage/badge-statements.svg"/>
<img src="./coverage/badge-lines.svg"/>
<img src="./coverage/badge-functions.svg"/>
<img src="./coverage/badge-branches.svg"/>

### Issues tracked with Waffle.io:
[![Waffle.io - Columns and their card count](https://badge.waffle.io/whitneyburton/trapper-keeper.svg?columns=all)](https://waffle.io/whitneyburton/trapper-keeper)

### Original Assignment: 
[Trapper Keeper](http://frontend.turing.io/projects/trapper-keeper.html) project from Turing School of Software & Design

### Contributors
[Jeo D](https://github.com/dForDeveloper)  
[Tiffany Bachmann](https://github.com/trbachmann)  
[Whitney Burton](https://github.com/whitneyburton)  

### Wireframes:
![Keeper wireframes](./src/images/trapper-keeper-wireframes.png)