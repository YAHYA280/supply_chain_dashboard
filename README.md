# Container Tracking Project

This project provides a **real-time tracking system** for shipping containers, showcasing their **location, temperature, and humidity** throughout the journey. The system integrates **IoT sensors** and **blockchain technology** for secure data storage and visualization via an interactive web dashboard. Below, you'll find a detailed explanation of the code structure, how it works, and how each component relates to others.

---

## **Project Overview**

The core functionality of the project is:
- **Track and visualize container location** using **React Leaflet**.
- **Monitor temperature and humidity trends** over time with charts.
- **Fetch real-time data** from a **blockchain-based smart contract** deployed on the Avalanche Fuji testnet.
- Provide a **user-friendly interface** to view container details and historical data.

---

## **Project Structure**

### **Main Components**

1. **HomePage** (`src/components/HomePage.tsx`)
   - Displays a welcome message.
   - Provides an overview of the project and its functionality.
   - Introduces the team members.

2. **ContainerDetails** (`src/components/ContainerDetails.tsx`)
   - Displays detailed information about a selected container.
   - Includes:
     - A **map** showing the container’s current location.
     - **Shipping details** (company, status, ports, and ETA).
     - A **chart** for temperature and humidity trends.
     - A **table** showing historical sensor data.

3. **Map** (`src/components/Map.tsx` and `src/components/MapClient.tsx`)
   - Visualizes the container's current location and journey path.
   - Uses **React Leaflet** to display the map and polyline.
   - Dynamically loads client-side map components to avoid SSR issues.

4. **Chart** (`src/components/Chart.tsx`)
   - Renders a chart displaying temperature and humidity trends.
   - Uses **Recharts** for a responsive and interactive chart experience.

5. **Blockchain Utilities** (`src/utils/blockchain.ts`)
   - Provides functions to interact with the blockchain smart contract.
   - Fetches on-chain sensor data (temperature, humidity, and timestamps).

---

## **How the Code Works**

### **Data Flow**

1. **Data Fetching**:
   - Blockchain sensor data is fetched using the `fetchSensorData` function from `blockchain.ts`.
   - This data includes temperature, humidity, and timestamps.
   - Data is converted from **BigInt** to **JavaScript numbers** and formatted for display.

2. **HomePage**:
   - Serves as the entry point for users.
   - Introduces the project and team.

3. **ContainerDetails**:
   - Accepts a `container` object containing location, shipping details, and sensor data.
   - Displays this data using:
     - A **map** for the container's location and journey.
     - A **chart** for visualizing temperature and humidity trends.
     - A **table** for detailed historical sensor readings.

4. **Map Component**:
   - Shows the current location of the container with a **marker**.
   - Displays the journey path using a **polyline**.
   - Dynamically imports **React Leaflet** components to avoid SSR issues in Next.js.

5. **Chart Component**:
   - Uses `Recharts` to plot temperature and humidity trends over time.
   - Automatically adjusts to different screen sizes for better UX.

---

## **How Components Are Related**

- **HomePage** provides an entry point and links to the **Dashboard** where container details are visualized.
- **ContainerDetails** acts as the main hub, displaying all relevant container data:
  - It uses **Map** to show location and journey.
  - It uses **Chart** to plot sensor data trends.
  - It fetches data from the **blockchain** through utility functions.
- **Blockchain utilities** handle data retrieval and processing, ensuring secure and immutable data visualization.

---

## **Getting Started**

### **Prerequisites**

- **Node.js** and **npm** installed.
- **Infura** account for Avalanche RPC endpoint.

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/container-tracking.git
   cd container-tracking
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following:
     ```env
     NEXT_PUBLIC_RPC_URL=https://avalanche-fuji.infura.io/v3/YOUR_INFURA_PROJECT_ID
     NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **Technologies Used**

- **Next.js**: Framework for building the frontend.
- **React Leaflet**: For interactive maps.
- **Recharts**: For data visualization (temperature & humidity trends).
- **Ethers.js**: For interacting with the blockchain smart contract.
- **Material-UI (MUI)**: For responsive and modern UI components.
- **Avalanche Fuji Testnet**: Blockchain network for storing and fetching sensor data.

---

## **Project Team**

- **Yahya Elmokhtari** - Front End
- **Souhail ELMAHDANI** - Blockchain 
- **Yassin Riahi** - Back End
- **Amin Boulzmin** - IoT 

---

## **Future Enhancements**

- **Alerts and Notifications**: Notify users of anomalies in container conditions.
- **Multi-container Tracking**: Support for tracking multiple containers simultaneously.
- **Advanced Data Visualization**: Add more detailed charts and graphs.
- **Mobile Optimization**: Improve mobile experience with responsive design.
- **Role-Based Access Control**: Implement user authentication and role-based permissions for enhanced security.
- **Offline Data Support**: Cache important data for offline viewing.
- **Live Map Updates**: Automatically refresh the map with real-time data without requiring a page reload.
- **Integration with Third-Party APIs**: Connect to external shipping APIs to enrich data (e.g., weather or traffic data).

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

