# Developer Portfolio

A personal developer portfolio built with Next.js, React, and Tailwind CSS. The website features a full-page snap scroll layout inspired by Swiss Modernism and Technical Brutalism, accompanied by interactive 3D physics elements.

## Overview

This repository contains the source code for a single-page portfolio application. It displays selected engineering projects, technical skill sets, professional statistics, and contact options within a structured grid interface.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** CSS Modules, Custom Utility Classes, [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://framer.com/motion), [GSAP](https://gsap.com/)
- **3D Graphics & Physics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)

## Key Features

- **Full-Page Snap Scroll:** Vertical section-by-section navigation supporting touch, scroll wheel, dot indicators, and keyboard arrows.
- **Structured Typography:** High-contrast monochromatic design system featuring monospaced labels, bracketed tags, and custom headings.
- **Physics-Driven Pull Switch:** Interactive 3D cord component built with React Three Fiber and Rapier physics engine.
- **Live Time Badge:** Timezone-aware clock updating in real time for Banda Aceh (`Asia/Jakarta`).
- **Featured Work Showcase:** Responsive grid presenting details, technology tags, and metadata for key projects.

## Project Structure

```text
portofolio-2/
├── app/                  # Next.js App Router root layout & pages
│   ├── layout.js         # Global font settings & metadata configuration
│   ├── page.js           # Main page structure assembling sections & providers
│   └── globals.css       # Global styles, color tokens, and utility classes
├── components/           # React UI components
│   ├── HeroBrutalist.jsx # Hero banner with ASCII logo & time widget
│   ├── ProjectsGrid.jsx  # Grid displaying featured project entries
│   ├── ProjectCard.jsx   # Individual project card component
│   ├── AboutBrutalist.jsx# Developer bio, skill categories, and statistics
│   ├── ContactSection.jsx# Contact section with links and email action
│   ├── FullPageScroll.jsx# Section snap scroll implementation
│   ├── PullSwitch.jsx    # 3D interactive pull rope switch component
│   └── Preloader.jsx     # Initial load screen sequence
├── PORTFOLIO_CONTENT.md  # Detailed portfolio copy and structured project data
├── package.json          # Project scripts and dependencies
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

Ensure you have Node.js installed (v18.0.0 or higher is recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/portofolio-2.git
   cd portofolio-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Featured Work

The portfolio showcases four primary projects:

1. **Smart Traffic System:** Real-time vehicle detection and congestion prediction pipeline built with YOLOv8, OpenCV, FastAPI, and Laravel.
2. **Mail Management System:** Intelligent document intake system with OCR-powered data extraction built using PaddleOCR and Laravel.
3. **Algorithm Minigame Arcade:** Interactive educational web apps visualizing sorting and pathfinding algorithms built with React and Framer Motion.
4. **Terminal AI Agent:** Interactive CLI AI agent built with pure Node.js and integrated with LLM APIs for automated command-line workflows.

## License

This project is licensed under the [MIT License](LICENSE).
