export interface HistoryEntry {
  time: string; // e.g. new Date(...) as a string
  temperature: number;
  humidity: number;
  // If you also want Fahrenheit, add it here
}

export interface ContainerData {
  id: string;
  shippingCompany: string;
  status: string;
  departurePort: string;
  arrivalPort: string;
  eta: string;
  location: {
    lat: number;
    lon: number;
  };
  history: HistoryEntry[];
}
