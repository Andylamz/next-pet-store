# Andy Pet Store (Full stack E-commerce App)

A full-stack pet store application built with Next.js 15, allowing users to broswe products, create accounts, and mange orders. Includes a selller dashboard, image uploads and access control. I built this project to practice real-world full stack development and authentication workflows.

## Tech Stack

  - Framework: Next.js 15 (App Router
  - Styling, Tailwind CSS, FontAersome, Swiper, DarkMode (Next Themes)
  - Auth: Clerk (Dev mode)
  - Database: MongoDB Atlas
  - image Upload: Cloudinary
  - Deploy: Vercel

## Key Features

  - User authentication with Clerk
  - Automatic user sync to MongoDB via webhook
  - Users start as buyers and can upgrade to seller with one click
  - Role-based access, seller dashboard is protected
  - Product CRUD for sellers (with Cloudinary image support)
  - Buyers can browse, add to card, and place order
  - Sellers only see orders that belong to othem
  - Product search with keywork filter (server-side)
  - Swiper carousel for homepage and product suggestions
  - Smooth UI with loading states, hover effects and responsive deign

## Auth Note

Clerk is used in Development Mode, no real user data is stored. This is a personal project.

## Screenshots
<img width="1893" height="910" alt="Home" src="https://github.com/user-attachments/assets/008522fa-c8e6-41ce-9ef1-3356af7b859a" />
<img width="1893" height="910" alt="recommend" src="https://github.com/user-attachments/assets/b39ed8e5-93a8-4106-8998-43a4f5a9e25b" />
<img width="1893" height="904" alt="cart" src="https://github.com/user-attachments/assets/9c72dbe9-d7f5-4beb-869a-df00e16a55af" />
<img width="1893" height="904" alt="order" src="https://github.com/user-attachments/assets/6416b8a3-2985-4571-b66a-b366b5c634f8" />
<img width="1893" height="911" alt="sellerdashboard" src="https://github.com/user-attachments/assets/75e0f52c-d976-4bf4-92d3-bd098f1bfb1d" />

## LinkedIn
[Connect on LinkedIn](https://www.linkedin.com/in/yan-ting-lam-3a040b361/)

## Live Demo
Click [here](https://next-pet-store.vercel.app/) to view demo
