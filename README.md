# FactoryPal-Code-Challenge
This project was built for FactoryPal as a coding challenge following the interview process for a Frontend developer position.

## Problem:
FactoryPal ingests and transform large amount of data that in the end, needs to be presented to the final user over a friendly and interactive UI. Usually, the UI is composed from a chart and a table, which have relationship with each other, and therefore, be cross-interactive. You can choose your own design, feel free to show your UI/UX skills.

## Solution:
### Default state:
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/b1a99271-c340-4dbc-9ab5-1ca3c2548b02)
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/f14f6e55-5718-4f70-a695-f0b0f00124b0)

### Hovering a doughnut chart arc:
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/5b2ea6ce-86a4-4790-90c1-3ca8bc9ed663)

### Clicking on a chart card:
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/da2ef840-e12d-4013-a2ff-b2f834c028fc)

### Using the search bar to filter information:
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/4f941aad-82ba-4abe-b42d-b448abe2caf2)

### No results:
![image](https://github.com/MiguelR0drigues/FactoryPal-Code-Challenge/assets/96126710/af380553-1040-45fe-ac7a-4f97046843de)


## Built with

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static types to the language.
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
- [Jest](https://jestjs.io/) - A delightful JavaScript testing framework.
- [Styled Components](https://styled-components.com/) - A CSS-in-JS library for styling React components.
- [D3](https://d3js.org/) - A JavaScript library for developing charts and other elements to help visualize data.


## Structure:
```
├───api
│   └───__tests__
├───components
│   ├───card
│   │   └───__tests__
│   ├───charts
│   │   ├───bar
│   │   ├───doughnut
│   │   ├───gauge
│   │   └───__tests__
│   ├───metrics-sections
│   │   ├───downtime-section     
│   │   ├───efficiency-section   
│   │   ├───shift-section        
│   │   └───__tests__
│   ├───no-results
│   │   ├───charts-sections      
│   │   └───table
│   ├───search
│   │   └───__tests__
│   └───table
│       └───__tests__
├───contexts
├───store
│   └───__tests__
├───theme
│   ├───icons
│   └───illustrations
└───__tests__
```

## Skipped due to time constraints:
- Toasts for error handling
- Some responsiveness

## Improvements for the future:
- Animations
- Order by columns on the table
