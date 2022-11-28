# Pet Palace

 For my fifth and final project with Code Institute, I have created a pet community website called Pet Palace for pet lovers and pet owners where they can connect, add information about their pets, share images and posts, arrange petsittings and interact with each other by commenting and liking each others posts.

The application is developed using the Django Rest framework for the backend and React for the front end.  

This is the front-end part of the project, the backend part can be found [here](https://github.com/Ajn0r/pet-palace-api)

The API is deployed to Heroku and can be found [here](https://pet-palace-api.herokuapp.com/)

The deployed React project is found [here](https://pet-palace.herokuapp.com/)

## User Experience

### Who would the user be?

The user would be someone who likes animals, it could be a pet owner that would like to share fun posts about their pet or get help with pet sittings. It could be someone who likes pets that wants to join the community and interact with other users with the same interest, or they might want to pet sit. It could be someone who has retired or have some extra time in the day to take care of a dog during the days but doesn't want the commitment of having a dog of their own, win-win for both the pet owner and the pet sitter!

### Why would a user want this?

- From the pet owner's perspective

    As a pet owner, you are usually very attached to your pet and for many, they are a part of and very dear to the whole family. It comes times when one cannot bring their pet with them and those times one wants to be sure that the pets are in good hands. With Pet Palace, pet owners can read reviews of the user offering to pet sit before making any decision, not everyone have friend or family that can help and for those Pet Palace is a really good choice. With Pet Palace, pet owners can also post as many posts as they'd like about their pets, not having to worry about someone thinking it's too many pet pictures as they might on other social media platforms.

- From the pet sitter’s perspective:

    Not everyone has the means and opportunity to have pets of their own for different reasons but might have some extra time on their hands and would like to be around pets and maybe even make a bit of extra money.

- From the regular* users' perspective

    For the regular user, the site will add value in the sense that they can view funny or cute posts on pets as a relaxing way to pass some time.

    *A regular user is someone who is not a pet owner or a petsitter and doesn't use the pet sitting or ad functionality.

### What is already out there

There are already a few petsitting sites out there such as Rover.com, Trustedhousesitters and probably a handful of different sites local to each area.
For pet communities, there are yummypets.com, obviously Facebook groups and Instagram profiles that post about pets.
There is also a site called thepet.community that combines it to some extent, however, it looks as if they target dog owners mostly and they have a blog and forum instead of letting users make posts.

Without having done deeper research on the field, I did not find any sites that combine them both in the way I decided to therefore I thought would be a good idea.

## User goals

A logged-in user is all users that have signed up and have an account. Pet owners' and petsitters' user goals also contain the logged-in user's goals, but they also have some added goals specific to their user type. A logged-out user is someone who hasn't signed in or hasn't created an account.

- As a logged-out user I want to be able to:
  - View posts
  - View comments on a post
  - View the number of likes and comments on each post
  - View the user's profile and learn more about them
  - Be able to sign in or up

- As a logged-in user I want to be able to:
  - Share posts with other users on pet-related topics
  - Manage my posts
  - Interact with other users by liking and commenting on their posts
  - Read and respond to comments made on posts
  - View ads to see if I can find any of interest to me
  - View other user's profiles to learn more about them
  - Manage and update my profile and account

- As a Pet owner I want to be able to:
  - Share posts about my pets
  - Create a page for my pet with their information
  - Manage my pets
  - Create ads for when I need a petsitting
  - Manage my ads
  - Create a petsitting with another user and connect my pets
  - Manage my petsittings

- As a Pet sitter I want to be able to:
  - Share posts about  petsittings
  - View ads from pet owners needing a petsitter
  - Create ads to offer my petsitting services
  - View the details of the pet I'm petsitting
  - View the contact information of the pet owner so I can get in touch with them

### User stories

User stories were made and documented using issues in GitHub and added to the product backlog on the pet palace project board. The project board can be found [here](https://github.com/users/Ajn0r/projects/5)

<details>
<summary>User stories</summary>

01. Profiles: Edit profile

    As a **logged-in user** I can **edit my profile** so that **I can update my profile image, text and pet owner status**.

02. Profiles: View profiles

    As a **user** I can **view other users profiles** so that **I can learn more about them and if they have any pets or ratings**

03. Authentication: Sign in

    As a **user** I can **sign in to Pet Palace** so that **I can access all functionality**

04. Authentication: Sign up

    As a **user** I can **sign up to create a new account** so that **I can access all features for signed-up users**

05. Authentication: Logged in status

    As a **user** I can **easily see if I'm logged out or logged in** so that **I can log in or out if I need to**

06. Authentication: Sign out

    As a **logged-in user** I can **log out from my account** so that **I can make sure no one else can use it on my device.**

07. Navigation: Visible navbar

    As a **user** I can **view the navbar from every page** so that **I can easily navigate between different pages on the site**

08. Navigation: logged out view

    As a **logged out user** I can **see the sign in & sign up links** so that **I can easily sign in or up**

09. Avatar: View users avatars

    As a **user** I can **view the different users avatars** so that **I can easily see and identify the user**

10. Routing: Quick routing between pages

    As a **user** I can **quickly navigate through pages** so that **view content seamlessly without page refresh**

11. Profiles: Update username and password

    As a **logged-in user** I can **update my username and password** so that **I can change my username and password to keep my profile safe**

12. Profiles: View most followed

    As a **user** I can **see which profiles are most followed** so that **I can see the most popular profiles**

13. Profiles: Highest ratings

    As a **user** I can **see the profiles with the highest ratings** so that **I can see which profiles have the highest ratings for their petsittings**

14. Profiles: Users statics

    As a **user** I can **view the statistic on other users' profiles such as bio, the number of posts, ads, petsittings, ratings etc.** so that **I can learn more about that user**

15. Posts: View all posts

    As a **user** I can **view all posts with the newest first** so that **I can keep up to date with the latest content**

16. Posts: Create posts

    As a **logged in user** I can **create and share a post** so that **other users can see my post and interact with it**

17. Posts: Manage posts

    As a **logged-in user** I can **edit and delete my own posts** so that **I have control over my content**

18. Posts: View posts detail

    As a **user** I can **view the details of a post** so that **I can read and learn more about it**

19. Posts: Search for posts

    As a **logged-in user** I can **search for posts based on username or title** so that **I can view the posts I'm interested in**

20. Posts: Filter posts

    As a **logged-in user** I can **filter posts based on the post's owner, only users that I follow, category or only posts that I liked** so that **I can view relevant posts based on my preferences**

21. Posts: Like a post

    As a **logged-in user** I can **like a post** so that **I can show the owner of the post that I like it and show my support**

22. Posts: Order posts

    As a **logged-in user** I can **order posts based on the number of comments, likes and posts with the most recent likes** so that **I can view the most popular posts first or last**

23. Posts: Interaction stats

    As a **user** I can **see the number of comments and likes each post has** so that **I can see which posts are most popular or have had the most interactions**

24. Likes: Remove like

    As a **logged-in user** I can **remove my like on a post** so that **I can change my mind if I no longer like a post and control my likes**

25. Comments: Create a comment

    As a **logged-in user** I can **write a comment on a post** so that **I can share my opinion with the owner of the post and other users**

26. Comments: Manage comments

    As a **logged-in user** I can **edit and delete my comments** so that **I can control my comments and their content**

27. Comments: View comments

    As a **user** I can **view comments** so that **I can read what users are thinking about the post**

28. Comments: View latest comments

    As a **user** I can **view the four latest comments on the post page and which post they were commented on** so that **I can choose if I want to view the post and all other comments on the post**

29. Comments: View time of comment

    As a **user** I can **see when the comment was made or updated** so that **I know when it was made and for how long ago**

30. Following: Follow/Unfollow a user

    As a **logged-in user** I can **follow and unfollow other users** so that **I can see and follow their content or unfollow to stop doing so**

31. Pets: Create pets

    As a **logged-in user** I can **create pets** so that **other users can see and view the details of my pets and so that I can connect them to petsittings**

32. Pets: Manage pets

    As a **logged-in user** I can **edit and delete my own pets** so that **I can keep the information about them relevant and control my own pets**

33. Pets: View pet details

    As a **user** I can **view and read about the pet, such as description, name, age, and what type of pet it is** so that **I can learn more about the pet**

34. Pets: Filter

    As a **user** I can **filter the list of pets based on the type of pet or pets that belongs to users that I follow** so that **I can view only the pets I'm interested in**

35. Pets: Search

    As a **user** I can **search for pets by their name, description or the pet owners username** so that **I can view only the pets I would like or find a special type of pet**

36. Ad: Create ad

    As a **logged-in user** I can **create an ad for petsittings** so that **I can either offer my services as a petsitter or ask for help with petsitting if I'm a pet owner**

37. Ad: Manage ad

    As a **logged-in user** I can **edit and delete my own ads** so that **control them and keep them up to date**

38. Ad: View ads

    As a **user** I can **view ads that are active** so that **see if there are any ads that might be of interest to me**

39. Ad: View popular ads

    As a **user** I can **view ads with the most interest** so that **I can see which ads are most popular**

40. Ad: Filter

    As a **user** I can **filter ads based on the type of ad, the status, the owner of the ad and what type of pet it is regarding** so that **I can easily find ads that are of interest to me**

41. Ad: Search

    As a **user** I can **search for ads based on the ad owner username or the location of the ad** so that **I can find ads relevant to me**

42. Ad: Ordering

    As a **user** I can **order ads on the start and end date of the ad** so that **I can view the ones with the earliest or latest start or end date first**

43. Interest: Show interest

    As a **logged-in user** I can **show interest in another users ad** so that **they will know that I am interested and I can easily find the ad later**

44. Interest: Filter ads

    As a **logged-in user** I can **filter ads that I have shown interest in based on pets, date from, location, status and ad owner** so that **I can view the ones of interest to me**

45. Interest: Ordering

    As a **logged-in user** I can **order the ads I have shown interest in by the status of the ad or the start date** so that **I can view the ones with a specific status first or the oldest or newest starting date.**

46. Interest: Remove interest

    As a **logged-in user** I can **remove interest in an ad** so that **I can control my interest and change my mind**

47. Ad: Draft

    As a **logged-in user** I can **create an ad draft** so that **I can start making an ad and publish it later when I want**

48. Message: Send message

    As a **logged-in user** I can **send a message to another user** so that **I can contact them for example pet sittings or other inquiries**

49. Message: Can only view own messages

    As a **logged-in user and owner or receiver of a message** I can **only view my own messages** so that **no other user can read my private messages**

50. Message: Delete message

    As a **logged-in user and message owner** only I can **delete a message** so that **I can control the messages that I have sent and that no one else can delete them**

51. Message: Hide message

    As a **logged-in user and message receiver** I can **not delete a message, but I can hide the messages I don't want to view** so that **they don't show in my message view**

52. Message: Filter

    As a **logged-in user** I can **filter my messages based on owner and receiver** so that **I can view messages from or to a specific user**

53. Message: Search

    As a **logged-in user** I can **search for my messages based on subject, the sender or receivers username** so that **I can find messages that I am looking for**

54. Message: Reply

    As a **logged-in user** I can **send a reply to a message** so that **I can easily keep in contact with the message sender**

55. Petsitting: Create petsitting

    As a **logged-in user** I can **create a petsitting and connect my pets and the petsitter to it** so that **I can keep track of all petsittings and rate the petsitter once the petsitting is finished**

56. Petsitting: Connect pets

    As a **logged-in user** I can **connect and only choose from my own pets to connect to a petsitting** so that **I can keep track of which pets have had petsittings and no one else can connect petsittings to my pets**

57. Petsitting: Manage petsittings

    As a **logged-in user and petsitting owner** I can **edit and delete petsittings** so that **I can control my petsittings**

58. Petsitting: View petsitting details

    As a **Petsitting owner or petsitter** I can **view the detailed information of the petsitting** so that **read and check the details of the petsitting, compensation etc**

59. Petsitting: Filter petsittings

    As a **petsitting owner or petsitter** I can **filter petsittings based on owner, pets, petsitter and status** so that **find and view the ones that are of interest to me**

60. Petsitting: Search for petsitting

    As a **petsitting owner or petsitter** I can **search for a petsitting based on the name of the pets, location or description of the petsitting** so that **I can easily find a specific petsitting**

61. Petsitting: Order petsittings

    As a **petsitting owner or petsitter** I can **order my petsitting by start and end date of petsitting, status or the date it was created** so that **I can view my petsittings in the order that is of most interest to me**

62. Rating: Create rating

    As a **petsitting owner** I can **rate the petsitting** so that **the petsitter gets a rate and other pet owners can see my impression of the petsitting and the petsitter**

63. Rating: Manage ratings

    As an **owner of the rating** I can **edit and delete a rating** so that **I can control my ratings and update or delete them if I'd like**

64. Rating: View ratings as user

    As a **user** I can **view ratings and the details of it** so that **I can read about it and see the rate of the petsitter**

65. Rating: View rating as pet owner

    As a **pet owner** I can **view ratings and the rate of the petsitter** so that **I can choose a petsitter for my pets with more confidence**

66. Rating: filter ratings

    As a **user** I can **filter ratings on the petsitter, owner and rate** so that **I can view the ratings that are of interest to me**

67. Rating: Order ratings

    As a **user** I can **order ratings by rate or creation date** so that **I can view the highest/lowest or newest/oldest ratings first**

</details>

### User story fulfilment

This is how the user story is fulfilled, the blank ones are the ones still left to be implemented in feature Sprints.

<details>
<summary>User story fulfilment</summary>

| Number | Fulfilled |
| --- | --- |
| 1 | The user can edit their profile if they click on the three dots drop-down toggle and choose the edit profile menu option |
| 2 | The user can click on the user's profile image and will be taken to that user profile page where they can view information about them |
| 3 | The user can sign in if they have an account by clicking on the sign in button and entering their information |
| 4 | A user can sign up if they click on sign up and enters a valid username and password |
| 5 | The user can see if they are logged in by the sign up and sign in buttons disappearing and the sign out button appears instead, the sidebar is also only visible if signed in |
| 6 | The user can log out from their account by clicking on the sign out button |
| 7 | The user can see the navbar on every page as well as the sidebar making it easy for them to navigate |
| 8 | A logged out user sees the sign in and sign-up buttons on the navbar to be able to sign in or up easy |
| 9 | The user avatar is visible on posts, ads, pet sittings and most popular profiles |
| 10 | The user can navigate the different pages without page refresh with the help of react router |
| 11 | The user can update their username and password if they click on the three dots drop down toggle and choose either change username or change password |
| 12 | The user can view the most followed profiles to the side of the main content on most of the pages |
| 13 | |
| 14 | |
| 15 | The user can view all posts if they navigate to the post page |
| 16 | The user can create posts if they click on the plus icon with the new text next to it on the navbar and choose post from the drop down menu |
| 17 | The user can choose to edit or delete their post if they click the three dots toggle and choose from one of the menu options |
| 18 | The user can click on the posts image to view only that post, there they can view the comments on the post as well |
| 19 | The user can type in their search word in the search bar on top of the post page to search for posts based on username or post title |
| 20 | |
| 21 | The user can like a post if they are logged in, hasn’t liked the post yet and are not the post owner |
| 22 | |
| 23 | The user can see the number of likes and comment on each posts displayed under the content, number of likes is displayed next to the heart and number of comments next to comments icon |
| 24 | The user can remove their like if they have liked a post by clicking on the heart icon again |
| 25 | If the user is logged in they can write a comment by clicking on the post and scrolling down to under it, there the comments form is displayed and they can type their comment and click 'post' |
| 26 | The user can edit and delete their comment if they click on the three dots and choose from one of the options |
| 27 | Both logged-in and logged-out users can view the comments under the post they have selected to view. |
| 28 | |
| 29 | The user can see how long ago the comment was made right next to the name of the user who commented. |
| 30 | There are two ways for the user to follow another user, the first one is by clicking on the "follow" button on the user's profile page. The second is by clicking on the "follow" button in the most followed profiles box that is displayed on most of the pages. To unfollow, the user does the same, the button is then a "unfollow" button instead and if clicked the user is no longer following that user. |
| 31 | To create a pet the user clicks the plus symbol with the "new" text next to it in the navbar and chooses "new pet" from the drop-down, which will take the user to the create pet page where they can fill in all information. The user can also get to this page from the petsittings form if they have not created any pets yet. |
| 32 | To edit or delete a pet the user needs to click on the pet to go to the pet page, and from there they can edit or delete the pet by clicking on the three dots symbol in the right upper corner. This will only be visible to the owner of the pet. |
| 33 | The user can see all details about the pet both from the pets page and from the pet page |
| 34 | The user can filter the pets by type of pet or just the user's pet. To filter by type the user chooses one of the options from the drop-down, for the user's pets they click the "my pets" button. |
| 35 | The user can search for pets by typing in the search word in the search bar. |
| 36 | The user can create a new ad by clicking on the plus circle and choose “new ad” from the drop-down menu |
| 37 | The user can edit or delete their ad if they are on the AdPage and click on the three dots drop down menu and choose from either edit or delete menu options |
| 38 | The users can view ads, if the current user is the ad owner they can view all ads, for other users only the active ads will be displayed |
| 39 | |
| 40 | The user can filter ads by type of ad, what pets the ad is for and  |
| 41 | The user can search for ads by the ad owners username or the location of the ad |
| 42 | |
| 43 | |
| 44 | |
| 45 | |
| 46 | |
| 47 | The user can create a draft by choosing the status of draft when creating the ad, once created the user can view their ads in the ‘my drafts’ box to the right of the ads on larger screens, and on top of the ads on smaller screens on the ads pages |
| 48 | |
| 49 | |
| 50 | |
| 51 | |
| 52 | |
| 53 | |
| 54 | |
| 55 | The user can create a petsitting by clicking on the plus circle and choosing new petsitting from the drop down menu options |
| 56 | If the user has any pets they can connect them to the petsitting by clicking on the pets to connect from the list. If the user hasn’t added any pets yet, they are encouraged to do so, or they can choose to create a petsitting without any pets |
| 57 | The user can manage their petsitting by clicking on the three dots icon on the petsitting detailed view, from the drop down menu they can choose to either edit or delete the petsitting  |
| 58 | The user can view the details of a petsitting by clicking in the petsitting they would like to know more about. If the current user is the owner or pet sitter, they can see the compensation field, if not they can view all information except for the compensation |
| 59 | |
| 60 | |
| 61 | |
| 62 | |
| 63 | |
| 64 | |
| 65 | |
| 66 | |
| 67 | |
| 68 | |
| 69 | |
| 70 | |
</details>

## Agile Approach

I followed the Scrum methodology when developing this project.
Four sprints were made leading up to this release, each sprint was only 6 days which is quite short but since it was only me and I had a limited amount of time it helped make prioritizing easier.

Each sprint started with a short sprint planning, choosing items from the product backlog that I thought I would manage to finish during the sprint and setting the sprint goal.  The sprint length was set with an optimistic mindset that I would not run into any issues, well I'm more of a realist now and have learned a lesson. With that said at the end of sprint 3, I realized there was no way I was going to be able to finish the product backlog items and decided to dedicate sprint 4 to documentation and thorough manual testing instead. This was carried out to some extent while developing in line with the Scrum definition of done but more documentation and testing were needed.

### Sprint 1

The Sprint goal for the first sprint was to have functional navigation, user authentication and the ability to make posts. When developing the navbar I felt that there were too many icons so decided to implement a sidebar, even if that was not planned I felt like it was achievable in the sprint and a part of the navigation user story.

### Sprint 2

The Sprint goal for the second sprint was to have an application where the user could like and comment on posts, and edit and manage their profile, username and password. All the functionality for ads should also be implemented such as create, edit and view.
To show interest in ads was a part of sprint 2 to start with but was down-prioritized and put back into the product backlog.

### Sprint 3

The Sprint goal for the third sprint was to have an application where the user could create and manage pets, create and manage petsitting and connect the petsittings to their pets and another user who would be the pet sitter. The ability to rate and show ratings was also part of the sprint but this too was down-prioritized and sent back to the product backlog.

### Sprint 4

This was the last sprint before submission and the Sprint goal was to have a deployed application with full crud functionality that would pass. The focus of the sprint was to test and correct all small issues, such as responsiveness not being 100% in some areas, links working properly and writing up the final bits in the readme.

## Features

### Components

#### Spinner Asset

The spinner displays when data is loading from the API to give the user some feedback

![spinner](/documentation/images/spinner.png)

#### Avatar

The avatar component is used on several pages to display the user or pets image as a small avatar

![avatar](/documentation/images/avatar.png)

#### Three dots dropdowns

The three dots drop-down is used on all pages where the user can manage objects, such as posts, petsittings etc. It's a drop-down menu with the option to edit or delete objects.

### Navbar

The navbar component consists of the pet palace logo, which only displays the paw on extra small screens up to 370px, and the paw logo with the Pet Palace text on all other screens wider than that.

![navbarwide](/documentation/images/navcolmed.png)

![navbarsm](/documentation/images/navcolsmall.png)

![navbarxs](/documentation/images/smalliconnav.png)

For logged-out users they can choose from the nav links home, contact, sign in and sign up.

![navbarloggedout](/documentation/images/navbarout.png)

For logged-in users, the navbar displays a plus symbol with the next New, which is a drop-down menu with the options: new post, new ad, new pet and new petsitting.

![new](/documentation/images/newbtnexpand.png)

The home and contact nav items are the same as for logged-out users, and the sign-in/up links are replaced with sign-out instead. The last item in the Navbar is the logged-in user's avatar and username that leads to the user's profile page if clicked.

![navbarsigndin](/documentation/images/navbarin.png)

The new nav option stays visible on the navbar at all times also when the rest of the links are hidden in the collapsed navbar.

### Side Bar  

The sidebar component is a navigation component designed to let the user easily navigate the different functions and pages on the site. If the user clicks the two arrows on top the sidebar opens and reveals both the icon and where the name to it leads, and once open the close icon appears instead. 

![opensidebar](/documentation/images/sidebarexpanded.png)

![closedsidebar](/documentation/images/sidebar.png)

The Side Bar is designed with the thought that when users are familiar with the different icons and where they lead, they can simply click the icon without having to open the panel for navigation.

### Footerbar

The Footerbar is a navigation bar for screens up to 507px, from 508px the Sidebar is displayed instead. The Footer bar has four icons at first glance, one drop-down home link, one for petsittings, one for pets and the last one for ads.

![footernav](/documentation/images/footernav.png)

The home drop-down menu has three options for displaying posts, the first displays all posts, the second for the post by the users that the current user is following and the last is for all liked posts by the user. The Footerbar is only displayed for logged-in users, and while it's not possible to sign in from mobile devices at the moment it's ready to go when it is.

### Pages

#### Sign in & Sign up pages

The sign-in page and the sign-up page are pretty similar, for signing up the user needs to enter a username and password twice to make sure they match. When signing in the user enters their username and password, if some of the input fields are missing the button will be disabled. If the user enters the wrong information they will get an error message.

#### Posts

The post feature allows users to create posts that then are displayed based on all, just from users that the logged-in user follows or just posts that the user has liked. The feature is greatly inspired by the code institute moment posts function with added category field that lets users pick a category for their posts. The different categories are collected from the API with axios.options method leading to the category choice variable.

![posts](/documentation/images/posts.png)

#### Comments

The comment component lets logged-in users leave comments on posts. This is done on the PostPage under the details of the post that the user wants to comment on.

![comments](/documentation/images/commentbox.png)

Once the user has left a comment it will be displayed under the comments form and the user can edit or delete their comment from there as well by clicking on the three dots.

![commentmade](/documentation/images/commentmade.png)

![commentedit](/documentation/images/editcomment.png)

#### Profile

The profile features include letting users update both username and password as well as editing their profile.

![profileedit](/documentation/images/editprofile.png)

They can change their profile image and description, and state if they are a pet owner or not. Pet owners will get a paw next to their name that leads to their pet page making it easy for other users to view their pets. Beneath the profile card, the users' posts will be displayed. The profile features are greatly inspired by the moments walkthrough from Code Institute.

![profile](/documentation/images/profileloggedin.png)

If the user has any pets or ads these will be displayed to the side on larger screens, making it easy for other users to find.

The "Users ads" box displays all ads by the user that have the status of active and haven't passed the end date yet. All ads by the user with the status of 1 (active) are fetched from the api and are displayed if the date_to variable is after today's date. The box only displays if the user has any active ads.

![usersads](/documentation/images/usersadsbox.png)

The "users pets" box shows the avatar and name of the user's pets if they have any.

![userspet](/documentation/images/userspetsbox.png)

#### Popular profiles

The most popular profiles, which are the ones with the most followers, are displayed on almost all pages. The component will be displayed to the side of the main content on a larger screen and above the content on smaller screens.
The user can follow or unfollow other users directly from this component by clicking on the buttons

![popularprofiledesk](/documentation/images/mostfolloweddesktop.png)

![popularmobile](/documentation/images/mostfollowedmobile.png)

This feature is greatly inspired by the moments walkthrough with Code Institute without any specific alterations from the original code.

#### Ads

The ad features include creating, editing and viewing ads.

![ads](/documentation/images/ads.png)

The user can create ads if they need a petsitter, wants to petsit or any other type of ad.  

![createAd](/documentation/images/newad.png)

The user can search for and filter ads on the type of pet or the type of ad it is, so if the user only wants to see ads with dogs they can choose 'filter by pet' and then choose the dog options.

![topofad](/documentation/images/topofadspage.png)

##### DraftAd  

If the user has any ads in the draft stage, the ad's title will be displayed, and if clicked, it leads the user to that post. The component will be displayed on the side of the ads on larger screens and at top of the content on smaller screens.

![draftonlg](/documentation/images/yourdrafts.png)

The user can delete their draft from the side panel if they click on the trash can, a modal will then appear to have the user confirm they would like to delete the draft to make sure no accidental deletion occurs.

![deletemodal](/documentation/images/deletedraftmodal.png)

#### Pets

The pet's features include viewing, creating and editing pets. Users can create 'pets' where they can add information and an image about their pet. They can later choose to connect their pet to the petsitting, making it easy for the petsitter to find information regarding the pet.

![pets](/documentation/images/pets.png)

The pets page shows all user's pets, and the logged-in user can filter based on the type of pet or just the user's pets.

If the user doesn't choose an image, a default image will be set, this image is from pexels.

![defaultpet](/documentation/images/petprofile.jpg)

The "my pets" box shows the currently logged-in users' pets on both the pets page and the page

![mypets](/documentation/images/topofpetspage.png)

#### Petsittings

Users can create petsittings, choosing from other users on the site, excluding admin and staff users (Deleted). They will need to enter information about the petsitting such as location, start and end date, compensation, description and if they want to connect any pets to the petsitting. The user can only choose from their pets, and if they haven't created any pets yet they are encouraged to do so in the pets field. Lastly, the user can choose if the petsitting has the status of planned, ongoing or finished.

![newpetsitting](/documentation/images/newpetsitting.png)

If the user has pets to connect

![petsittingpets](/documentation/images/petsittingspets.png)

In this form I decided to let users choose from passed dates due to that they might want to register a petsitting that has already started, the petsitter might not have had an account when the petsitting took place or for some other reason. The end date needs to be after the start date though.

The petsittings page displays only a bit of the petsitting information

![petsittinglist](/documentation/images/petsittinglist.png)

If clicked on the petsitting the user will be sent to the detailed petsitting, as of now users can watch all petsittings, however, if they are not the owner of the petsitting they will not be able to see the compensation field.

![petsitting](/documentation/images/petsittingdetails.png)

If the user has added any of their pets to the petsitting, the 'pets to sit' field will be displayed as well as a paw for each pet. The paw can be clicked and will take the user to the pet's details, which could be handy for the petsitter to quickly find information about the pet/pets they are petsitting.

Users can filter the petsittings and search for specific petsittings at the top of the petsittings page

![petsittingstop](/documentation/images/topofpetsittingspage.png)

### Features to be implemented in the future

The API has the functionality already now to handle messages, ratings and adding interest to ads but was not implemented in this release due to time constraints.

Other features could include some sort of geolocation, such as google maps api could be integrated to give the user a better experience. Displaying ads that have the location close to the user for example, since it's thought to be a global site it's no point in showing all ads that are not even in the same country. For now, the user can use the search bar to search for ads in a specific location.

User verification system - A future feature could be to have some sort of verification that the user is the person they say they are, Airbnb is a good inspiration on how to validate users from different countries. This feature could make users feel safer when arranging petsittings.

#### Ad interests

The ad interest feature would be a lot like the likes feature, allowing users to show interest in ads by clicking an 'interested' button. This would allow the ad owner to see if there was anybody interested in their ad, and ads could be sorted to display the most popular ones first

#### Ratings

The rating feature lets users that are the owner of a pet sitting with the status of "finished" rate that pet sitting. The rate will be added to the user registered as a pet sitter and the average rate will be calculated and shown on their profile. There is also a plan to have users view profiles with the highest ratings much like the most followed profiles component

#### Messages

The messages feature will let users send messages to each other, which is a must if the users are going to arrange pet sitting with each other's and also for responding to ads. As a bandaid, I added a contact attribute to the profile model and then added it to the ads and petsitting serializers so that the user at least can add some sort of contact information. The user is also encouraged when creating an ad or petsitting to add their contact information to their profile so that users can contact them.

## Releases

Since this is a project with Code Institute for educational purposes the current release contains all that is described above. If the project were to be 'released for real' I would probably only include posts, like, following, comments and pets in the first release, due to that I believe a message function of some sort is needed for the rest. Putting up ads without users having the ability to respond to them doesn't make much sense, also creating petsittings should include some sort of petsitter approval before it's created.

## Media and Design

### Wireframes

Wireframes were made and updated throughout the project, however, there might be some small differences from the finished product.
The new ad form wireframe was made by hand using Onenote on an Ipad, the rest were made using Balsamiq.

<details><summary>Wireframes can be found here</summary>

- Wireframes for all 'side panel' components

    ![components](/documentation/wireframes/componentswireframe.png)

- Wireframe for Nav-, side- and footer-bars

    ![nav](/documentation/wireframes/navwireframes.png)

- Wireframes for the ads page and ad form

    ![ads](/documentation/wireframes/adswireframe.png)

    ![newad](/documentation/wireframes/newadwireframe.png)

- Wireframe for pets page

    ![pets](/documentation/wireframes/petswireframe.png)

- Wireframe for posts page

    ![posts](/documentation/wireframes/postswireframe.png)

- Wireframe for profile page, this is not completely updated and contains both ratings and message components that are not a part of this release.

    ![profile](/documentation/wireframes/profilewireframe.png)

- Wireframe made for ratings that never got implemented

    ![ratings](/documentation/wireframes/ratingswireframe.png)

</details>

### Images

All images are licenced from Adobe Stock. The 'helper cat' that is displayed when no results are found and for uploading an image is made using Adobe express. The default profile and post image is from the moments walkthrough with Code Institute and the default pet image is from pexels

### Logo

The logo is made using Adobe express, on small screens only the icon will display.

### Fonts

Fonts used for the project are mainly Caveat for heading and Roboto all other text, all from google fonts. The font in the logo is Pacific Nor from Adobe.

![Caveatfont](/documentation/images/font-caveat.png)
![Robotofont](/documentation/images/font-roboto.png)

### Colours

The colours for the project are blue, orange and white
![colours](/documentation/images/petpalacecolors.png)

## Testing

Testing, validations and bugs can be found [here](/TESTING.md)

## Deployment

### Project setup and first deployment

1. Create a new repository on GitHub by clicking "New repository" and choosing a name for the project.
2. Create a new workspace by clicking on "Gitpod".
3. When the workspace has finished loading, run the terminal command `npx create-react-app . --template git+https://github.com/Code-Institute-Org/cra-template-moments.git --use-npm` to install React and the correct dependencies and library versions needed.
4. When everything is installed, run the command `npm start` to make sure that the app is working, if everything is correct the browser should display a spinning React logo on a dark background.
5. Remove the logo import in App.js and replace the React header with a custom message, for example, an h1 with the text 'It works'.
6. Make sure the changes are rendered in the browser, if everything works, add, commit and push the changes to GitHub.
7. Sign in to Heroku and create a new app
8. Go to the Deploy tab and choose GitHub for 'Deployment method'
9. Find the name of the repository and click 'Connect'
10. Scroll down and make sure to have the main branch selected, then click 'Deploy branch'. Click 'view build log' to get a better view of the deployment.  
11. Once deployed, click 'Open app' to make sure you can see your custom message set in App.js

### Final deployment

1. Create a Procfile and add `web: serve -s build`
2. Ensure all finalised code is committed and pushed to Github.
3. Log into Heroku and open the dashboard for your frontend react application.
4. Select the “Deploy” tab in the dashboard and select "Deploy Branch".
5. Wait for the build to complete, click “view build log” to watch the process in a larger window.
6. When you see the message “deployed to Heroku” in the build log, click the “open app” button at the top of the page.
7. Test the deployed application to ensure it matches the development version.

## Technologies and resources used

### Languages

- HTML
- JSX
- CSS
- JavaScript

### Frameworks, programs and platforms

- React.js
- React Bootstrap.js
- Balsamiq - For wireframes
- GitPod - For the workspace
- GitHub - For hosting the Repository
- ESLint - To validate the JavaScript and jsx code
- Heroku - Platform for deploying and hosting the deployed version of the website
- Adobe Illustrator for vector handling
- Adobe Express for creating the logo and the "cat helper"
- Adobe Creative Cloud for removing backgrounds from images

### Sites

- [AmIResonsive](https://amiresponsive.blogspot.com/) - To check responsiveness on all screen sizes
- [Coolors.co](https://coolors.co/) - For creating an image to present the colours in the README
- [Google fonts](https://fonts.google.com/) - For fonts
- [Adobe Stock](https://stock.adobe.com/) - For images for the site
- [FontAwesome](https://fontawesome.com/) - Icons used on the site
- [Jigsaw CSS validator](https://jigsaw.w3.org/css-validator/) for validating the CSS files

### Resources

- The Code Institute's Moments walkthrough project code for setting up the project and many of the components
- React Bootstrap documentation
- Stack overflow and W3C Schools for inspiration on solutions
- Code Institute Slack community

## Credits

- Code Institutes moments project walkthrough was used and followed to create the first part of the project, such as posts, profiles, avatars, assets such as spinner, navbar, like and commenting on a post and follow/unfollow functions with minor alterations to suit my project.

- My mentor, Spencer Barriball, for guidance and support.
