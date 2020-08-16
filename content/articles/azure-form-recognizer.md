---
title: Azure Form Recognizer notes
excerpt: Notes I made while learning to use the Azure Form Recognizer

# Optional
category: Machine Learning
tags: 
  - Azure Form Recognizer
createdAt: "2019-11-30T13:00:00.000Z"
updatedAt: "2020-08-16T05:18:20.312Z"
enableComments: true
enableTOC: true
---

## What is it

Form Recognizer is made up of the following services:

- **Custom models** - Extract key/value pairs and table data from forms. These models are trained with your own data, so they're tailored to your forms.
- **Prebuilt receipt model** - Extract data from USA sales receipts using a prebuilt model.
- **Layout API** - Extract text and table structures, along with their bounding box coordinates, from documents.

### Custom models

Form Recognizer custom models train to your own data, and you only need five sample input forms to start. A trained model can output structured data that includes the relationships in the original form document. After you train the model, you can test and retrain it and eventually use it to reliably extract data from more forms according to your needs.

You have the following options when you train custom models: training with labeled data and without labeled data.

#### Train without labels

By default, Form Recognizer uses unsupervised learning to understand the layout and relationships between fields and entries in your forms. When you submit your input forms, the algorithm clusters the forms by type, discovers what keys and tables are present, and associates values to keys and entries to tables. This doesn't require manual data labeling or intensive coding and maintenance, and we recommend you try this method first.

#### Train with labels

When you train with labeled data, the model does supervised learning to extract values of interest, using the labeled forms you provide. This results in better-performing models and can produce models that work with complex forms or forms containing values without keys.

Form Recognizer uses the Layout API to learn the expected sizes and positions of printed and handwritten text elements. Then it uses user-specified labels to learn the key/value associations in the documents. We recommend that you use five manually labeled forms of the same type to get started when training a new model and add more labeled data as needed to improve the model accuracy.

### Prebuilt receipt model

Form Recognizer also includes a model for reading English sales receipts from the United States—the type used by restaurants, gas stations, retail, and so on (sample receipt). This model extracts key information such as the time and date of the transaction, merchant information, amounts of taxes and totals and more. In addition, the prebuilt receipt model is trained to recognize and return all of the text on a receipt.

### Layout API

Form Recognizer can also extract text and table structure (the row and column numbers associated with the text) using high-definition optical character recognition (OCR).

## The sample labelling tool

This tool steamlines the process of data labelling, training the model and predicting on new documents via a UI.

Access to the Form Recognizer sample labeling tool. To get access, fill out and submit the [Form Recognizer label tool](https://aka.ms/LabelToolRequestAccess) request form. You'll receive an email with instructions on how to obtain your credentials and access the private container registry.

### Set up the sampling tool

1. Install Docker on a host computer. The host computer can be your local computer ([Windows](https://docs.docker.com/docker-for-windows/), MacOS, or Linux).

2. Next, you'll need the [Azure command-line interface (CLI)](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest). Install it on your machine if you haven't already.

3. Then enter the following command in a command prompt. The values for `<username>` and `<password>` are in your Welcome to Form Recognizer email.

    ```bash
    docker login containerpreview.azurecr.io -u <username> -p <password>
    ```

4. Get the sample labeling tool container with the `docker pull` command.

    ```bash
    docker pull containerpreview.azurecr.io/microsoft/cognitive-services-form-recognizer-custom-supervised-labeltool:latest
    ```

5. Now you're ready to run the container with `docker run`.

    ```bash
    docker run -it -p 3000:80 containerpreview.azurecr.io/microsoft/cognitive-services-form-recognizer-custom-supervised-labeltool eula=accept
    ```

## References

- [What is Form Recognizer?](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/overview)
- [Train a Form Recognizer model with labels using the sample labeling tool](https://docs.microsoft.com/en-us/azure/cognitive-services/form-recognizer/quickstarts/label-tool)
