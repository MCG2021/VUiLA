export const GATEWAY = 'GANACHE' // Either 'METAMASK' or 'GANACHE'

export const CONTRACT_ADDRESS = '0xD06F0019c595cA30F1Be62fA2a92dC6b2B50C808'

export const CONTRACT_ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "containerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "Temperature",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "Humidity",
          "type": "uint256"
        }
      ],
      "name": "Alarm",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "containerId",
          "type": "uint256"
        }
      ],
      "name": "ContainerAssigned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "containerId",
          "type": "uint256"
        }
      ],
      "name": "ContainerFree",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "OrderAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "OrderPickeupForExport",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "OrderPickeupForImport",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "OrderPlaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "packingListId",
          "type": "uint256"
        }
      ],
      "name": "PackingListCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "invoiceId",
          "type": "uint256"
        }
      ],
      "name": "PaymentDone",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "ShipmentDelivered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "certificateOfOriginId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "airwayBillId",
          "type": "uint256"
        }
      ],
      "name": "ShipmentInitiated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "vaccineId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "manufacturerAddress",
          "type": "address"
        }
      ],
      "name": "VaccineRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "companyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "companyOwner",
          "type": "address"
        }
      ],
      "name": "companyRegistered",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "adminAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "airports",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "airportId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "airportName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "airportLocation",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "airportOwnerAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "companies",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "companyId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "companyName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "identificationNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isApprovedByAdmin",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "scRole",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "contractAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vaccines",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vaccineId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "vaccineName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "vaccinePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "manufacturerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "threshLowestTemp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "threshHighestTemp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "threshHumidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "HSTarriffNumber",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_invoiceId",
          "type": "uint256"
        }
      ],
      "name": "makePayment",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ]