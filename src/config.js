export const GATEWAY = 'GANACHE' // Either 'METAMASK' or 'GANACHE'

export const CONTRACT_ADDRESS = '0x8c1af548E18cA22600b32e8245207469216EF094'

export const CONTRACT_ABI = 
[
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
          "internalType": "string",
          "name": "_companyName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_identificationNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_scRole",
          "type": "string"
        }
      ],
      "name": "registerCompany",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getYourCompany",
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
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_airportName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_airportLocation",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_airportOwner",
          "type": "address"
        }
      ],
      "name": "registerAirport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_companyId",
          "type": "uint256"
        }
      ],
      "name": "approveCompany",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vaccineName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_vaccinePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_threshLowestTemp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_threshHighestTemp",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_thresHumidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_HSTarriffNumber",
          "type": "uint256"
        }
      ],
      "name": "registerVaccine",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaccineId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "produceVaccine",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaccineId",
          "type": "uint256"
        }
      ],
      "name": "getVaccineInventory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "currentInventory",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalBatchesProduced",
          "type": "uint256"
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
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getBatchDetail",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "batchId",
          "type": "uint256[]"
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
          "name": "_vaccineId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_numberOfContainers",
          "type": "uint256"
        }
      ],
      "name": "makePurchaseOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getPurchaseOrder",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vaccineId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderQuantity",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isOrderAccepted",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "ordererId",
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
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "acceptOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getInvoice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "invoiceId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderValue",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isInvoiceApprovedForPayment",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isInvoicePayed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timeOfInvoiceGeneration",
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
          "name": "_orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_carrierId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_exportAirportId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_destinationAirportId",
          "type": "uint256"
        }
      ],
      "name": "initiateShipment",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_containerId",
          "type": "uint256"
        }
      ],
      "name": "getContainer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "containerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "packingListId",
          "type": "uint256"
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
          "name": "_certificateOfOriginId",
          "type": "uint256"
        }
      ],
      "name": "getCertificateOfOrigin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "certificateOfOriginId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "HSTarriffNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "vaccineName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "manufacturerId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isApprovedByExportCustoms",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isApprovedByImportCustoms",
          "type": "bool"
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
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getExportLorryReciept",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lorryRecieptId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "carrierId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "pickupLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "deliveryLocation",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isPickedUp",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDeliveryDone",
          "type": "bool"
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
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "getImportLorryReciept",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lorryRecieptId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "carrierId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "pickupLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "deliveryLocation",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isPickedUp",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isDeliveryDone",
          "type": "bool"
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
          "name": "_airwayBillId",
          "type": "uint256"
        }
      ],
      "name": "getAirwayBill",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "invoiceId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "airwayBillId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "aircarrierId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "exportAirportId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "importAirportId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "specialHandlingRequired",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isApprovedByExportCustoms",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isApprovedByImportCustoms",
          "type": "bool"
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
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "RequestPickUp",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_containerId",
          "type": "uint256"
        }
      ],
      "name": "approveExport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_containerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_warehouseId",
          "type": "uint256"
        }
      ],
      "name": "approveImport",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_carrierId",
          "type": "uint256"
        }
      ],
      "name": "TransportContainerFromAirport",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderId",
          "type": "uint256"
        }
      ],
      "name": "approveDelivery",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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