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

        **Astronomical data analysis.** Sky surveys produce far more objects than can be measured spectroscopically. I work on deep learning models that estimate galaxy redshifts from photometry quickly, robustly and energy-efficiently — including adaptive learning-rate methods and scalable training on cloud-based Spark platforms — and on language models for analysing textual astronomical data.

        **Deep learning for vision and language.** With my students I develop CNN, U-Net and transformer models for image steganography and data protection, video captioning, and hyperspectral imaging.

        **Trustworthy AI in applied domains.** I am interested in explainable deep learning for safety-critical systems such as satellite telemetry, and in AI for healthcare, from leukemia classification to secure patient-care systems.

        Students and collaborators interested in these areas are welcome to get in touch.
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
