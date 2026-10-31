---
# Home page. Layout: layouts/_partials/hbx/blocks/profile-home/block.html
# Name, role, affiliation and profile links come from data/authors/me.yaml.
# Featured papers are the publications marked `featured: true`.
title: ''
summary: ''
date: 2026-10-30
type: landing

sections:
  - block: profile-home
    content:
      username: me
      eyebrow: Astroinformatics · Deep Learning · Explainable AI
      role: Senior Assistant Professor, School of Computer Engineering
      statement: I apply deep learning and explainable AI to astronomical big data and space science — from estimating galaxy redshifts to making models trustworthy for satellite systems.
      statement_short: Deep learning and explainable AI for astronomical big data and space science.
      portrait: portrait.jpg
      buttons:
        - text: Download CV
          url: uploads/resume.pdf
          icon: download
        - text: Speaker Profile
          url: uploads/speaker-profile.pdf
          icon: mic
          style: outline
      stats:
        - value: '16'
          label: years of teaching
        - value: '46'
          label: Scopus-indexed publications
        - value: '4'
          label: doctoral scholars currently guiding
        - value: '2'
          label: patents
      about:
        title: Academician, researcher, mentor
        text: |-
          Dr. Snigdha Sen is a Senior Assistant Professor in the School of Computer Engineering at Manipal Institute of Technology Bengaluru, with around 16 years of teaching experience. Before joining Manipal she was an Associate Professor at Global Academy of Technology, Bengaluru.

          She holds a PhD from IIIT Allahabad, an M.Tech in Information Technology from Jadavpur University and a B.E. from UIT, University of Burdwan. She has published over 40 SCI- and Scopus-indexed papers and is a life member of the Computer Society of India.
      research:
        title: Four connected themes
        items:
          - title: Astroinformatics
            art: astro
            text: Deep learning for photometric redshift estimation, imbalanced astronomical data and galaxy-image clustering.
          - title: Explainable AI for space
            art: space
            text: Interpretable models for safety-critical settings such as satellite telemetry anomaly detection.
          - title: Computer vision
            art: vision
            text: CNN, U-Net and transformer models for image steganography, medical segmentation and video captioning.
          - title: Big data & applied AI
            art: data
            text: Scalable learning on Spark, and machine learning for healthcare, materials science and social good.
      featured:
        title: Featured papers
      highlights:
        title: Talks, grants, patents and editorial roles
        more_url: experience/
        cards:
          - title: Invited talks
            dark: true
            items:
              - Transformer models for astronomical data — **IUCAA, Pune**
              - AI/ML training programme — **ISRO ISTRAC**
              - Skewed data distributions — **IIIT Allahabad**
              - Deep Learning & its Application — **IIIT Lucknow**
          - title: Research grants
            items:
              - ML prediction of PCOD likelihood — **VGST, Co-PI**
              - Small language models as subject experts — **KSCST**
              - Care-In-A-Cup assistive technology — **KSCST**
          - title: Patents
            items:
              - Multimodal on-device emergency detection with indoor localization — **published**
              - Optimizing emergency medical response through real-time data integration — **published**
          - title: Editorial board
            items:
              - Editorial board member — **The Visual Computer**
              - Editorial board member — **Frontiers in Big Data**
      contact:
        title: Get in touch
        text: Prospective students and collaborators are welcome.
        email: snigdha.sen@manipal.edu
        address:
          - School of Computer Engineering
          - Manipal Institute of Technology Bengaluru, MAHE
          - Bengaluru, Karnataka, India
    design:
      spacing:
        padding: ['0', '0', '0', '0']
---
