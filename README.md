# Detroit Sports Schedule

<a href= "[https://shielded-taiga-53121.herokuapp.com/](https://detroit-sports-calendar.netlify.app/)">Detroit Sports Schedule - Netlify app<a/>

<img width="400" alt="Screenshot 2023-03-12 at 9 33 10 AM" src="https://user-images.githubusercontent.com/75503142/224564433-ec12a67b-87c7-4b91-bb90-113bf1490020.png">

This app simply loads the Detroit Red Wing's game schedule for the next seven days ('upcoming week') 
and displays it in a grid format (intended for mobile use at this point). The NHL API was the only 'free' API that
I could leverage, but this is intended to incorporate the Lions, Tigers, and Pistons' schedules as well.

I used this as a practice project to utilize the fetch API and manipulating
the returned JSON data into a presentable format.
  
I had previously began building my own SCSS framework for future project builds, so I opted to use those
working pieces as opposed to another framework.

## Stack
### Front End
Javescript, HTML, CSS, Sass, Vite

### Back End
Node.js, Webpack

## WIP / PHASE 2
- Add load animations, style transitions
- Integrate 'load more' capabilities
- Incorporate Lions, Pistons, Tigers... MSU, U of M schedules
