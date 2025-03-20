
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

**Why this step?** Cloning creates a local copy of the code repository on your computer. This gives you access to all the project files so you can build and customize the widget.

### Step 2: Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build the widget
npx vite build --config src/vite-widget-config.ts
```

**Why this step?** 
- `npm install` downloads all the required libraries and packages that the widget needs to function.
- The build command compiles the React code into optimized JavaScript and CSS files that can be embedded in any website.

This will generate the widget files in the `dist` folder:
- `treatment-recommender.umd.js` - The main JavaScript file containing all widget functionality
- `style.css` - The stylesheet with all the widget's visual styling
- and other related assets

## Integration Guide

### Step 1: Set Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Note your Service ID, Template ID, and User ID

**Why this step?** EmailJS provides the email delivery functionality for the widget. When a client completes the recommendation process, their information and treatment plan need to be sent to you via email. EmailJS handles this securely without requiring you to set up your own email server.

### Step 2: Add the Widget to Your Website

#### Option 1: Embed via iframe (Recommended for Most Users)

This is the simplest way to add the widget to your site:

```html
<iframe 
  src="https://vitalityventures.github.io/treatmentrecommender/iframe-widget.html?serviceId=YOUR_EMAILJS_SERVICE_ID&templateId=YOUR_EMAILJS_TEMPLATE_ID&userId=YOUR_EMAILJS_USER_ID&title=YOUR_TITLE&subtitle=YOUR_SUBTITLE" 
  width="100%" 
  height="800px" 
  frameborder="0"
></iframe>
```

The iframe URL accepts these parameters:
- `serviceId` - Your EmailJS service ID
- `templateId` - Your EmailJS template ID
- `userId` - Your EmailJS user ID
- `title` (optional) - Custom title for the widget
- `subtitle` (optional) - Custom subtitle for the widget

#### Option 2: Direct JavaScript Integration

For more control, include the compiled JavaScript and CSS in your HTML:

```html
<!-- Include React dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include the Treatment Recommender Widget -->
<script src="https://vitalityventures.github.io/treatmentrecommender/treatment-recommender.umd.js"></script>
<link rel="stylesheet" href="https://vitalityventures.github.io/treatmentrecommender/style.css">

<!-- Create a container for the widget -->
<div id="treatment-recommender-container"></div>

<script>
  // Configure EmailJS
  window.TreatmentRecommender.configureEmailService({
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    userId: 'YOUR_EMAILJS_USER_ID'
  });
  
  // Optional: Configure widget appearance
  window.TreatmentRecommender.configureSiteSettings({
    title: "Your Clinic Name",
    subtitle: "Find your perfect treatment"
  });
  
  // Render the widget
  ReactDOM.render(
    React.createElement(window.TreatmentRecommender.Widget),
    document.getElementById('treatment-recommender-container')
  );
</script>
```

### Troubleshooting Integration

If you experience issues loading the widget:

1. Check the browser console for errors (Press F12 to open developer tools)
2. Verify that all file paths are correct
3. Visit the widget-path-check.html file on your site to check resource loading
4. Ensure your EmailJS credentials are correct
5. Test with the iframe integration first as it's the most reliable

## Development

To run the development server:

```bash
npm run dev
```

This will start a development server at http://localhost:8080

**Why this step?** This starts a local development server that allows you to view and test the widget during development. Any changes you make to the code will be instantly visible in the browser.

## Technologies Used

- Vite - Fast, modern build tool for web development
- TypeScript - Adds type safety to JavaScript to prevent errors
- React - Frontend library for building user interfaces
- shadcn-ui - Component library for consistent design
- Tailwind CSS - Utility-first CSS framework for styling
- Framer Motion - Animation library for smooth transitions
- EmailJS - Email delivery service for form submissions

**Why these technologies?** This tech stack was chosen to create a modern, responsive, visually appealing widget that performs well and can be embedded in any website. The email functionality allows for seamless lead collection.
