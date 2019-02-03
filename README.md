
## Design Decisions

-This front end implements a single state design pattern. I like this pattern
because it allows components to update based on changes to a single source of truth.
This keeps the code maintainable and prevents the need to manipulate the dom with a library
like jQuery. Dom manipulation tend to get messy and I like the ease of maintenance this provides.

-Components are separated out for a modular approach. This makes it easy to understand the
code.

-App.js is the main file that brings the components in. The components directory has the
two components required for this sample. The main state is defined inside of App.js and passed
down into the children as props. Also passed down into the children are the functions
to control the state. 
