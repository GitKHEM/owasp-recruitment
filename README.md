OWASP MANIT 26 – Project README

Overview
This project is a front-end, single-page website built for the OWASP MANIT chapter/event presence.
It’s designed as a modern landing page with a strong hero section, an event portal experience,
and clean sections for About, Team, and Contact.

What you’ll see on the site
1) Hero Section
- Full-screen hero with an animated canvas background.
- A bold “OWASP MANIT” heading with letter-based animations.
- Tagline + CTA button to jump to Events.

2) Navigation
- Fixed navbar on top.
- Desktop navigation links for quick section access.
- Mobile hamburger menu that opens a full-screen overlay.

3) Events Portal
- “Past Events” and “Upcoming Events” tabs.
- Folder-style cards for each event.
- Clicking an event opens a detail view with image, date, and description.
- Includes a separate phone-style layout for smaller screens.

4) About (Vision & Mission)
- Bento-card style layout to showcase the chapter’s vision and mission pillars.
- Designed to stay readable and structured across screen sizes.

5) Team Section
- Team cards with images and social links.
- Responsive grid that adapts from 4 columns down to 1.

6) Contact Section
- Contact details (email/phone/address) and social icons.
- Contact form with built-in HTML validation.
- On submit, it shows a success state (UI only).

Key features (high level)
- Responsive UI for desktop, tablet, and mobile.
- Animated hero background using the Canvas API.
- Smooth text/element entrance animations using GSAP.
- Interactive event browsing with tabs and a detail page experience.
- Lightweight: no build tools required, just static files.

Technology used
- HTML5 for structure
- CSS3 for styling + media queries for responsiveness
- JavaScript (vanilla) for interactions and UI logic
- GSAP for animations
- Lucide Icons for icons
- Canvas API for the hero background animation

Customization notes
- Hero title/tagline can be edited in index.html.
- Events content (title/date/image/description) can be edited in script.js.
- Images can be replaced in the img/ folder (update filenames if needed).

Limitations / Notes
- This is a front-end only project.
- The contact form does not send emails; it only displays a success message.

