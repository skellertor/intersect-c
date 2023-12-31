##Instructions
This is a nextjs application. To run this program you must have nodejs installed.

Steps :runner:

1. Install dependencies. `npm`, `yarn`, or `pnpm` can be used. If you are using `npm` run

```bash
npm i
```

2. Do get the application running use the following command.

```bash
npm run dev
```

3. Open a web brower and open it to http://localhost:3000, or if port 3000 is already in use, use the port specified in the command line.

##Thoughts:
This was orignally written using javascript and no framework. Printing emojis on the command line, and creating certain future events (adding cars button) were a little tricky so I decided to use React to render the UI and allow for buttons to simulate events like cars triggering the lights to switch sooner than their time, or crosswalk events (athough I didn't have time to implement this feature).

A state machine seemed like a good fit for this assignment, but instead of using an off the shelf solution like xstate, this seemed like a good chance to play with generators. The states can be found under the `data` directory and is passed as an argument into the generator function. The generator is just used to keep the current state and fetch the next state in a neverending loop. The states are separated into their own array so if you wanted to play around with light durations, or light sequences you can easily change the states without messing with the generator. If you do change something just do a page refresh.

The main "gotcha" that ate of most of my time was when I attached react to my logic. Something about react 18 was causing my `useEffects` to run more than just on page load. It made multiple instances of my state machine with differing states at once.
It caused me to take most of the time hunting down the issue. I ended up solving it by just making the generator a singelton, but it seemed to complicated for this, so I eventually just downgraded the react version to 17 so it could be as simple as possible.

Most files are generated by `create-next-app`. The one I created are

- ./data/index.js (states for the state machine)
- ./pages/index.js (the page to render the intersection)
- ./components/\* (two components and their style sheets)
- ./util/index.js (state machine, loop logic, and a sleep function)
