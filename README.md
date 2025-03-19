
# Treatment Recommender Widget

## Overview

This widget allows your clients to select their skin or body concerns and receive personalized treatment recommendations. The widget captures client information and sends it to your specified email address using EmailJS.

## Getting Started with GitHub

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/vitalityventures/treatmentrecommender.git

# Navigate to the project directory
cd treatmentrecommender
```

### Step 2: Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build the widget
npx vite build --config src/vite-widget-config.ts
```

This will generate the widget files in the `dist` folder:
- `treatment-recommender.js`
- `treatment-recommender.css`
- and other related assets

## Integration Guide

### Step 1: Set Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Note your Service ID, Template ID, and User ID

### Step 2: Add the Widget to Your Website

Include the compiled JavaScript and CSS in your HTML:

```html
<!-- Include React dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the Treatment Recommender Widget -->
<script src="path/to/treatment-recommender.js"></script>
<link rel="stylesheet" href="path/to/treatment-recommender.css">

<!-- Create a container for the widget -->
<div id="treatment-recommender-container"></div>

<script>
  // Configure EmailJS
  window.TreatmentRecommender.configureEmailService({
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    userId: 'YOUR_EMAILJS_USER_ID'
  });
  
  // Render the widget
  ReactDOM.render(
    React.createElement(window.TreatmentRecommender.default),
    document.getElementById('treatment-recommender-container')
  );
</script>
```

### EmailJS Template Example

Your EmailJS template should include parameters for:
- firstName
- lastName
- email
- phone
- newsletter
- treatmentPlan
- timestamp

## Development

To run the development server:

```bash
npm run dev
```

This will start a development server at http://localhost:8080

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion
- EmailJS (for email functionality)
