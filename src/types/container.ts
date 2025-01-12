export interface HistoryEntry {
  time: string;
  temperature: number;
  humidity: number;
}

export interface ContainerData {
  id: string;
  shippingCompany: string;
  status: string;
  departurePort: string;
  arrivalPort: string;
  eta: string; // or Date
  location: {
    lat: number;
    lon: number;
  };
  history: HistoryEntry[];
}
