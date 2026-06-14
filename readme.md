# 🏢 Pocket Hosteler - Student Mess & Utility Tracker

Pocket Hosteler is a streamlined, full-stack web application designed for students and hostel wardens to log, filter, audit, and manage shared hostel-related expenditures (such as monthly mess bills, room utilities, laundry, and snacks). This project implements an asynchronous JavaScript frontend architecture connected to a local mock REST API server.

---

## 👤 Student Information
* **Student Name:** Ayesha Imran
* **Roll Number:** F24BDOCS1M01066
* **Section:** 2M
* **Course:** Web Technologies (Final Project / Assignment Submission)

---

## 🛠️ Technical Stack
The application is architected utilizing standard decoupled client-server web practices without heavy client frameworks:

* **Frontend Layout & Styling:**
  * **HTML5:** Semantic architecture structuring layouts across public views (`index.html`) and administration portals (`admin.html`).
  * **CSS3 & Custom Properties:** Provides smooth element transitions (`--transition-speed`), custom hover animations (`.hostel-card:hover`), and custom left-border warning variants (`.error-banner`).
  * **Bootstrap v5.3.0 (via CDN):** Rapid structural design grids, utility flex wrappers, navigation headers, responsive tables, and JavaScript-driven interactive update Modals.
* **Frontend Logic / State Controllers:**
  * **Vanilla JavaScript (ES6+ Asynchronous Architecture):** Extensive application of modern Promises, `async/await` syntax structures, dynamic DOM selector registries, and live data stream updates via the native `Fetch API`.
* **Backend Database Simulation:**
  * **JSON-Server Engine:** A Node.js-based local developer storage tool simulating a state-persistent, production-grade RESTful API JSON relational ledger (`db.json`).

---

## 📁 Project Directory Layout
* **`index.html`** — Public-facing main view platform enabling students to submit records and review live expense cards.
* **`app.js`** — Core functional orchestrator for the public view. Manages input validation pipelines, dynamic HTML component mapping, filtering, and asynchronous POST requests.
* **`admin.html`** — Internal administrative dashboard built for hostel wardens featuring cumulative ledger metrics and a master asset data matrix grid.
* **`admin.js`** — Internal backend coordination code implementing complete CRUD (Create, Read, Update, Delete) transactions, modal-seeded update structures, and confirmation hooks.
* **`style.css`** — Consolidated application micro-styles, hover effect configurations, layout flags, and global standard theme tokens.
* **`db.json`** — Local database storage module tracking records containing unique identity hashes, description contexts, numerical costs (PKR), categories, and transaction channels.

---

## 🌟 Primary System Features
1. **Public Submission Framework:** High-fidelity form input checking verifying context strings, numeric bounds (amount > 0), and mandatory execution calendar timestamps before triggering a database write.
2. **Dynamic Client Filtering Stream:** Real-time client-side filter engine to isolate logs matching specific categories like *Monthly Mess*, *Room Utilities*, *Laundry*, or *Night Snacks* natively.
3. **Automated Metric Aggregations:** Calculates total cumulative hostel expenditure, active billing log row tallies, and mean transaction costs instantaneously using native JavaScript array reductions (`.reduce()`).
4. **Warden Administrative CRUD Operations:**
   * **Create:** Logged via the main public form interface.
   * **Read:** Live parsing of the data stream directly into a tabular management matrix on the admin panel.
   * **Update:** Target configurations are fetched and seeded into a modal form overlay, pushing clean overwritten changes down via a `PUT` request mutation.
   * **Delete:** Secure confirmation workflows (`confirm()`) guard against accidental destruction of shared room ledger objects before executing `DELETE` request operations.

---

## 🚀 Execution & Run Recommendations

Follow these sequential steps to initialize your environment and launch the application locally:

### 1. Prerequisites Configuration
Ensure that you have **Node.js** (which bundles `npm`) installed on your workstation.
* Download link: [Node.js Official Downloads](https://nodejs.org/)
* To confirm your local status, execute the following commands inside your terminal:
  ```bash
  node -v
2. Launch the Mock Database ServerNavigate into the root folder where your project repository records are stored (the folder containing db.json), open your terminal tool, and execute json-server via npx:Bashnpx json-server --watch db.json --port