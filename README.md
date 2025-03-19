
# Treatment Recommender Widget

## Project info

**URL**: https://lovable.dev/projects/0281a25a-37e0-4d4d-863b-9b4ba3c6f634

## Integration Guide

This application can be integrated into any website as a widget. Here's how to do it:

### Step 1: Build the Application

Clone the repository and build the application:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Build the project
npm run build
```

### Step 2: Set Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Note your Service ID, Template ID, and User ID

### Step 3: Add the Widget to Your Website

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
    userId: 'YOUR_EMAILJS_USER_ID',
    recipientEmail: 'admin@yourdomain.com'
  });
  
  // Render the widget
  ReactDOM.render(
    React.createElement(window.TreatmentRecommender.default),
    document.getElementById('treatment-recommender-container')
  );
</script>
```

For a complete example, see the `public/integration-example.html` file in the project.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0281a25a-37e0-4d4d-863b-9b4ba3c6f634) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion
- EmailJS (for email functionality)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0281a25a-37e0-4d4d-863b-9b4ba3c6f634) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
