## Coding Intensity Display App 

An app created utilizing the Carbon Intensity API which displays the Carbon Intensity in the UK. 

## Packages and Libraries used 
* React.js ver 16 
* Webpack
* React-router-dom
* SCSS
* Typescript
* Chartjs
  
## Design for this app
https://www.figma.com/file/pFH0haDm5oDzAAbdjLETZM/Untitled?type=design&node-id=352%3A60&mode=design&t=8hzqTgPDjb9kmLDH-1

I created a wireframe so I would have an idea on how I would structure my UI when I would code it out. 

## Initial App Structure 
App.tsx 
|
Home.tsx 
|
Regional Section (this there would be a link which would take us to the regional page)
|
Regional Details Page

## Overall Thoughts
This was one of the most challenging projects I have ever gotten for a take-home assignment. I had fun with it. One of the challenges I came across was determining how to handle state either via a library or React Context, as well as making the decision to create my own components as opposed to using a component library, due to the version of React being used. Other challenges include determining what to sacrifice in terms of functionality while still meeting MVP, data displayed, UI, etc. 

## Bonus Requirements Choices 

I went down the responsive route as well as the interactive chart route in the functionality section. After reviewing the data and the API I realized that if I were a user viewing this data on a table, especially the ones where there are hundreds of data I would get bored and probably get lost reading it. When displaying the regional data, I thought a table would be appropriate for it, but when breaking down the forecasts and the trends, using a graph would be more eye-catching and visually appealing. 

When it comes to the responsive route, we live in a world where everyone is constantly using their phones, so I went with a mobile first design and worked from smaller screens to bigger screens. 

For the other bonus section, I went down the Typescript route. While I admit I used 'anys' for some of the more trickier types when I was writing this out I did ensure that I created interfaces and types especially for the API response data.

## Deployment
https://carbon-intensity-kb.netlify.app/


