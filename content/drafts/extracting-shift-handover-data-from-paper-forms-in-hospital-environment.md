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

At [Riberry](https://riberry.health), we build a platform for collecting data and generating insights within hospital environments, as well as delivering clinical improvement programs. This article only focuses on extracting data from paper forms using OCR - a feature on the data collection side of things.

And below is a demo of how data is extracted from a paper form and entered into the system.

<asset src="articles/shift-handover-data-extraction/ocr.gif" name="Extracting data from a Change of Shift Huddle form" newline></asset>

### Architecture overview

We're using the [Form Recognizer](https://azure.microsoft.com/en-au/services/cognitive-services/form-recognizer/) service from Microsoft to extract data from the forms. More specifically, we've trained a custom model, instead of using the pre-built models, to better handle the structure of the forms that our clients use.

At the very high level, we will train a model first. The users can then upload photos of the filled forms via the frontend (a.k.a Riberry) to the API called Rumble. Rumble then uses the trained model to extract data from the form and transforms and cleans up the extracted data before sending it back to the user. The image below has a more detailed explanation of this process.

<asset src="articles/shift-handover-data-extraction/architecture.png" name="Architecture Overview" newline></asset>

### Train the model

<b-alert variant="info" show>
<p>The focus of this article is to showcase the final product and to reflect on the lessons learnt in adding the OCR support, rather than a step-by-step guide on how to use the Azure Form Recognizer service. There is no point in writing a guide either; you can't really beat their <a href="https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/?branch=release-build-cogserv-forms-recognizer" target="_blank">documentation and examples</a>.</p>

<p>If you're looking at learning how to use the Form Recognizer service, I highly recommend reading through their documentation - it's really the most effective way.</p>
</b-alert>

At the core of the Form Recognizer service is a set of [REST APIs](https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2/operations/AnalyzeWithCustomForm) that allow you to train a model by using supervised/unsupervised machine learning, manage (e.g. list, delete, copy) models, and extract data using custom/pre-built models.

In addition, it also offers [an open source tool (OCR-Form-Tools)](https://github.com/microsoft/OCR-Form-Tools) that interacts with these REST APIs and provides an intuitive UI to label your data, train a model and validate the model by predicting a test document.

<b-alert variant="info" show>
<p>In <a href="https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/quickstarts/label-tool?tabs=v2-0#set-up-the-sample-labeling-tool" target="_blank"> their guide on setting up the sample labelling tool</a>, they talk about running the tool via Docker.</p>

<p>Instead of using Docker, I find it's much easer to just check out a copy of the tool from <a href="https://github.com/microsoft/OCR-Form-Tools" target="_blank">GitHub</a> and build/run it from source.</p>

</b-alert>

After having the tool up and running, I was able to label our sample data, train a model and test the model with ease.

<b-carousel controls indicators fade :interval="0">
  <b-carousel-slide>
    <div class="bg-gradient py-2 text-center rounded">
      <h5 class="text-light">Label the training data</h5>
    </div>
    <template v-slot:img>
      <asset src="articles/shift-handover-data-extraction/labelling-tool-labelling.png" name="Label the training data" no-zoom></asset>
    </template>
  </b-carousel-slide>
  <b-carousel-slide>
    <div class="bg-gradient py-2 text-center rounded">
      <h5 class="text-light">Train a model</h5>
    </div>
    <template v-slot:img>
      <asset src="articles/shift-handover-data-extraction/labelling-tool-train-result.png" name="Train a model" no-zoom></asset>
    </template>
  </b-carousel-slide>
  <b-carousel-slide>
    <div class="bg-gradient py-2 text-center rounded">
      <h5 class="text-light">Validate the trained model</h5>
    </div>
    <template v-slot:img>
      <asset src="articles/shift-handover-data-extraction/labelling-tool-prediction.png" name="Validate the trained model" no-zoom></asset>
    </template>
  </b-carousel-slide>
</b-carousel>

### Miscellaneous Reflections

The training process is about fine-tuning their layout algorithms, not the NLP algorithms. The Form Recognizer Service is basically like a box packing in a lot of algorithms with different purposes. For example, there'll be algorithms handling dividing the image/pdf into smaller chunks (layout), there'll be algorithms handling the actual OCR process. The labelling/training process is mostly about figure out the parameters for dividing up the page. In fact, there isn't an option to correct the result of the OCR, in case it's wrong.
