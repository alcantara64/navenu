# Navenu React Native Mobile App 

## Development Team 

 Nick Nguyen = Project Lead / Web and API Developer (California USA)  Nick@Navenu.com (949)386-0344
 
 Emmanuel Agahiu =    React Native Developer (Amsterdam Netherlands)  emmanuelagahiu@gmail.com
 
 Ariel Conti = React Native Developer (Lisbon Portugal)   arielconti10@gmail.com
 
 Theo Lamar =  UI/UX Designer (Toronto Canada)  theolamar@gmail.com
 
 Russell Cunningham = Data Manager (Toronto Canada) russellwcunningham@gmail.com
 
## Figma Design

[Navenu Figma](https://www.figma.com/file/1VQdbZ2qUgG4YT91I2xaX4/Navenu-Master?node-id=56%3A480) 

Please contact Theo Lamar for any graphic assets or UI/UX related questions or suggestions.

## Task Management

[JIRA Project Management](https://navenu.atlassian.net/jira/software/c/projects/MOBILE/boards/2)

## Work Flow

Please follow this workflow. So there is no overlapping work and to prevent future conflict over hours. 

- Feel free to petition a task in the "BackLog" and be sure to include estimated hours. 
- Obtain Task from the "Selected for Development" column of JIRA, and indicate estimated hours to complete task.
- Move Task to "In Progress" column when you are working on it
- Upon Task completion. Submit a pull request for review, in your pull review you MUST indicate the following 1) JIRA Task ID 2)description of work performed inc any task that cant be quantified in code (meetings, research, debug, etc) 3) billable HOURS 

The hours indicated in your pull request is used as a cross reference with Lemon billable hours.

## IMPORTANT! Any hours billed with Lemon, that do not include an associated pull request WILL BE DISPUTED!!

If your work is to exceed 8 hours, please submit a pull request (No Pull request should be over 8 billable hours) , even if the code is incomplete. 

# Web Based Venue Management

[Venue Administration DEV](https://api.navenu.com/admin/venue)

# API End Point

[Dev Navenu End Point](https://api.navenu.com/api/)

Test account credentials navenuteam@navenu.com:Gonavenu

# Wordpress User and Editorial Management

[Dev Navenu Administration](https://dev.navenu.com/wp-admin/)

# Dev Version of public facing website 

[Navenu Website Dev](https://dev.navenu.com) 

# CDN URL 

Images and video are stored in AWS S3 and distributed from AWS Cloudfront from the following domain:

[https://media.navenu.com](https://media.navenu.com)



## Main Libraries Used (refer to package.json for complete list):

- React Native
- [Iginite Red Framework](https://github.com/infinitered/ignite)  - Development Framework which includes a slim down version of EXPO
- [React Native UI Lib](https://github.com/wix/react-native-ui-lib) (by Wix) - Theme and Styling 
- React Navigation    -  Navigation
- MobX State Tree    - State Management
- TypeScript    - Type Management
- [React-Query](https://react-query-v3.tanstack.com/) - Server Side State Manangement
- Notifee Push Notifications  -Push Notifications
- React Native Maps  - Map display
- Axios   - Remote API Data Fetching



## Project's structure:


### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:



**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Detox end-to-end tests

Read [Detox setup instructions](./detox/README.md).

