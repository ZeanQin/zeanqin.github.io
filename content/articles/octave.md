---
title: Basics of Octave
layout: post
use_toc: true
comments: true
excerpt: The high level programming language for prototyping machine learning algorithms.
---

## What is Octave

A high level programming language for quickly prototyping and developing machine learning algorithms. Once the algorithms have been developed, they can be properly implemented in other programming languages such as C++, Java etc.

## Installation

On Ubuntu, run

```sudo apt-get update && sudo apt-get install octave```

## Common Commands

Documentation can be found here [https://octave.org/doc/interpreter/](https://octave.org/doc/interpreter/). Some common commands are,

- `octave` starts the interpreter
- `help <functionname>` displays documentation for a built in function. For example, `help plot` will bring up help information for plotting.

### Basic operators,

- `+`, `-`, `*`, `/`, `^`
- `==`  - equality operator
- `~=` - inequality operator
- `&&` - the AND logical operator
- `||` - the OR logical operator
- `xor(<number>, <number>)` - the XOR operator
- `,` - chain two commands and carry them out together. Mostly for putting multiple commands on the same line.

### Other keywords,

- `%` - comment
- `;` - supress the print output
- `0` means false and all other numbers mean true

### Functions

- `PS1('>> ');` - change the octave prompt
- `disp()` - print the value of a variable, or a string
- `sprintf('something %0.2f', pi)` - print optional arguments under the control of the template string template and returns a string
- `format` or `format options` such as `format long`, `format short` etc. changes the number of characters to be displayed
- `sqrt()`
- `hist()` plot a histogram
- `size(A)` or `size(A, DIM)` return a row vector with the size (number of elements) of each dimension for the object A. When given a second argument, DIM, return the size of the corresponding dimension.
- `length()` Return the length of the object A. The length is 0 for empty objects, 1 for scalars, and the number of elements for vectors.  For matrix or N-dimensional objects, the length is the number of elements along the largest dimension (equivalent to 'max (size (A))').
- `max(X)` - Find maximum values in the array X. For a vector argument, return the maximum value.  For a matrix argument, return a row vector with the maximum value of each column.  For a multi-dimensional array, 'max' operates along the first non-singleton dimension.
- **`magic(N)`**

    Create an N-by-N magic square.

    A magic square is an arrangement of the integers '1:n^2' such that
    the row sums, column sums, and diagonal sums are all equal to the
    same value.

    Note: N must be a scalar greater than or equal to 3.  If you supply
    N less than 3, magic returns either a nonmagic square, or else the
    degenerate magic squares 1 and [].
- **`find(N)`** 
- **`flipud(X)`** - Flip the matrix upside down.

Implementation of bash commands

- `pwd` shows the current working directory
- `cd`
- `ls`
- `quit` or `exit` exit Octave

### Common tasks

- `a = 1`, `a = pi` - define variable a and assign it a number
- `a = 'hi'` - string assignment

### Matrix

Define a matrix

- `A = [1, 2; 3 4; 5 6;]` defines a 3 x 2 matrix
- `A = [1 2 3;]` defines a 1 x 3 matrix
- `A = ones(2, 3)` generates a 2 x 3 matrix of all ones
- `A = zeros(2, 3)` generates a 2 x 3 matrix of all zeros
- `A = rand(2, 3)` generates a 2 x 3 matrix of random numbers drawn uniformly between 0 and 1
- `A = randn(2, 3)` generates a 2 x 3 matrix of random numbers drawn from gaussian distribution with mean zero and variance one
- `eye(4)` - generates a 4 x 4 identity matrix

Define a vector

- `v = [1; 2; 3;]` defines a vector
- `v = 1:0.1:2` defines a row vector (also 1 x 11 matrix), with each number increasing by 0.1
- `v = 1:6` defines a row vector (also 1 x 6 matrix)

## Move data around

Load data from file and save data to disk,

- `load file` or `load('<filename>.ext')` loads a file
- `who` shows the variables in memory
- `whos` shows the variables in memory with more details
- `clear` or `clear <variable_name>` to remove all variables or a particular variable from the memory
- `<vector_name>(1:10)` takes the first 10 rows of the vector
- `save <filename>.mat <variable_name>` save values in variable to file on disk
- `save <filename>.txt <variable_name> -asci` save values in variable to file on disk that is human readable

Data indexing,

- `<matrix_variable>(1, 2)` get the value at row 1 and column 2
- `<matrix_variable>(2, :)` get the all values in the second row
- `<matrix_variable>(:, 2)` get the all values in the second column
- `<matrix_variable>([1, 3], :)` from row 1 and row 3, get all columns
- `<matrix_variable>(:, 2) = [1; 2; 3;]` replace the second column with the new vector
- `A = [A, [100; 101; 102]]` append a vector to the right of matrix A
- `A(:)` put all elements of A into a single column vector
- `C = [A B]` or `C = [A, B]` concatinating A and B by putting B on the right side of A
- `C = [A : B]` concatinating A and B by putting B at the bottom of A
- `A(:)` - Turn matrix into a vector.

## Compute on data

- `A * B` 
- `A .* B` - element-wise multiplication; multiple each element in A by the corresponding element in B
- `A .^ 2` - element-wise squaring of A; take the sqaure of each element in A
- `1 ./ A` - element-wise inverse of A; calculate the inverse of each element in A
- `-X` or `-1 * X` - element-wise negative of X
- `X'` - Transpose X.
- `[val, ind] = max(a)` - Get the max value and its index from the vector a.
- `a < 3` - Do element-wise comparison
- `find(a < 3)` - Get the index of the elements in vector a that are smaller than 3
- `max(rand(3), rand(3))` - Take the element-wise of two random 3 x 3 matrices.
- `max(A, [], 1)` - Take the max value of each column in matrix A.
- `max(max(A))` - Find the single biggest value in matrix A.
- `sum(A, 1)`, `sum(A, 2)`, `sum(sum(magic(9) .* eye(9)))` - Find the sum of each column, row or diagonal of matrix.

> The period (i.e. `.`) is usually used to denote element wise operations in Octave.

- `log(X)` - compute the natural logarithm, `ln(x)`, for each element of X
- `exp(X)` - compute `e^x` for each element of X
- `abs(X)` - compute the absolute value of each element in X
- `find(X)`
- `sum(y)`

    Sum of elements along dimension DIM.

    If DIM is omitted, it defaults to the first non-singleton
    dimension.
- `prod(y)` - Return the product of all elements in y.
- `floor(y)` - Round down the elements of y.
- `ceil(y)` - Round up the elements of y.
- `pinv(X)` - Get the inverse of the matrix X.

## Plotting

> check `help plot` for more details

- `plot(x, y, 'r')`
- `hold on;`

    Retain plot data and settings so that subsequent plot commands
    are displayed on a single graph.  Line color and line style
    are advanced for each new plot added.
- `xlabel('time')`, `ylabel('value')` - Set the labels along x and y axises
- `legend('sin', 'cos')` - Add legends
- `title('my plot')` - Add title to figure
- `print -dpng 'myPlot.png'` - Save the plot.
- `close` - Close the current figure.
- `axis([0.5 1 -1 1])` - Zoom the x axis to be from 0.5 to 1 and set the y axis to be from -1 to 1
- `clf` - clear a figure
- Two figures

    ```ocatave
    figure(1);
    plot(x, y1);
    figure(2);
    plot(x, y2);
    ```

- `subplot()`

    ```octave
    % divide plot into a 1 x 2 grid, access first element
    subplot(1, 2, 1);
    plot(x, y1);

    % access second element
    subplot(1, 2, 2);
    plot(x, y2);
    ```

- `imagesc(A)`

    ```octave
    A = magic(5);

    % for visualising a matrix
    % running 3 commands at a time: plot matrix, add color bar and color map.
    % use comma to chain function calls
    imagesc(A), colorbar, colormap gray;
    ```

## Control statements

- `for` loop

    ```octave
    indicies = 1:10;
    for i = indicies,
        disp(i);
    end;
    ```

- `while` loop

    ```octave
    v = rand(10, 1);
    i = 1;
    while i <= 5, 
        v(i) = 100;
        i = i + 1;
    end;
    ```

    ```octave
    v = rand(10, 1)

    i = 1;
    while true,
        v(i) = 999;
        i = i + 1;
        if i == 6, 
            break;
        end;

    end;
    ```

- `if ... else ...`

    ```octave
    i = 2;

    if i == 1, 
        disp('The value is 1.');
    elseif i == 2, 
        disp('The value is 2.');
    else
        disp('The value is not one or two');
    end;
    ```

- Functions

    ```octave
    % create a file with the function name as the file name such as `squarethisnumber.m`, then inside it, 

    function y = squarethisnumber(x)

    y = x^2;
    ```

    then the function can be invoked as following in the same directory,

    ```octave
    squarethisnumber(5);
    ```

    > use `addpath(<path>);` to tell Octave where to look for function files.

    A function can return multiple parameters, for example inside the file `squareAndCubeThisNumber.m`, 

    ```octave
    function [y1, y2] = squareAndCubeThisNumber(x)

    y1 = x^2;
    y2 = x^3;
    ```

    then it can be invoked as, 

    ```octave
    [a, b] = squareAndCubeThisNumber(5);
    ```

    As a complete example, assume we have the training set as below,

    | x | y|
    |:--|:-|
    | 1 | 1|
    | 2 | 2|
    | 3 | 3|

    and the form of the hypothesis is `h(x) = Θ0 + Θ1x`.

    Then,

    ```octave
    % the design matrix
    X = [1 1; 1 2; 1 3;];

    % the labels
    y = [1; 2; 3;];

    % Θ
    Θ = [0; 1;];

    % then the cost i.e. overall error for all training examples is
    J = costFunction(X, y, Θ);
    ```

    and `costFunction` will be defined in `costFunction.m` as, 

    ```octave
    function J = costFunction(X, y, theta)

    % X is the "design matrix" containing our training examples
    % y is the class labels

    m = size(X, 1);                        % number of training examples
    predictions = X * theta;               % predictions of hypothesis on all m examples
    squareErrors = (predictions - y) .^ 2; % squared errors

    J = 1/(2*m) * sum(squareErrors);
    ```

## References

1. [Octave for GNU/Linux](http://wiki.octave.org/Octave_for_GNU/Linux)
