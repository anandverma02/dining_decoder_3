## Dining Decoder 3.0


## Smart Mess Management & Food Waste Reduction System

Dining Decoder 3.0 is an industry-grade MERN ecosystem engineered for Government Engineering College (GEC), Gopalganj. It modernizes institutional catering by transitioning from manual, intuition-based operations to a precise, data-driven utility focused on sustainability and student health.  


## Core Innovation Pillars

## 1. Predictive Logistics (Skip Meal Module):

A high-concurrency Node.js module that allows students to proactively communicate absences. 

Temporal Cutoff Logic: Enforces a rigid server-side window (e.g., 04:00 PM for dinner). 

Waste Mitigation: Generates real-time headcount projections, enabling a 30-40% reduction in raw material procurement and food waste.  


## 2. Radical Anonymity Middleware:

Engineered to bridge the transparency gap in institutional grievances.  

Privacy-First Logic: A specialized Node.js middleware intercepts requests and strips req.ip and User-Agent headers before database persistence.  

Untraceable Feedback: Ensures students can report hygiene or quality issues without fear of administrative friction.  


## 3. Cultural UX & Sarcasm Engine:

To drive high longitudinal engagement, the system replaces tedious forms with "Sticky Engagement".  

Localized Nudging: Triggers witty Bhojpuri and Hindi prompts (e.g., "Aaj bahar hi kha lo bhai!") based on star ratings.  

Sentiment Analytics: Uses NLP and the AFINN-111 lexicon to assign valence scores to comments, creating a granular "Mess Quality Index" (MQI).  


## 4. Health Analytics & Nutritional Literacy:

Provides a commercial-grade health-tracking experience tailored for hostel menus.  

Nutritional Cards: Automatically parses menu items into macronutrient profiles (Calories, Protein, Carbs, Fats).  

Data-Driven Choices: Empowers students to track dietary intake with professional accuracy.  


## Technical StackFrontend: 

React.js (Single Page Application) styled with Custom CSS3 (Flexbox/Grid) for near-instant load times on hostel networks.  

Backend: Node.js & Express.js utilizing an asynchronous, event-driven architecture to handle high-traffic windows.  

Database: MongoDB (NoSQL) with Mongoose ODM for flexible nutritional schemas.  

Security: * Stateless Auth: JWT-based sessions for secure, fast logins. 

Password Safety: Bcrypt hashing for credential protection.  Web Hardening: Helmet.js for XSS prevention and UFW firewall rules. 


## Project Structure DINING_DECODER_3/

├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (MealCard, NutritionLabel)
│   │   ├── contexts/       # Auth and Global State
│   │   └── pages/          # Student & Admin Dashboards
│   └── package.json
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── middleware/     # Anonymity & Auth logic
│   │   ├── models/         # MongoDB Schemas (Nutritional objects)
│   │   └── routes/         # RESTful API Endpoints
│   └── package.json
└── .gitignore              # Master ignore file



## Roadmap:

Phase: 1: Integration of Google Gemini 1.5 Flash API for multimodal "Photo-to-Macro" plate scanning.

Phase 2: AI-based OCR scanning of handwritten paper menus to automate database updates.  

Phase 3: Transition to a unified multi-tenant architecture consolidating all campus hostel blocks.



## Acknowledgments:

Developed under the supervision of Mr. Subodh Kumar (Asst. Prof, Dept. of CSE) at Government Engineering College, Gopalganj.  

Team: Anand Verma, Krishna Kr Thakur, Harsh Kumar, Pratyush Kaushik. 