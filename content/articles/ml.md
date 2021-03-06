---
title: Machine learning basics
excerpt: Some notes I made while studying machine learning.

# Optional
category: Machine Learning
tags: 
  - Machine Learning
createdAt: "2019-11-09T13:00:00.000Z"
updatedAt: "2020-08-16T05:45:20.314Z"
enableComments: true
enableTOC: true
---

## What is machine learning

_"A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."_ - Tom Mitchell

Example: playing checkers.

- E = the experience of playing many games of checkers
- T = the task of playing checkers.
- P = the probability that the program will win the next game.

## Common types of machine learning problems

### 1. Supervised learning

In supervised learning, we are given a data set and already know what our correct output should look like, having the idea that there is a relationship between the input and the output.

The two categories of supervised machine learning problems are,

- **regression problems** where the output values of the learned function are continous e.g. real numbers. That is, the learned function maps each instance to a continous value.
- **classification problems** where the output values of the learned function are discrete e.g. [0, 1, 2]. That is, the learned function maps each instance into a category.

### 2. Unsupervised learning

Unsupervised learning allows us to approach problems with little or no idea what our results should look like. We can derive structure from data where we don't necessarily know the effect of the variables. With unsupervised learning there is no feedback based on the prediction results.

The main categores of problems are,

- **clustering** where we group data points into different clusters based on relationship among the variables in the data
- **non-clustering** e.g. the "Cocktail Party Algorithm" allows us to find structure in a chaotic environment i.e. identifying individual voices and music from a mesh of sounds at a cocktail party.

## Algorithms

### 1. Linear regression

The different types of linear regressions are,

- **Univariate linear regression** is linear regression with one variable. The hypothesis is a linear function.
    > A linear function has the form of `f(x) = a + bx`
- **Multivariate linear regression** is linear regression with more than one features (i.e. variables).

> "The sqaured error cost function is reasonably good for most regression problems."
> -- Andrew NG

### 2. Polynomial regression

## Gradient descent

Different versions of gradient descent,

- **Batch gradient descent** each step of gradient descent uses all the training examples.

## Math terms

- `Convex function` a function that doesn't have a local optimum and only has a global optium. For example, the cost function for linear regression is always in bow shape i.e. a convex function.

## References

1. [Machine Learning](https://www.coursera.org/learn/machine-learning)
2. [What are Contour Plots?](https://www.statisticshowto.datasciencecentral.com/contour-plots/)
3. [Octave for GNU/Linux](http://wiki.octave.org/Octave_for_GNU/Linux)
