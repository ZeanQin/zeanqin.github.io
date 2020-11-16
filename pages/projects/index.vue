<template>
  <div>
    <page-header title="Projects" />
    <b-container>
      <project-summary
        title="Git-based headless CMS (this website)"
        date="Aug 2020 - Current"
        report-url="/articles/git-based-headless-blog"
        image-name="git-based-headless-blog.png"
        code-url="https://github.com/ZeanQin/zeanqin.github.io"
      >
        <template slot="summary">
          <p>
            The project is a reboot of this website, previously built with
            Jekyll, using Nuxt.js with the <code>@nuxt/content</code> module.
            The goal is to reduce the amount of mental energy spent on
            maintaining the blog so I can just focus on writing the contents.
          </p>
          <p>
            It features a streamlined content authoring/publishing process using
            only 3 commands.
          </p>
          <p>
            In addition, Vue components can now be used directly inside the
            markdown files for adding more interactivity to the articles. The
            toolstack also provides a more mainstream development environment
            (Vue.js) in case of making changes to the website.
          </p>
          <p>
            Click on the buttons below to see a detailed report of this project
            and the source code.
          </p>
        </template>
      </project-summary>
      <project-summary
        title="Strava activities bulk exporter for Garmin Connect"
        date="Mar 2020 - Jun 2020"
        report-url="/articles/bulk-export-strava-activities-for-garmin-connect"
        image-name="strava-activities-bulk-exporter-for-garmin-connect.png"
        code-url="https://github.com/ZeanQin/strava-activities-bulk-exporter-for-garmin-connect"
      >
        <template slot="summary">
          <p>
            Importing your training activities from Garmin to Strava is easy,
            but not the other way around.
          </p>
          <p>
            This tool exports all your Strava activities into gpx files, which
            can then be uploaded into your Garmin Connect account.
          </p>
        </template>
      </project-summary>
      <project-summary
        title="Extracting shift handover data from paper forms in a hospital environment"
        date="Feb 2020 - Oct 2020"
        report-url="/articles/extracting-shift-handover-data-from-paper-forms-in-hospital-environment"
        image-name="extract-shift-handover-data-from-paper-forms.png"
      >
        <template slot="summary">
          <p>
            At the shift changeover in most hospitals, a paper form is completed
            to summarise the last shift and highlight key aspects of the
            upcoming shift.
          </p>
          <p>
            The main goal of the project is to extract the handwritten data from
            these forms using Azure Form Recognizer with supervised learning.
          </p>
          <p>
            The result is a tool that,
          </p>
          <ul>
            <li>
              the users can use to take a picture of the completed forms using
              their smart phones,
            </li>
            <li>
              the tool then automatically extracts the data and pre-fills the
              form, and
            </li>
            <li>the user can review and save the data.</li>
          </ul>
          <p>
            Click on the link below to see a detailed report of this project
            with some miscellaneous reflections.
          </p>
        </template>
      </project-summary>
      <project-summary
        title="Adversarial machine learning in predictive policing"
        date="Nov 2016 - Mar 2017"
        report-url="https://github.com/ZeanQin/adversarial-machine-learning/blob/master/Adversarial_Machine_Learning_in_Predictive_Policing_Report.pdf"
        code-url="https://github.com/ZeanQin/adversarial-machine-learning/tree/master/code"
        image-name="adversarial-machine-learning-in-predictive-policing.png"
      >
        <template slot="summary">
          <p>
            Machine learning systems are being used in more applications such as
            spam email filtering, intrusion detection systems etc. One
            particular area where it is gaining popularity recently is
            predictive policing in which the system uses machine learning
            algorithms to predict where crimes are likely to happen so police
            can send patrol cars to these places.
          </p>
          <p>
            Contrast to common perceptions, machine learning systems can be
            vulnerable to various attacks.
          </p>
          <p>
            In this project, we focus on adversarial machine learning in
            predictive policing. We first look at two of the most successful
            models used in predictive policing: the self-exciting point process
            model and the Series Finder model. We will then examine the
            different attack techniques that a malicious adversary can use to
            attack the models. These techniques can be categorised into
            causative attacks and exploratory attacks where causative attacks
            generally require control over the training process whereas
            exploratory attacks usually focus on probing the inner state of the
            learner. A kernel density estimation based model has been built and
            attacks were set against it. We will also discuss the techniques
            that can be used to mitigate effects of the attacks. Following that,
            we will provide some reflections and guidance on future work. In the
            end, we conclude that contrast to common perceptions, machine
            learning models can be vulnerable to various attacks.
          </p>
        </template>
      </project-summary>
      <project-summary
        title="OCR from historic documents"
        date="Aug 2016 - Oct 2016"
        report-url="https://github.com/ZeanQin/ocr-from-historic-documents/blob/master/comp90051-project-report.pdf"
        code-url="https://github.com/ZeanQin/ocr-from-historic-documents"
        image-name="ocr-from-historical-documents.png"
      >
        <template slot="summary">
          <p>
            Optical Character Recognition (OCR) for historical documents remains
            a very challenging case due to the unique characteristics those
            documents possess such as features wandering baselines, ink
            splodges, use of odd fonts and calligraphic capitals and the use of
            characters that are no longer being used in modern documents.
          </p>
          <p>
            In this project, we present two models based on Support Vector
            Machines (SVM) and Convolutional Neural Network (CNN) to solve the
            problem. And the Convolutional Neural Network is our main focus.
          </p>
        </template>
      </project-summary>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '~/components/page-header.vue'
import ProjectSummary from '~/components/project-summary.vue'

export default Vue.extend({
  layout: 'default',
  components: {
    'page-header': PageHeader,
    'project-summary': ProjectSummary,
  },
  head() {
    return {
      title: 'Projects - Zean Qin',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The projects that I have worked on.',
        },
      ],
    }
  },
})
</script>
