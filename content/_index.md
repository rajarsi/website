---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2026-10-30
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      text: ''
      # TODO: re-enable once her CV is saved as static/uploads/resume.pdf
      # button:
      #   text: Download CV
      #   url: uploads/resume.pdf
      headings:
        about: ''
        education: ''
        interests: ''
    design:
      background:
        gradient_mesh:
          enable: true
      name:
        size: md
      avatar:
        size: medium
        shape: circle

  - block: markdown
    id: research
    content:
      title: Research
      subtitle: ''
      # DRAFT — Snigdha to review and expand.
      text: |-
        My research sits where machine learning meets large scientific datasets.

        **Astroinformatics.** Sky surveys produce far more objects than can be measured spectroscopically. I develop deep learning models — from scalable neural networks on Spark to interpretable CNN-transformer hybrids — that estimate galaxy redshifts from photometry, handle heavily imbalanced astronomical data, and cluster galaxy images, as well as language models for textual astronomical data.

        **Explainable AI for space science.** I work on making deep models trustworthy for safety-critical settings such as satellite telemetry anomaly detection.

        **Computer vision and deep learning.** With my students I build CNN, U-Net and transformer models for image steganography, medical image segmentation, object detection and video captioning.

        **Big data and applied AI.** I study scalable data processing with Spark and apply machine learning in healthcare, materials science and social good — work that has led to funded projects and patents in emergency-response systems.

        I guide PhD scholars and M.Tech and B.Tech projects. Students and collaborators interested in these areas are welcome to get in touch.
    design:
      columns: '1'

  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publications
        featured_only: true
    design:
      view: article-grid
      columns: 3

  - block: collection
    content:
      title: Recent Publications
      text: ''
      filters:
        folders:
          - publications
        exclude_featured: false
    design:
      view: citation
---
