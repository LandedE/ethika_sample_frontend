
## Design Decisions

-This front end implements a single state design pattern. I like this pattern
because it allows components to update based on changes to a single source of truth.
This keeps the code maintainable and prevents the need to manipulate the dom with a library
like jQuery. Dom manipulation tend to get messy and I like the ease of maintenance this provides.

-Components are separated out for a modular approach. This makes it easy to understand the
code.
