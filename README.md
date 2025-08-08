### **Cinelog: A Movie & Series Explorer**

Cinelog is a responsive web application built with Next.js and TypeScript. It allows users to search for movies and series using the OMDb API, with features for filtering, pagination, and viewing detailed information for each title.

<br>

## Screenshots

Here's a look at the Weather Box in action:

![Cinelog App Main Screen 1](https://github.com/crazy-leaf/cinelog/blob/main/screenshots/Screenshot%202025-08-08%20at%205.10.36%E2%80%AFPM.png)

![Cinelog App Main Screen 2](https://github.com/crazy-leaf/cinelog/blob/main/screenshots/Screenshot%202025-08-08%20at%205.11.05%E2%80%AFPM.png)

![Cinelog App Main Screen 3](https://github.com/crazy-leaf/cinelog/blob/main/screenshots/Screenshot%202025-08-08%20at%205.11.39%E2%80%AFPM.png)

## **Features** 🚀

* **Movie & Series Search:** A dynamic search bar to find titles from the OMDb database.
* **Detailed Views:** Click on a movie or series card to view comprehensive details, including plot, actors, rating, and release year.
* **Filtering:** Filter search results by content type (Movie/Series) and year of release.
* **Pagination:** Navigate through search results with intuitive pagination controls.
* **Responsive Design:** The application is fully responsive and optimized for both desktop and mobile devices.
* **Error Handling:** Graceful handling of API loading states and errors.

---

## **Technologies Used** 💻

* **Next.js:** The React framework for building fast, full-stack applications.
* **TypeScript:** A statically typed superset of JavaScript that enhances code quality and developer experience.
* **Tailwind CSS:** A utility-first CSS framework for building custom designs quickly.
* **OMDb API:** A RESTful web service to obtain movie information.

---

## **Getting Started** 🚀

### **Prerequisites**

To run this project locally, you will need to have **Node.js** and **npm** (or yarn/pnpm) installed on your machine.

### **Installation**

1.  Clone the repository:
    ```bash
    git clone [https://github.com/crazy-leaf/cinelog.git](https://github.com/crazy-leaf/cinelog.git)
    cd cinelog
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### **API Key Setup**

1.  Go to the [OMDb API website](http://www.omdbapi.com/) and obtain a free API key.
2.  Create a file named `.env.local` in the root of your project.
3.  Add your API key to the file in the following format:
    ```
    NEXT_PUBLIC_OMDB_API_KEY=YOUR_API_KEY
    ```

### **Running the Application**

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.
