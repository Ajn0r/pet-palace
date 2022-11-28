# Testing

## Automatic tests

The sign-in and sign-up pages were tested for if all input fields were rendered, and whether the user could change the value in the input fields. When testing I also decided to set the button as disabled if the user hadn't filled in all input fields, and then tested for this as well. These tests were inspired by Lama Dev's [React testing tutorial youtube video](https://www.youtube.com/watch?v=Flo268xRpV0&t=2242s)

## Manual tests

The rest of the project is tested manually, test were carried out on responsiveness, routing and functionality, all manual tests were documented in an excel file.

### Functionality

### Responsivness

### Routing

The routing tests tested that all routes worked properly, there was one route that was set up wrong but it was a quick fix.

![routertest](/documentation/images/routetests.png)

## Validation

### ESLint

ESLint was used to validate the Javascript code, some minor issues were corrected straight away such as too many semicolons and forgetting to import react in some pages, and others that needed some more work.

`{prop} is missing in props validation`

was one ES lint issue that was solved by adding:

    ```
    "rules": { 
        "react/prop-types" : 0 
    }
    ```

to the .eslintrc file as suggested by sean_ci on slack.

The second main issue was:

`Do not pass children as props. Instead, nest children between the opening and closing tags.eslint(react/no-children-prop)`

which I wasn't sure how to solve since it came from following the moments walkthrough solutions. After some googling, I decided to add

`/* eslint-disable */`

to the top of the pages concerned, and also added those pages to a .eslintignore file to keep track of which pages were concerned. All other pages and components passed the linter.

### CSS

All CSS files are validated, at first when validating the CSS there was one error, seems I accidentally had removed a piece of the identifier somehow, but it was easily solved by adding the correct value.

![cssValidated](/documentation/images/cssvalidation.png)

## Bugs

### Fixed

- Ad 'bug'

    While there is validation on the backend to not allow for dates that have passed I still wanted to validate it on the front end. When updating an ad I first made the input disabled if the date was before today's date, this did, however, cause some unthought-of problems. If a user choose a date accidentally in the past, the input was disabled and the user had to refresh the page or start over.

    I also realised that a user might want to reuse an ad if they need a new pet sitting with the same information just changing the dates. Therefore, I decided to remove the disable logic and instead set the min value to today's date for the Start date and date_from as the min value for the End date, making it impossible for the user to set a date backwards in time.

- Age calculation bug

    There was some faulty logic in the age calculations, that came from the API so it was handled there, it's described [here](https://github.com/Ajn0r/pet-palace-api#pets)

### Not fixed

- Pets page for logged out users

    Logged-out users can reach the pets page if they manually add it to the url, but the filter functions won't work, I think this is due to the dependency for fetching the pets options for pet type.

- Mobile sign in

    It's not possible to log in from mobile and tablet devices, I believe this has to do with the token being saved to localStorage and that won't work on mobile. There is probably some way around this, however, for now, the users will need to use desktop versions to be able to log in and use all functions. The user can still view posts and if manually adding ads or pets to the url they can reach that too.
