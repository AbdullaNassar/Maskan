## 🏘 Maskn

**Maskn** is a real estate web application for renting homes across Egypt. It enables guests to browse apartments, make bookings, and provides hosts with the ability to list and manage their properties on the platform. 🔗 [Live-Demo](https://maskn.netlify.app/home)

---

📷 DEMO
![Homepage](https://res.cloudinary.com/deuxt0stn/image/upload/v1757842354/Annotation_2025-09-14_122522_iw13rt.png)

![Properties Section](https://res.cloudinary.com/deuxt0stn/image/upload/v1757842352/Annotation_2025-09-14_122619_djr74e.png)

![Apartments Page](https://res.cloudinary.com/deuxt0stn/image/upload/v1757842351/Annotation_2025-09-14_122747_l9yxxa.png)

![Profile](https://res.cloudinary.com/deuxt0stn/image/upload/v1757842348/Annotation_2025-09-14_122645_hmk6ec.png)

---

## Features

- User Management: Register, login, account confirmation, password reset and role-based access (guest, host, admin)
- Listings: CRUD operations for properties. Guests can browse apartments, while hosts can add, edit, or delete their listings.
- Search & Filter properties by government, dates, price, and amenities.
- Reviews: Guests can rate and review properties after their stay.
- Bookings: Book properties, check availability, and cancel bookings.
- Payments: Secure payment processing with Stripe.
- Admin Dashboard: Manage the platform, approve listings, and oversee users.
- Favourites List: Save preferred properties for quick access.
- Multilingual Support: Available in English and Arabic.
- Light/Dark Mode: Toggle between light and dark themes for better user experience.
- RAG Chatbot: AI-powered chatbot for user assistance.
- Fully responsive design, Clean, modern, and user-friendly interface

## Tech Stack

### Frontend Tools

- **React**
- **React Router**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Query**
- **Axios**
- **React Hook Form**
- **i18next (Internationalization)**
- **Sonner**
- **AOS**

### Backend Tools

- **Nodejs**
- **Express**
- **MongoDB**
- **Mongoose (ODM)**
- **Cloudinary**
- **Stripe**
- **SendGrid**
- **JWT**

## API Documentation

Explore the API endpoints and their usage via our Swagger Documentation. [link](https://maskan-production.up.railway.app/api-docs/)

## Setup Instructions

**Prerequisites**

- Node.js (v16 or higher)
- npm

**1.Clone the Repository**

```bash
git clone https://github.com/AbdullaNassar/Maskan.git
cd Maskan
```

**2. Install Dependencies**

**For the front-end:**

```bash
cd client
npm install
cd ..
```

**For the back-end:**

```bash
cd server
npm install
cd ..
```

**3. Set Up Environment Variables**
Create a .env file in the server directory and add the required variables (e.g., MongoDB URI, Stripe keys, Cloudinary credentials).

**4. Run the Development Servers**

**Start the back-end server:**

```bash
cd server
npm run dev
```

**In a new terminal, start the front-end server:**

```bash
cd client
npm run dev
```

## 👥 Our Team

| Name                | Links                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Abdullah Moemen** | [GitHub](https://github.com/AbdullaNassar) / [LinkedIn](https://www.linkedin.com/in/abdallah-moemen/)                  |
| **Sherif Shoukry**  | [GitHub](https://github.com/sherifshoukryalqwatly) / [LinkedIn](https://www.linkedin.com/in/sherif-shukrii-08085022a/) |
| **Ahmed Hisham**    | [GitHub](https://github.com/Ahmedkoraish) / [LinkedIn](https://www.linkedin.com/in/ahmed-hesham-hosny)                 |
