"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

// 1) Your Avalanche Fuji RPC endpoint (Infura)
const RPC_URL =
  "https://avalanche-fuji.infura.io/v3/9ea14895900f44c5a58cc34c1969458b";

// 2) Your contract address on Fuji
const CONTRACT_ADDRESS = "0xaD657dd1c0D298fB2eEE157A297c398F45b35023";

// 3) Minimal ABI for getAllData()
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "getAllData",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "temperatureC", type: "uint256" },
          { internalType: "uint256", name: "humidity", type: "uint256" },
          { internalType: "uint256", name: "temperatureF", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct SensorDataStorage.SensorData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// 4) Raw data from the contract (bigint fields)
interface RawSensorData {
  temperatureC: bigint;
  humidity: bigint;
  temperatureF: bigint;
  timestamp: bigint;
}

// 5) Final data shape we store in state (number/string fields)
interface SensorData {
  temperatureC: number;
  humidity: number;
  timestamp: string;
}

export default function FetchPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 6) Use a typed array for sensorData (no `any[]`)
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // 7) Ethers v5: create a StaticJsonRpcProvider with chainId = 43113
        const provider = new ethers.providers.StaticJsonRpcProvider(
          RPC_URL,
          43113
        );

        // 8) Contract instance
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

        // 9) Fetch raw data
        const raw = (await contract.getAllData()) as RawSensorData[];

        // 10) Convert BigInts => numbers, format timestamp => string
        const formatted = raw.map((entry: RawSensorData) => ({
          temperatureC: Number(entry.temperatureC),
          humidity: Number(entry.humidity),
          timestamp: new Date(Number(entry.timestamp) * 1000).toLocaleString(),
        }));

        setSensorData(formatted);
      } catch (err: unknown) {
        // 11) Use `unknown` in catch, then narrow
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Loading data from chain 43113...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Failed to load data: {error}</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Fetch from Avalanche Fuji</h1>
      {sensorData.length === 0 ? (
        <p>No readings found.</p>
      ) : (
        <pre>{JSON.stringify(sensorData, null, 2)}</pre>
      )}
    </div>
  );
}
