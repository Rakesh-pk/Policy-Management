# Policy Management API

🚀 This is a **Node.js & Express**-based API for managing policy data, users, and scheduled messages, with data stored in **MongoDB**.

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Rakesh-pk/Policy-Management.git
cd <Policy-Managemen>
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and set up: OR you can use MongoDB Atlas URL
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/policyDB
```

### 4️⃣ Run the Server
```sh
npm start
```
The API will be available at `http://localhost:5000`.

---

## 📌 Available APIs

### 1️⃣ Upload Data from CSV/XLSX
**Endpoint:** `POST /api/upload`  
**Description:** Uploads policy data to MongoDB using **worker threads**.  
**Request:** Send a file in **multipart/form-data** format.
```sh
http://localhost:5000/api/upload
```



---

### 2️⃣ Get Aggregated Policies by User
**Endpoint:** `GET /api/policies/user-policy`  
**Description:** Aggregates policies by **firstname** returning policy counts
```sh
http://localhost:5000//api/policies/user-policy
```


#### 📌 Sample Response
```json
 {
        "_id": "Lura Lucca",
        "firstName": "Lura Lucca",
        "email": "madler@yahoo.ca",
        "totalPolicies": 2,
        "policies": [
            {
                "policyNumber": "YEEX9MOIBU7X",
                "startDate": "02-11-2018",
                "endDate": "02-11-2019"
            },
            {
                "policyNumber": "2QYTNFMETG2K",
                "startDate": "09-11-2018",
                "endDate": "09-05-2019"
            }
        ]
    },
```

---

### 3️⃣ Search Policies by Username
**Endpoint:** `GET /api/policies/search-by-username/:username`  
**Description:** Finds all policies linked to a specific user.

```sh
http://localhost:5000/api/policies/search-by-username/Lura Lucca
```

#### 📌 Sample Response
```json
 {
        "_id": "67d527e6d46d93a76111b45d",
        "policyNumber": "YEEX9MOIBU7X",
        "startDate": "02-11-2018",
        "endDate": "02-11-2019",
        "userId": "67d527e6d46d93a76111b45b",
        "companyDetails": [
            "Integon Gen Ins Corp"
        ],
        "categoryDetails": [
            "Commercial Auto"
        ]
    }
```

---

### 4️⃣ Schedule a Message
**Endpoint:** `POST /api/messages/schedule`  
**Description:** Schedules a message to be inserted into the database at a specific **day and time**.
```sh
http://localhost:5000/api/messages/schedule
```

**Request Body:**
```json
{
  "message": "Reminder: Your policy is due for renewal!",
  "day": "13-03-2025",
  "time": "14:00"
}
```

---

## 🛠 Technologies Used
✅ **Node.js** – Backend server  
✅ **Express.js** – Routing and API handling  
✅ **MongoDB** – NoSQL Database  
✅ **Worker Threads** – Async processing for large data  
✅ **Mongoose** – ODM for MongoDB  
✅ **Cron Jobs** – Scheduled tasks  

---

## 📌 Author
👨‍💻 Rakesh Kumbar  
📧 rakeshkumbar520@gmail.com

---


