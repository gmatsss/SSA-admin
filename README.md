# Getting Started with SSA Admin

The SSA Admin panel is a powerful dashboard designed for managing users, configurations, knowledge base resources, and billing tasks. This guide will walk you through the components, routes, and features to help you get started.

## Live Demo

Access the SSA Admin dashboard using the following link and test credentials:

- **Link**: [https://dashboard.supersmartagents.com/](https://dashboard.supersmartagents.com/)
- **Email**: `test@gmail.com`
- **Password**: `test`

## Components Overview

The Admin component includes routes for both Admin and User roles with distinct functionalities. Below is a breakdown of the features and components:

### Admin Role Features

The following routes and components are accessible when logged in as an Admin:

- **Dashboard**: Overview panel  
  _Component_: `Board`
- **Todo List**: Manage tasks and todos  
  _Component_: `Todo`
- **Roadmap**: Visualize upcoming plans  
  _Component_: `Roadmap`
- **Notice Board**: Broadcast important notices  
  _Component_: `Notice`
- **Play AI**: AI configurations and tools  
  _Component_: `Playai`

### User Role Features

The following routes are accessible when logged in as a User:

- **Panel**: User-specific dashboard  
  _Component_: `Panel`
- **Billing**: View and manage billing  
  _Component_: `Billings`
- **Submit Ticket**: Submit support tickets  
  _Component_: `Posticket`
- **Thank You**: Submission confirmation page  
  _Component_: `ThankYouComponent`
- **Lifetime Access**: Manage lifetime bot access  
  _Component_: `Lifetime`

### Configurations

- **Test Bot**: Set up test bots  
  _Component_: `Testbot`
- **Voice Agents**: Manage voice agents  
  _Component_: `VoiceAgents`
- **API Key Form**: Add or update API keys  
  _Component_: `ApiKeyForm`
- **DNS Setup**: Configure DNS settings  
  _Component_: `DnsSetupForm`

### Knowledge Base

The knowledge base consists of informational resources for users:

- **Introduction**: General introduction  
  _Component_: `Introductions`
- **Features**: Key features of the system  
  _Component_: `Features`
- **Getting Started**: User onboarding guide  
  _Component_: `GettingStarted`
- **Industries**: Use cases by industries  
  _Component_: `Industries`
- **Best Practices**: Tips and recommendations  
  _Component_: `BestPractices`
- **Troubleshooting**: Solutions for common issues  
  _Component_: `Troubleshooting`
- **Security**: Privacy and security guidelines  
  _Component_: `Security`
- **Support**: Access support resources  
  _Component_: `Support`

## Key Libraries Used

- **React Router**: For routing and navigation.
- **React Toastify**: For toast notifications.
- **Context API**: State management for user data.
- **Custom Hooks**: Includes `useProduktlyScript` for script integration.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/gmatsss/SSA-admin.git
   cd SSA-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000) in your browser.
