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

Now that the project has been deployed to production, it's a good time to look it retrospectively and reflect on various things/lessons that I learnt from doing it.

#### 1. The training process

There should be 3 main stages in predicting the contents of a form using the supervised learning approach,

1. detect the text elements (printed or handwritten) on the form and calculate their expected sizes and positions,
2. extract the actual text content from each element,
3. classify the elements, using their size and position info obtained from step 1, into the different labels specified.

<b-alert variant="success" show>
<p><span class="font-weight-bold">Tip</span>: With the supervised learning, we're fitting a model for classifying elements on the page into different labels based on the position info of these elements on the page.</p>

<p>And we're <em class="font-weight-bold">NOT</em> training any NLP models to extract texts from the elements identified on the page. This part is handled internally by the Form Recognizer service.</p>
</b-alert>

The position and size of each text element is expressed by its bounding box which consists of 8 numbers. And these 8 numbers should be the main features for each training instance i.e. every text element.

There are also likely a lot of data argumentation and feature manipulation techniques applied on the training data to expand the dataset artificially, in order to improve the accuracy of the models. For example, they'll likely use some label-preserving transformation techniques such as denoising/sharpening, elastic distortion, affine transformation, dimensionality reduction etc.

But overall, the cost function should be relatively simple with just a few variables. And I'm not surprised that [only 5 documents](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/overview#custom-models) are required to get started with.

#### 2. Adding support for checkbox/radio question

The Form Recognizer service [doesn't officially support checkboxes or radio buttons](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/overview#input-requirements), but I've been able to get around it easily by,

- applying a label for each option in a checkbox or radio question, and
- at prediction time, treating those labels with a value present as the options that the user has selected.

As an example, the form that the hospitals used contains a checkbox question with two options - AM or PM. During the training process, I'd set up the labels <code>_Shift.9:00</code> and <code>_Shift.17:00</code> for the AM and the PM option respectively (see below).  

<asset src="articles/shift-handover-data-extraction/add-checkbox-support.png" name="Add support for checkbox" newline></asset>

Hypothetically, if we fed the form above to the trained model, a string 'x' will be extracted for both <code>_Shift.9:00</code> and <code>_Shift.17:00</code>. I'd consider both options checked if this was a checkbox question, and I'd consider the first option is checked if this was a radio question.

#### 3. Extracting the data asynchronously and notifying the users when the result is ready

After **POST**ing a form to their endpoint to extract data from it, you get back an `Operation-Location`, [which is a URL containing the `resultId` used to track the progress and obtain the result of the analyse operation](https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2/operations/AnalyzeWithCustomForm). And we're meant to repeatedly check this URL for the result data.

<b-alert variant="success" show>
<div><span class="font-weight-bold">Tip</span>: I set the frequency of checking for the result to once per second. This seems to be the same frequency that their OCR tool uses for checking for the result.</div>
</b-alert>

<b-alert variant="success" show>
<p><span class="font-weight-bold">Tip</span>: If your users have to wait for the result before taking the next action, compress the image before <span>POSTing</span> it for analysis to shorten wait time.</p>

<div>The images taken on smartphones are fairly large these days, and I compress them down to <1MB before sending them for analysis. </div>
</b-alert>

If your users don't have to wait for the analyse result, I'd highly recommend uploading the files into a blob storage and running a background task to analyse these files asynchronously. Users can be notified after the result is ready, if needed.

We couldn't do it because one of the requirements is that users need to take a photo of the form, extract data from it in real-time and save it to generate insights. In practice, the process usually takes around 5 seconds.

#### 4. Don't over-automate the data binding process

## References

- [Form Recognizer API (v2.0)](https://westus2.dev.cognitive.microsoft.com/docs/services/form-recognizer-api-v2/operations/AnalyzeWithCustomForm)
- [Form Recognizer documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/?branch=release-build-cogserv-forms-recognizer)
