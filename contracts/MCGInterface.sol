pragma solidity ^0.5.0;

contract MCGInterface{
    
    function registerCompany( string calldata _companyName,  uint _identificationNumber, string calldata _location, string calldata _scRole) external;

    function registerHospital(string calldata _hospitalName, string calldata _hospitalLocation) external returns( uint hospitalId);
    
    function getYourCompany() external view returns(
        uint companyId,
        address payable owner,
        string memory companyName,
        uint identificationNumber,
        string memory location,
        bool isApprovedByAdmin,
        string memory scRole // doesn't really need scRole
        );
    
    function registerAirport( string calldata _airportName, string calldata _airportLocation, address _airportOwner)  external  returns(bool success);
    
    function approveCompany (uint _companyId) external  returns(bool success);
    
    function approveHospital (uint _hospitalId) external returns (bool success);
    
    function registerVaccine( string calldata _vaccineName, uint _vaccinePrice, uint _threshLowestTemp, uint _threshHighestTemp, uint _thresHumidity, uint _HSTarriffNumber) external;
    
    function produceVaccine( uint _vaccineId, uint _amount) external returns(bool success);
    
    function getVaccineInventory(uint _vaccineId) external view returns( 
    uint currentInventory);

    function getBatchDetail( uint _orderId) external view returns(
    uint[] memory batchId);

    function makePurchaseOrder( uint _vaccineId, uint _numberOfContainers)  external;

    function getPurchaseOrder( uint _orderId) external view returns(
        uint sellerId,
        uint vaccineId,
        uint orderId,
        uint orderQuantity,
        bool isOrderAccepted,
        uint ordererId
    );
    function acceptOrder (uint _orderId) external;  

    function getInvoice( uint _orderId) external view returns(
        uint invoiceId,
        uint orderId,
        uint orderValue,
        bool isInvoiceApprovedForPayment,
        bool isInvoicePayed,
        uint timeOfInvoiceGeneration
        );      
        
    function initiateShipment (uint _orderId, uint _carrierId, uint _exportAirportId, uint _destinationAirportId) external;  

    function getContainer( uint _containerId)external view returns (
        uint containerId,
        uint orderId,
        uint packingListId
        );
    function getCertificateOfOrigin( uint _certificateOfOriginId) external view returns (
        uint orderId,
        uint certificateOfOriginId,
        uint HSTarriffNumber,
        string memory vaccineName,
        uint manufacturerId,
        bool isApprovedByExportCustoms,
        bool isApprovedByImportCustoms
    );
    function getExportLorryReciept( uint _orderId) external view returns(
        uint orderId,
        uint lorryRecieptId,
        uint carrierId,
        string memory pickupLocation,
        string memory deliveryLocation,
        bool isPickedUp,
        bool isDeliveryDone
        );
    function getImportLorryReciept( uint _orderId) external view returns(
        uint orderId,
        uint lorryRecieptId,
        uint carrierId,
        string memory pickupLocation,
        string memory deliveryLocation,
        bool isPickedUp,
        bool isDeliveryDone
        );
    function getAirwayBill( uint _airwayBillId) external view returns(
        uint invoiceId,
        uint airwayBillId,
        uint aircarrierId, // assumed that air carrier and truck carrier are same
        uint exportAirportId,
        uint importAirportId,
        bool specialHandlingRequired,
        bool isApprovedByExportCustoms,
        bool isApprovedByImportCustoms
        );
    
    function onboardSensor( uint _containerId, address _iotAddress)  external returns (uint iotId, uint containerId);
    
    function checkTemperatureAndHumdity( uint _iotId, uint _temperature, uint _humidity) external returns (bool everythingCorrect); 
    
    function RequestPickUp(uint _orderId) external returns(bool success);
    
    function approveExport(uint _containerId) external returns(bool success); 
    
    function approveImport(uint _containerId, uint _warehouseId) external returns(bool success);
    
    function TransportContainerFromAirport(uint _orderId, uint _carrierId) external;
    
    function approveDelivery(uint _orderId) external ;
    
    function makePayment( uint _invoiceId) external payable ;
    
    function buyVaccine( uint _numberOfContainers, uint _distributorId, uint _vaccineId) external returns (uint purchaseOrderId); //for hospitals

    function acceptDistributionOrderAndShip( uint _orderId, uint _carrierId) external returns (uint invoiceId);
}
