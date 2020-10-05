---
title: Extracting shift handover data from paper forms in a hospital environment
excerpt: TODO

# Optional
category: Machine Learning
tags: 
  - Azure Form Recognizer
createdAt: "2019-11-30T13:00:00.000Z"
updatedAt: "2020-08-16T05:18:20.312Z"
enableComments: true
enableTOC: true
---

## Project Overview

At the shift changeover in most hospitals, a paper form is completed to summarise the last shift and highlight key aspects of the upcoming shift. As an example, a completed form could look like below.

<asset src="articles/shift-handover-data-extraction/sample-original.jpg" name="An example of a completed Change of Shift Huddle form" newline></asset>

These completed forms are gathered together at a later point, and a person will go through each and manually enter the data on a computer. The recorded data can then be fed into an analytical system to generate insights.

### The goal of the project

**The main goal of this project** is to streamline the data collection process by building a tool that,

- the users can use to take a picture of the completed forms using their smart phones,
- the tool then automatically extracts the data and pre-fills the form, and
- the user can review and save the data.

The user can choose to either take the picture and upload it immediately after completing the form, or take pictures of multiple completed forms at a later point.

A few other features include,

- providing a digital version of the form that the user can fill in directly on their phone/tablet,
- saving the original image along with the extracted data,
- linking data e.g. Unit, Users etc. to existing entities in the system.

### Demo

At [Riberry](https://riberry.health), we build a platform for collecting/distributing data within hospital environments as well as delivering clinical improvement programs. This article only focuses on data extracting from paper forms using OCR.

And below is a demo of how data is extracted from a paper form and entered into the system.

<asset src="articles/shift-handover-data-extraction/ocr.gif" name="Extracting data from a Change of Shift Huddle form" newline></asset>

## Miscellaneous Reflections

The training process is about fine-tuning their layout algoriths, not the NLP algorithms. The Form Recognizer Service is basically like a box packing in a lot of algorithms with different purposes. For example, there'll be algorithms handling dividing the image/pdf into smaller chuncks (layout), there'll be algorithms handling the actual OCR process. The labelling/training process is mostly about figure out the parameters for dividing up the page. In fact, there isn't an option to correct the result of the OCR, in case it's wrong.
