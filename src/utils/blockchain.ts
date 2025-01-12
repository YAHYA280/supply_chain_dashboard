import { ethers } from "ethers";

interface RawOnChainSensorData {
  temperatureC: bigint;
  humidity: bigint;
  temperatureF: bigint;
  timestamp: bigint;
}

export interface OnChainSensorData {
  temperatureC: number;
  humidity: number;
  temperatureF: number;
  timestamp: Date;
}

// Replace with your actual deployed contract address on Fuji
const CONTRACT_ADDRESS = "0xaD657dd1c0D298fB2eEE157A297c398F45b35023";

// Minimal ABI with just getAllData()
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "temperatureC",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "humidity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "temperatureF",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DataStored",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "data",
    outputs: [
      { internalType: "uint256", name: "temperatureC", type: "uint256" },
      { internalType: "uint256", name: "humidity", type: "uint256" },
      { internalType: "uint256", name: "temperatureF", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
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
  {
    inputs: [
      { internalType: "uint256", name: "_temperatureC", type: "uint256" },
      { internalType: "uint256", name: "_humidity", type: "uint256" },
      { internalType: "uint256", name: "_temperatureF", type: "uint256" },
      { internalType: "uint256", name: "_timestamp", type: "uint256" },
    ],
    name: "storeSensorData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Your Avalanche Fuji RPC endpoint (Infura)
const RPC_URL =
  "https://avalanche-fuji.infura.io/v3/9ea14895900f44c5a58cc34c1969458b";

// Create a JsonRpcProvider in Ethers v5 style
// chainId = 43113 ensures no ENS lookups on custom networks
const provider = new ethers.providers.JsonRpcProvider(RPC_URL, 43113);

// Create a contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

export async function fetchSensorData(): Promise<OnChainSensorData[]> {
  try {
    // Call getAllData() to get an array of your raw data
    const dataOnChain = (await contract.getAllData()) as RawOnChainSensorData[];

    // Convert BigInts => numbers, convert timestamp => Date
    const formatted = dataOnChain.map((entry) => ({
      temperatureC: Number(entry.temperatureC),
      humidity: Number(entry.humidity),
      temperatureF: Number(entry.temperatureF),
      timestamp: new Date(Number(entry.timestamp) * 1000),
    }));

    return formatted;
  } catch (error) {
    console.error("Blockchain fetch error:", error);
    throw error;
  }
}
