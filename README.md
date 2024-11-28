# Weather App Assessment

## Overview

This is a **Weather App** built with **ReactJS** and **TypeScript** for an assessment. The application has a dashboard on which we retrieve data through a mock api.

---

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 required, v16 or higher recommended)
- [npm](https://www.npmjs.com/) (for package management)

---

### Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jojahoka/weather-app-assessment
   ```

2. **Navigate to the project directory:**

   ```bash
   cd weather-app-assessment
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

**Start the development server:**
To start a `development` version you can use:

```bash
npm run dev
```

Optionally you can run the application using `npx`:

```bash
npx vite --port=4000

```

## Folder Structure

- **`src`**: Contains all the source code
  - **`components`**: Reusable components
  - **`pages`**: All pages accessible by route (in this case we only have 1 page).
  - **`functions`**: Only contains the mock API functionality, could in larger projects contain reused functions to format data.

---

## Thought rocess and made choices

1. **Project structure:**

   - De project structuur heb ik gemaakt op een zelfde manier waarop ik dat bij elk ander project zou aanpakken. Het maken van components vind ik belangrijk om in het bestand van een pagina gemakkelijk een overzicht te kunnen zien welke onderdelen het bevat.

2. **TypeScript:**

   - Ondaks dat TypeScript vaakt gehaat wordt ben ik best wel fan van TypeScript. Het zorgt ervoor dat er duidelijkheid wordt gecreeërd over welke data wel en niet is toegestaan en wat voor data wordt geretourneerd.

3. **ChartJs**

   - Voor het generen van een grafiek heb ik gebruik gemaakt van ChartJs. Keuze hierachter is omdat ik hier al eerder mee had gewerkt. Ik heb hierbij gekeken om gebruik te maken van een React wrapper package(react-chartjs-2) maar dat beviel mij niet vandaar dat ik maar puur ChartJs gebruik.
   - Het opzetten van de grafiek duurde eventjes ik moest weer opzoeken hoe je bepaalde dingen in chartjs werken. Daarnaast zijn er ook aanpassingen geweest sinds de laatste keer dat ik ermee werkte.

4. **Page Layout**

   - Gezien de opdracht was om een dashboard te maken kwam ik al snel bij het idee om gebruik te maken van een grid met blokken voor de verschillende widgets. Op deze manier kan ik het door middel van het gebruik van display: grid het eenvoudig responsive maken.

5. **SASS**

   - Vanuit mijn stages en werkervaring heb ik altijd gewerkt met SASS. Ik vind persoonlijk dat de bestand structuur van een scss bestand veel overzichtelijker is dan een normaal css bestand en het is daarom eigenlijk voor mij de standaard geworden.

6. **Styling**

   - Voor de styling heb ik wat minder tijd genomen omdat ik van mijzelf weet dat ik geen ontwerper ben en beter ben in het tot leven brengen van iemand anders zijn/haar ontwerp.

7. **React-Toastify**
   - Voor error messages maak ik gebruik van react-toastify, een package die het heel gemakkelijk maakt om meldingen met gebruikers te delen. Hij is niet volledig correct opgezet maar werkt voor deze assessment wel.

---

## Time spent

- In totaal heb ik rond de 6 uur gespendeerd aan deze opdracht.

---
