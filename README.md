# node-workbench
A quick prototyping environment built with node with tools for math homework.

### Install
This project is self-contained and does not need to be compiled. Place it wherever you'd like.
To install, run the `INSTALL` file.
Or optinally run `npm install`.

## Start
Run the `START` file to open the workspace in Sublime Text and begin watching for code changes with `gulp`.
Optionally you can open workspace.js in whichever editor you'd like and watch / run it by running `gulp`
from the `node-workbench` directory.

### `workbench.js`
This is where most of your code should go. The only line required in this file is `require('./utils.js');`.
Whenever you make a change to this file, code will be run and output displayed in your terminal.
Optinoally you may want to include `MODE = DEG` or `MODE = RAD` to indicate whether trigonometiric functions should expect inputs to be in degree or radian.

## Examples
##### File: `workbench.js`
```javascript
require('./utils.js');
MODE = DEG;

function f(x) {
    return pow(x, 3) - 5 * x + 3;
}

function secant(a, b, n) {
    out.cyan(`Finding root of f between ${round(a, 3)} and ${round(b, 3)}.`);
    if (!--n) return b;
    let c = b - ((b - a) / (f(b) - f(a))) * f(b);
    return secant(b, c, n);
}

let root = secant(1, 2, 7);
out.bgBlue(chalk.yellow.bold(`Root found: ${root}`));
```
##### Output: 

![image](https://cloud.githubusercontent.com/assets/1683528/20647546/b2b631c8-b44b-11e6-8710-d3b3bf7a22e7.png)

### `utils.js`
A collection of utilities (mostly math) can be found in `utils.js`.
Functions and variables in `utils.js` should be made global in order for workspace.js to be able to utilize them.
Here is a list of some of (not all) the functions available via `utils.js`


`out.default(output)` Displays output in the default color in the terminal. (Equivilant to console.log)     
`out.black(output)` Displays output in black in the terminal.       
`out.red(output)` Displays output in red in the terminal.       
`out.green(output)` Displays output in green in the terminal.       
`out.yellow(output)` Displays output in yellow in the terminal.     
`out.blue(output)` Displays output in blue in the terminal.     
`out.magenta(output)` Displays output in magenta in the terminal.       
`out.cyan(output)` Displays output in cyan in the terminal.     
`out.white(output)` Displays output in white in the terminal.       
`out.gray(output)` Displays output in gray in the terminal.     
`out.bgBlack(output)` Displays output with a black background in the terminal.      
`out.bgRed(output)` Displays output with a red background in the terminal.      
`out.bgGreen(output)` Displays output with a green background in the terminal.      
`out.bgYellow(output)` Displays output with a yellow background in the terminal.        
`out.bgBlue(output)` Displays output with a blue background in the terminal.        
`out.bgMagenta(output)` Displays output with a magenta background in the terminal.      
`out.bgCyan(output)` Displays output with a cyan background in the terminal.        
`out.bgWhite(output)` Displays output with a white background in the terminal.      
`out.help()` Lists and previews all of the available output colors.     
`out.reset()` Clear the terminal window.        
`out.array2d(array)` Prints a two-dimensional array with a magenta background.      
`out.array2d(array, precision)` Prints a two-dimensional array fixed to `precision` decimals (for formatting) with a magenta background.        
`chalk` The `chalk` object for colored output. See [chalk](https://github.com/chalk/chalk/blob/master/readme.md) for more in depth documentation.       
`MODE` can either be set to `RAD` or `DEG`.     
`cos(x)` Cosine evaluated at x. (Affected by `MODE`) Similar to [Math.cos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos)       
`sin(x)` Sine evaluated at x. (Affected by `MODE`) Similar to [Math.sin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)     
`tan(x)` Tangent evaluated at x. (Affected by `MODE`) Similar to [Math.tan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan)      
`pow(base, exponent)` Equivilant to [Math.pow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)       
`sqrt(x)` Equivilant to [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)     
`PI` `pi` `π` Equivilant to [Math.PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)     
`e` `E` Equivilant to [Math.E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E)     
`º` Equivilant to π/180. Multiply a value in radians by this to get the value in degrees.       
`radToDeg(x)` Convert value in radian `x` to degrees.       
`abs` Equivilant to [Math.abs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)       
`round(x)` Equivilant to [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)      
`round(x, precision)` x rounded to the `precision` decimal place.       
`ceil(x)` Equivilant to [Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)     
`floor(x)` Equivilant to [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)      
`rand()` `random()` Equivilant to [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)       
`randRange(min, max)` A floating-point, pseudo-random number between `min` (inclusive) and `max` (exclusive).       
`randInt(min, max)` A pseudo-random integer between `min` (inclusive) and `max` (inclusive).        
        
