
### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

---

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

---

### 3. Describe 3 ways to pass information from a component to its PARENT.
- Through a callback function being passed from parent to child as a prop;
- By storing data through a provider in the child component and fetching it with `useContext` in the parent component;
- By storing data through a reducer in the child component and fetching it with `useSelector` in the parent component;

---

### 4. Give 2 ways to prevent components from re-rendering.
- Using memoization with `useMemo` and `useCallback` Hooks;
- Replacing `useState` with `useRef` to track any changes in the state without having the component re-rendering.

---

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragment is a way to group a list of children without adding extra nodes to the DOM, using fragments might be an issue if you need to style it since it's not rendered in the DOM.

---

### 6. Give 3 examples of the HOC pattern.

---

### 7. What's the difference in handling exceptions in promises, callbacks and async...await.
- *callback*: the exception handling with callbacks doesn't happen in an asynchronous way that ends up leading to "callback hell" which can be quite confusing if you happen to have nested functions, handling exceptions for each of then will result in a visually confusing code, in these cases you have to handle the exceptions manually;
- *promises*: exception handling is much clearer and easier, you still have to manually `resolve` and `reject` your promise, but you'll be able to work with `then` and `catch` functions to easily handle your request. It can also get a little confusing if there are nested promises, but there are come ways to solve that like `Promise.all` for an example, even though your code might look a little wonky;
- *async...await*: async functions can be handled using try/catch pattern these makes things even easier because any error that occur inside of the try scope will automatically be caught in the catch scope, these can solve the problem with nested calls (callbacks and promises) and makes the code clearer and easier to understand/debbug.

---

### 8. How many arguments does setState take and why is it async.
The function `setState` takes one argument, either an object or an arrow function and they are `async` to provide better user experience and performance since a `setState` call can result in a heavy operation.

---

### 9. List the steps needed to migrate a Class to Function Component.
- Change the class to a function;
- Remove the render method;
- Convert all the methods to functions;
- Remove all references to `this`;
- Remove the constructor method;
- Remove event handler bindings;

---

### 10. List a few ways styles can be used with components.
- inline css;
- normal css/importing a normal css file in a component;
- javascript css/using it as a style object;
- as a css module;
- Sass & SCSS;

---

### 11. How to render an HTML string coming from the server.
To render a HTML string you have to use `dangerouslySetInnerHTML` with an object having a `__html` attribute to remind any other developer that rendering html like this is a dangerous practice.

---