pragma solidity ^0.5.0;
import "./SafeMath.sol";
import "./MCGInterface.sol";

contract MCG is MCGInterface{
    using SafeMath for uint256;
    
    address public contractAddress;
    address public adminAddress;
    
    constructor() public {
    contractAddress = address(this);
    adminAddress = msg.sender;
    }
    
    struct Company{
        uint companyId;
        address payable owner;
        string companyName;
        uint identificationNumber;
        string location;
        bool isApprovedByAdmin;
        string scRole; // don't really need scRole
    }
    
    struct Vaccine {
        uint vaccineId;
        string vaccineName;
        uint vaccinePrice;
        uint manufacturerId;
        uint threshLowestTemp;
        uint threshHighestTemp;
        uint threshHumidity;
        uint HSTarriffNumber;
    }
    
    struct Batch {
        uint batchId;
        uint amount;
    }
    
    struct PurchaseOrder{
        uint sellerId;
        uint vaccineId;
        uint orderId;
        uint orderQuantity;
        bool isOrderAccepted;
        uint ordererId;
    }
    
    struct Invoice{
        uint invoiceId;
        uint orderId;
        uint orderValue;
        bool isInvoiceApprovedForPayment;
        bool isInvoicePayed;
        uint timeOfInvoiceGeneration;
    }
    
    struct CertificateOfOrigin {
        uint orderId;
        uint certificateOfOriginId;
        uint HSTarriffNumber;
        string vaccineName;
        uint manufacturerId;
        bool isApprovedByExportCustoms;
        bool isApprovedByImportCustoms;
    }
    
    struct AirwayBill{
        uint invoiceId;
        uint airwayBillId;
        uint aircarrierId; // assumed that air carrier and truck carrier are same
        uint exportAirportId;
        uint importAirportId;
        bool specialHandlingRequired;
        bool isApprovedByExportCustoms;
        bool isApprovedByImportCustoms;
    }
    
    struct PackingList{
        uint PackingListId;
        uint invoiceId;
        uint vaccineId;
        uint vaccineQuantity;
        uint certificateOfOriginId;
        uint airwayBillId;
        uint numberOfPallets;
        bool isApprovedByExportCustoms;
        bool isApprovedByImportCustoms;
        }
    
    struct Container {
        uint containerId;
        uint orderId;
        uint packingListId;
        bool isSafeForDelivery;
        // bool isTemperatureCorrect;
        // bool isHumidityCorrect;
    }
    
    struct Airport{
        uint airportId;
        string airportName;
        string airportLocation;
        address airportOwnerAddress;
    }
    
    struct LorryReciept{
        uint orderId;
        uint lorryRecieptId;
        uint carrierId;
        string pickupLocation;
        string deliveryLocation;
        bool isPickedUp;
        bool isDeliveryDone;
    }
    
    struct Hospital{
        uint hospitalId;
        string  hospitalName;
        string hospitaLocation;
        address payable hospitalAddress;
        bool isApprovedByAdmin;
    }
    
    struct IoT{
        uint ioTId;
        address ioTAddress;
    }
    
    mapping (address => uint) private ownedCompanies;
    mapping (address => uint) private ownedCompanyId;
    mapping (uint => Company) public companies;
    mapping (uint => Airport) public airports;
    mapping (uint => Vaccine) public vaccines;
    mapping (uint => uint) private vaccineToTotalBatches;
    mapping (uint => mapping( uint => Batch)) private vaccineToBatch;
    mapping (uint => mapping(address => uint)) private vaccineCurrentInventory;
    mapping (uint => PurchaseOrder) private purchaseOrders;
    mapping (uint => uint[]) private orderToBatches;
    mapping (uint => Invoice) private invoices;
    mapping (uint => Container) private containers;
    mapping (uint => uint[]) private orderToContainers;
    mapping (uint => CertificateOfOrigin)private  certificateOfOrigins;
    mapping (uint => AirwayBill) private airwayBills;
    mapping (uint => mapping ( bool => LorryReciept)) private orderToLorryReciepts;
    mapping (uint => PackingList) private packingLists;
    mapping (uint => uint) private containerToIot;
    mapping (uint => uint) private containerToWarehouse;
    mapping (uint=> Hospital) public hospitals;
    mapping (address => uint) public ownedHospitalId;
    mapping (uint => uint) public iotToContainer;
    mapping (uint => IoT) public ioTs;
    
    uint private companyId = 0;
    uint private vaccineId = 0;
    uint private hospitaId = 0;
    uint private ioTId = 0;
    uint private containerCapacity = 100;
    uint private orderId = 0;
    uint private invoiceId = 0;
    uint private containerId = 0;
    uint private certificateOfOriginId =0 ;
    uint private packingListId = 0;
    uint private airportId = 0;
    uint private airwayBillId = 0;
    uint private truckCarrierId = 0;
    uint private lorryRecieptId = 0;
    // uint private totalContainerRemaining = 10; // assumed unlimited supply of containers -- future will have limited containers and they will be alloted if they are free
    
    
    event companyRegistered (uint companyId, address companyOwner);
    event VaccineRegistered (uint vaccineId, address manufacturerAddress);
    event OrderPlaced (uint orderId);
    event OrderAccepted(uint orderId);
    event PackingListCreated(uint packingListId);
    event ContainerAssigned(uint containerId);
    event ShipmentInitiated(uint certificateOfOriginId, uint airwayBillId);
    event OrderPickeupForExport(uint orderId);
    event Alarm (uint containerId, uint Temperature, uint Humidity );
    event ShipmentDelivered( uint orderId);
    event OrderPickeupForImport(uint orderId);
    event ContainerFree(uint containerId);
    event PaymentDone(uint invoiceId);
    
    modifier onlyAdmin {
        require(
            msg.sender == adminAddress,
            "Only Admin can call this function."
        );
        _;
    }
    
    modifier onlyApproved {
        require(
            companies[ownedCompanyId[msg.sender]].isApprovedByAdmin == true
            , "You have to be first approved by the Admin");
            _;
    }
    
    modifier onlyVaccineProducer(uint _vaccineId){
        require(companies[vaccines[_vaccineId].manufacturerId].owner == msg.sender
        ," You are not the owner of this vaccine");
        _;
    }

    
    function registerCompany( string memory _companyName,  uint _identificationNumber, string memory _location, string memory _scRole) public {
        // all the requires that use scRole will be replace by companies private address in future
        require(bytes(_companyName).length >0 && (bytes(_location).length >0), " fields cannot be empty");
        require (ownedCompanies [msg.sender] <1, "Check inputs/address cannot have more than one Company!");
            
        Company memory company;
        companyId = companyId.add(1);        
        company = Company(companyId, msg.sender,_companyName,_identificationNumber, _location,false, _scRole);
        companies[companyId] = company;
        
        ownedCompanies[msg.sender]= ownedCompanies[msg.sender].add(1);
        ownedCompanyId[msg.sender] = companyId;
        
        emit companyRegistered(companyId, msg.sender);
    }
    
    function getYourCompany() public view returns(
        uint companyId,
        address payable owner,
        string memory companyName,
        uint identificationNumber,
        string memory location,
        bool isApprovedByAdmin,
        string memory scRole // don't really need scRole
        ){
        
        Company memory company = companies[ownedCompanyId[msg.sender]];
        return( company.companyId,
                company.owner,
                company.companyName,
                company.identificationNumber,
                company.location,
                company.isApprovedByAdmin,
                company.scRole
            );
    }
    
    function registerAirport( string memory _airportName, string memory _airportLocation, address _airportOwner) onlyAdmin public  returns(bool success){
        require(bytes(_airportName).length>0 && bytes(_airportLocation).length>0, "Fields Cannot be empty");
        
        Airport memory airport;
        airportId = airportId.add(1);
        airport = Airport( airportId, _airportName, _airportLocation, _airportOwner);
        airports[airportId] = airport;        
        return true;
    }
    
    function approveCompany (uint _companyId) public onlyAdmin returns(bool success){
        companies[_companyId].isApprovedByAdmin = true;
        return true;
    }
    
    function approveHospital (uint _hospitalId) public onlyAdmin returns (bool success){
        hospitals[_hospitalId].isApprovedByAdmin = true;
        return true;
    }
    
    function registerVaccine( string memory _vaccineName, uint _vaccinePrice, uint _threshLowestTemp, uint _threshHighestTemp, uint _thresHumidity, uint _HSTarriffNumber) public onlyApproved {
        
        Vaccine memory vaccine;
        vaccineId = vaccineId.add(1);
        vaccine = Vaccine(vaccineId, _vaccineName, _vaccinePrice, ownedCompanyId[msg.sender], _threshLowestTemp, _threshHighestTemp, _thresHumidity, _HSTarriffNumber); 
        vaccines[vaccineId] = vaccine;
        emit VaccineRegistered(vaccineId, msg.sender);
    }
    
    function produceVaccine( uint _vaccineId, uint _amount) onlyVaccineProducer(_vaccineId) public returns(bool success) {
        require(_amount >0);
        vaccineToTotalBatches[_vaccineId] = vaccineToTotalBatches[_vaccineId].add(1);
        Batch memory batch;
        
        uint _batchId = vaccineToTotalBatches[_vaccineId];
        
        batch = Batch(_batchId, _amount);
        vaccineToBatch[_vaccineId][_batchId] = batch; 
        vaccineCurrentInventory[_vaccineId][msg.sender] = vaccineCurrentInventory[_vaccineId][msg.sender].add(_amount);
        return true;
    }
    
    function getVaccineInventory(uint _vaccineId) public view returns( 
        uint currentInventory){
            return(
                vaccineCurrentInventory[_vaccineId][msg.sender]
            );
        }
    

    function getBatchDetail( uint _orderId) public view returns(
        uint[] memory batchId
    ){
        return(orderToBatches[_orderId]);
    }

    
    function makePurchaseOrder( uint _vaccineId, uint _numberOfContainers) onlyApproved public {
        // assuming minOrderSize == containerCapacity or 1 container
        // uint minOrderSize = containerCapacity;
        // truck cannot carry more than two containers
        require(_numberOfContainers >= 1 && _numberOfContainers <=2, " Order can only be made in multiple of container capacity");
        require(ownedCompanyId[msg.sender] !=0);
        PurchaseOrder memory purchaseOrder;
        orderId = orderId.add(1);
        purchaseOrder = PurchaseOrder(vaccines[_vaccineId].manufacturerId,_vaccineId,orderId, _numberOfContainers, false, ownedCompanyId[msg.sender]);
        purchaseOrders[orderId] = purchaseOrder;
        emit OrderPlaced(orderId);
    }
    
    function getPurchaseOrder( uint _orderId) public view returns(
        uint sellerId,
        uint vaccineId,
        uint orderId,
        uint orderQuantity,
        bool isOrderAccepted,
        uint ordererId
    ){  
        address payable _orderer;

        if(ownedHospitalId[msg.sender] ==  0){
            _orderer = companies[purchaseOrders[_orderId].ordererId].owner;
        }
        else{
            _orderer =  hospitals[purchaseOrders[_orderId].ordererId].hospitalAddress;
            
        }
        
        require((msg.sender == companies[purchaseOrders[_orderId].sellerId].owner)||          // seller
        (msg.sender == _orderer)                    // Orderer,
        , "You are not authorized!"); // Distributor
         PurchaseOrder memory purchaseOrder = purchaseOrders[_orderId];
         
         return(
                purchaseOrder.sellerId,
                purchaseOrder.vaccineId,
                purchaseOrder.orderId,
                purchaseOrder.orderQuantity,
                purchaseOrder.isOrderAccepted,
                purchaseOrder.ordererId
                     );
    }
    
    function acceptOrder (uint _orderId) onlyVaccineProducer(purchaseOrders[_orderId].vaccineId) public  {
        require(purchaseOrders[_orderId].isOrderAccepted == false, "Order Already Accepted");
        // remove the below require in future to allow backlog orders
        uint _vaccineId = purchaseOrders[_orderId].vaccineId;
        require(vaccineCurrentInventory[_vaccineId][msg.sender] >= purchaseOrders[_orderId].orderQuantity*100, "Inventory low!");
       
        purchaseOrders[_orderId].isOrderAccepted = true;
        makeInvoice( _orderId);
        
        uint _orderQuantityVaccine = purchaseOrders[_orderId].orderQuantity*100;
        // vaccine Inventory goes down --> one container has 100 vaccines
        vaccineCurrentInventory[_vaccineId][msg.sender] = vaccineCurrentInventory[_vaccineId][msg.sender].sub(purchaseOrders[_orderId].orderQuantity*100);
        
        for(uint i = 0; i<= vaccineToTotalBatches[_vaccineId]; i++){
            if(vaccineToBatch[_vaccineId][i].amount == 0){
                continue;
            }
            else if(vaccineToBatch[_vaccineId][i].amount >= _orderQuantityVaccine){
                    vaccineToBatch[_vaccineId][i].amount = vaccineToBatch[_vaccineId][i].amount.sub(_orderQuantityVaccine);
                    orderToBatches[_orderId] =[i];
                    break;
            }
            else{
                   vaccineToBatch[_vaccineId][i+1].amount = vaccineToBatch[_vaccineId][i+1].amount + vaccineToBatch[_vaccineId][i].amount - _orderQuantityVaccine;
                   vaccineToBatch[_vaccineId][i].amount = 0;
                    orderToBatches[_orderId] = [i,i+1];
                   break;
            }
        }
        emit OrderAccepted(_orderId);
    }
    
    function makeInvoice ( uint _orderId) private {
        invoiceId = invoiceId.add(1);
        uint _orderValue = (purchaseOrders[_orderId].orderQuantity).mul(vaccines[purchaseOrders[_orderId].vaccineId].vaccinePrice)*100; // v=100 vaccines;
        Invoice memory invoice;
        invoice = Invoice(invoiceId,orderId, _orderValue, false, false, now);
        invoices[invoiceId] = invoice;
    }
    
    
    function getInvoiceId( uint _orderId) private view returns(uint){
        for (uint i = 0; i<= invoiceId; i++){
            if( invoices[i].orderId == _orderId){
                return i;
            }
        }
    } 
    
    function getInvoice( uint _orderId) public view returns(
        uint invoiceId,
        uint orderId,
        uint orderValue,
        bool isInvoiceApprovedForPayment,
        bool isInvoicePayed,
        uint timeOfInvoiceGeneration
        ){
         address payable _orderer;

        if(ownedHospitalId[msg.sender] != 0){
            _orderer =  hospitals[purchaseOrders[_orderId].ordererId].hospitalAddress;
        }
        else{
            _orderer = companies[purchaseOrders[_orderId].ordererId].owner;
        }
        
        require((msg.sender == companies[purchaseOrders[_orderId].sellerId].owner)||          // seller
        (msg.sender == _orderer) ||                      // Distributor
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].exportAirportId].airportOwnerAddress)||   // exportAirportCustoms
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].importAirportId].airportOwnerAddress)
        , " You are not authorized!");
        
        Invoice memory invoice = invoices[getInvoiceId(_orderId)];
        return(
                invoice.invoiceId,
                invoice.orderId,
                invoice.orderValue,
                invoice.isInvoiceApprovedForPayment,
                invoice.isInvoicePayed,
                invoice.timeOfInvoiceGeneration
                    );
        }
    
    function makeLorryReciept (uint _orderId, uint _truckCarrierId, string memory _pickupLocation, string memory _deliveryLocation, bool _isExporting) private {
            // _isExporting is true for export and false for import
            
            lorryRecieptId = lorryRecieptId.add(1);
            LorryReciept memory lorryReciept;
            
            lorryReciept = LorryReciept( _orderId, lorryRecieptId, _truckCarrierId, _pickupLocation, _deliveryLocation, false, false);
            orderToLorryReciepts[_orderId][_isExporting] = lorryReciept;
            
    } 
    
    function makeAirWayBill(uint _invoiceId, uint _carrierId, uint _exportAirportId, uint _importAirportId ) private {
    
        
        airwayBillId = airwayBillId.add(1);
        AirwayBill memory airwayBill;
        airwayBill = AirwayBill(_invoiceId,airwayBillId,_carrierId, _exportAirportId,  _importAirportId, true , false, false);
        airwayBills[airwayBillId] = airwayBill;
    }
    
    function makeCertificateOfOrigin(uint _orderId) private {
        
        certificateOfOriginId = certificateOfOriginId.add(1);
        CertificateOfOrigin memory certificateOfOrigin;
        certificateOfOrigin = CertificateOfOrigin(
                _orderId,
                certificateOfOriginId,
                vaccines[purchaseOrders[_orderId].vaccineId].HSTarriffNumber, 
                vaccines[purchaseOrders[_orderId].vaccineId].vaccineName, 
                ownedCompanyId[msg.sender],
                false, false
        );
        
        certificateOfOrigins[certificateOfOriginId] = certificateOfOrigin;
    }
    
    function assignContainer(uint _orderId, uint _packingListId) private {
        containerId = containerId.add(1);
        Container memory container = Container(containerId, _orderId, _packingListId,true);
        containers[containerId] = container;
    }
    
    function initiateShipment (uint _orderId, uint _carrierId, uint _exportAirportId, uint _destinationAirportId) public onlyVaccineProducer(purchaseOrders[_orderId].vaccineId)  {
        require(companies[_carrierId].isApprovedByAdmin ==true && (msg.sender == companies[vaccines[purchaseOrders[_orderId].vaccineId].manufacturerId].owner));
        
        makeCertificateOfOrigin(_orderId);
        makeLorryReciept(_orderId, _carrierId,companies[ownedCompanyId[msg.sender]].location ,airports[_exportAirportId].airportLocation, true);
        makeAirWayBill(getInvoiceId(_orderId),  _carrierId,  _exportAirportId, _destinationAirportId);
        
        uint _orderQuantity = purchaseOrders[_orderId].orderQuantity;
        uint _invoiceId = getInvoiceId(_orderId);
        
        for (uint i = 0; i<= _orderQuantity; i++){
            PackingList memory packingList;
            uint _vaccineId = purchaseOrders[_orderId].vaccineId;
            uint _certificateOfOriginId = certificateOfOrigins[_orderId].certificateOfOriginId;
            uint _airwayBillId  = airwayBills[orderId].airwayBillId;
            uint _numberOfPallets = 10;
            packingListId = packingListId.add(1);
            packingList = PackingList(packingListId, _invoiceId, _vaccineId, 100, _certificateOfOriginId, _airwayBillId, _numberOfPallets,false, false);
            packingLists[packingListId] = packingList;
            assignContainer(_orderId, packingListId);
            orderToContainers[_orderId].push(containerId);            
            
            
            emit PackingListCreated(packingListId);
            emit ContainerAssigned(containerId);
    }
        emit ShipmentInitiated(certificateOfOriginId, airwayBillId);
    }
    
    function getContainer( uint _containerId)public view returns (
        uint containerId,
        uint orderId,
        uint packingListId
        )
    {
        Container memory container = containers[ _containerId];
        uint _orderId = container.orderId;
        address payable _orderer;

        if(ownedHospitalId[msg.sender] != 0){
            _orderer =  hospitals[purchaseOrders[_orderId].ordererId].hospitalAddress;
        }
        else{
            _orderer = companies[purchaseOrders[_orderId].ordererId].owner;
        }
        
        require((msg.sender == companies[purchaseOrders[_orderId].sellerId].owner)||          // seller
        (msg.sender == _orderer)||                                          // Distributor
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].exportAirportId].airportOwnerAddress)||   // exportAirportCustoms
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].importAirportId].airportOwnerAddress)||   // importAirportCustoms
        (msg.sender == companies[orderToLorryReciepts[_orderId][true].carrierId].owner)||                               // ExportTrucker
        (msg.sender == companies[orderToLorryReciepts[_orderId][true].carrierId].owner)                                 // importTrucker
        , " You are not authorized!");
    
        return(
            container.containerId,
            container.orderId,
            container.packingListId
            );
    }
    
    function getCertificateOfOrigin( uint _certificateOfOriginId) public view returns (
        uint orderId,
        uint certificateOfOriginId,
        uint HSTarriffNumber,
        string memory vaccineName,
        uint manufacturerId,
        bool isApprovedByExportCustoms,
        bool isApprovedByImportCustoms
    ){
        CertificateOfOrigin memory certificateOfOrigin = certificateOfOrigins[_certificateOfOriginId];
        uint _orderId = certificateOfOrigin.orderId;
        require((msg.sender == companies[vaccines[purchaseOrders[_orderId].vaccineId].manufacturerId].owner)||          // manufacturer
        (msg.sender == companies[purchaseOrders[_orderId].ordererId].owner )||                                          // Distributor
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].exportAirportId].airportOwnerAddress)||   // exportAirportCustoms
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].importAirportId].airportOwnerAddress)     // importAirportCustoms
        , " You are not authorized!");
        
        return(
        certificateOfOrigin.orderId,
        certificateOfOrigin.certificateOfOriginId,
        certificateOfOrigin.HSTarriffNumber,
        certificateOfOrigin.vaccineName,
        certificateOfOrigin.manufacturerId,
        certificateOfOrigin.isApprovedByExportCustoms,
        certificateOfOrigin.isApprovedByImportCustoms
            );
    }
    
    function getExportLorryReciept( uint _orderId) public view returns(
        uint orderId,
        uint lorryRecieptId,
        uint carrierId,
        string memory pickupLocation,
        string memory deliveryLocation,
        bool isPickedUp,
        bool isDeliveryDone
        ){
            
        require((msg.sender == companies[purchaseOrders[_orderId].sellerId].owner)||
            (msg.sender == companies[vaccines[purchaseOrders[_orderId].vaccineId].manufacturerId].owner)||             // manufacturer
             (msg.sender == companies[orderToLorryReciepts[_orderId][true].carrierId].owner)                            // ExportTrucker
             , "You are not authorized!");
             
             LorryReciept memory lorryReciept = orderToLorryReciepts[_orderId][true];
            return(
                    lorryReciept.orderId,
                    lorryReciept.lorryRecieptId,
                    lorryReciept.carrierId,
                    lorryReciept.pickupLocation,
                    lorryReciept.deliveryLocation,
                    lorryReciept.isPickedUp,
                    lorryReciept.isDeliveryDone
                            );            
        }
    
        
    function getImportLorryReciept( uint _orderId) public view returns(
        uint orderId,
        uint lorryRecieptId,
        uint carrierId,
        string memory pickupLocation,
        string memory deliveryLocation,
        bool isPickedUp,
        bool isDeliveryDone
        ){
        
             require((msg.sender == companies[purchaseOrders[_orderId].ordererId].owner )||                                          // Distributor
             (msg.sender == companies[orderToLorryReciepts[_orderId][false].carrierId].owner)                            // ExportTrucker
             , "You are not authorized!");
             
             LorryReciept memory lorryReciept = orderToLorryReciepts[_orderId][false];
            return(
                    lorryReciept.orderId,
                    lorryReciept.lorryRecieptId,
                    lorryReciept.carrierId,
                    lorryReciept.pickupLocation,
                    lorryReciept.deliveryLocation,
                    lorryReciept.isPickedUp,
                    lorryReciept.isDeliveryDone
                            );            
        }
    
    
    function getAirwayBill( uint _airwayBillId) public view returns(
        uint invoiceId,
        uint airwayBillId,
        uint aircarrierId, // assumed that air carrier and truck carrier are same
        uint exportAirportId,
        uint importAirportId,
        bool specialHandlingRequired,
        bool isApprovedByExportCustoms,
        bool isApprovedByImportCustoms
        ){
        
        AirwayBill memory airwayBill = airwayBills[_airwayBillId];
        uint _orderId = invoices[airwayBill.invoiceId].orderId;
        address payable _orderer;

        if(ownedHospitalId[msg.sender] != 0){
            _orderer =  hospitals[purchaseOrders[_orderId].orderId].hospitalAddress;
        }
        else{
            _orderer = companies[purchaseOrders[_orderId].orderId].owner;
        }
        
        require((msg.sender == companies[purchaseOrders[_orderId].sellerId].owner)||          // seller
        (msg.sender == _orderer)||                                          // Distributor
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].exportAirportId].airportOwnerAddress)||   // exportAirportCustoms
        (msg.sender == airports[airwayBills[getairwayBillFromOrder(_orderId)].importAirportId].airportOwnerAddress)     // importAirportCustoms
        , " You are not authorized!");  
            
        return(
                airwayBill.invoiceId,
                airwayBill.airwayBillId,
                airwayBill.aircarrierId, // assumed that air carrier and truck carrier are same
                airwayBill.exportAirportId,
                airwayBill.importAirportId,
                airwayBill.specialHandlingRequired,
                airwayBill.isApprovedByExportCustoms,
                airwayBill.isApprovedByImportCustoms
            );    
        }    
    
    function RequestPickUp(uint _orderId) public returns(bool success){
        // only approved Carrier
        // uint _lorryReceiptId = getLorryReceiptFromOrder(_orderId);
        if(airwayBills[getairwayBillFromOrder(_orderId)].isApprovedByImportCustoms == true){
            //import
        require(msg.sender == companies[orderToLorryReciepts[_orderId][false].carrierId].owner);
                orderToLorryReciepts[_orderId][false].isPickedUp = true;
                emit OrderPickeupForImport(_orderId);
            
        }
        else{// export
          require(msg.sender == companies[orderToLorryReciepts[_orderId][true].carrierId].owner);    
          orderToLorryReciepts[_orderId][true].isPickedUp = true;
          emit OrderPickeupForExport(_orderId);
        }
        return true;
    }
    
    
    function getairwayBillFromOrder(uint _orderId) private view returns(uint){
        uint _invoiceId = getInvoiceId(_orderId);
         for (uint i=0 ; i<=airwayBillId; i++){
            if( airwayBills[i].invoiceId == _invoiceId){
                return i;
            }
        }
    }
    
    function onboardSensor( uint _containerId, address _iotAddress) onlyAdmin public returns (uint iotId, uint containerId){
        ioTId = ioTId.add(1);
        
        IoT memory ioT = IoT(ioTId,_iotAddress);
        ioTs[ioTId] = ioT;
        
        iotToContainer[ioTId] = _containerId;
        
        return( ioTId, _containerId);
    }

    
    function checkTemperatureAndHumdity( uint _iotId, uint _temperature, uint _humidity) public  returns (bool everythingCorrect) {
        
        require(ioTs[_iotId].ioTAddress == msg.sender, "wrong IoT address");
        uint _containerId = iotToContainer[_iotId];
        
        if ((_temperature < vaccines[purchaseOrders[containers[_containerId].orderId].vaccineId].threshLowestTemp) 
        || (_temperature > vaccines[purchaseOrders[containers[_containerId].orderId].vaccineId].threshHighestTemp) 
        || (_humidity > vaccines[purchaseOrders[containers[_containerId].orderId].vaccineId].threshHumidity)) {

        emit Alarm( _containerId, _temperature, _humidity);
        containers[_containerId].isSafeForDelivery = false;
        return false;
        }
        else{
            return true;
        }
    }
    
    function approveExport(uint _containerId) public returns(bool success) {
        require( msg. sender == airports[airwayBills[packingLists[containers[_containerId].packingListId].airwayBillId].exportAirportId].airportOwnerAddress);
        require(containers[_containerId].isSafeForDelivery == true, "check Temperature and Humity!! Alarm emitted!!"); 
        // require the temp and Humidity to be correct
        // which flight it is on
        
        orderToLorryReciepts[(containers[containerId].orderId)][true].isDeliveryDone = true;
        certificateOfOrigins[packingLists[containers[_containerId].packingListId].certificateOfOriginId].isApprovedByExportCustoms = true;
        airwayBills[packingLists[containers[_containerId].packingListId].airwayBillId].isApprovedByExportCustoms = true;
        packingLists[containers[_containerId].packingListId].isApprovedByExportCustoms = true;
        
        return true;
    }
    
    function approveImport(uint _containerId, uint _warehouseId) public returns(bool success){
        require( msg.sender == airports[airwayBills[packingLists[containers[_containerId].packingListId].airwayBillId].importAirportId].airportOwnerAddress);
        require(containers[_containerId].isSafeForDelivery == true, "check Temperature and Humity!! Alarm emitted!!");
        
        certificateOfOrigins[packingLists[containers[_containerId].packingListId].certificateOfOriginId].isApprovedByImportCustoms = true;
        airwayBills[packingLists[containers[_containerId].packingListId].airwayBillId].isApprovedByImportCustoms = true;
        packingLists[containers[_containerId].packingListId].isApprovedByImportCustoms = true;
        
        containerToWarehouse[_containerId] = _warehouseId;
        return true;
    }
    
    function TransportContainerFromAirport(uint _orderId, uint _carrierId) public {
        require(msg.sender == companies[purchaseOrders[_orderId].ordererId].owner , " You are not authorized to pick up this order."); // Distributor
        uint _airwayBillId = getairwayBillFromOrder(_orderId);
        makeLorryReciept( _orderId, _carrierId, airports[airwayBills[_airwayBillId].importAirportId].airportLocation, companies[ownedCompanyId[msg.sender]].location,false );
    }
    
    function approveDelivery(uint _orderId) public {
 
        if(ownedCompanyId[msg.sender]>0){
            require(msg.sender == companies[purchaseOrders[_orderId].ordererId].owner, " You are not authorized to approve this delivery.");
            orderToLorryReciepts[_orderId][false].isDeliveryDone = true;
        }
        else{
            require(msg.sender == hospitals[purchaseOrders[_orderId].ordererId].hospitalAddress,"You are not authorized to approve this delivery");
        }
        invoices[getInvoiceId(_orderId)].isInvoiceApprovedForPayment = true;
        uint _vaccineId = purchaseOrders[_orderId].vaccineId;
        vaccineCurrentInventory[_vaccineId][msg.sender] = vaccineCurrentInventory[_vaccineId][msg.sender].add(purchaseOrders[_orderId].orderQuantity*100); 
        for (uint i=0;i< purchaseOrders[_orderId].orderQuantity;i++){
            uint _containerId = orderToContainers[_orderId][i];
            require(containers[_containerId].isSafeForDelivery == true, "check Temperature and Humity!! Alarm emitted!!");
            emit ContainerFree(_containerId);
        }
    }
    
    function makePayment( uint _invoiceId) public payable {
        
        require(msg.sender == companies[purchaseOrders[invoices[_invoiceId].orderId].ordererId].owner || msg.sender == hospitals[purchaseOrders[invoices[_invoiceId].orderId].ordererId].hospitalAddress, "You are trying to pay wrong invoice.");
        require(invoices[_invoiceId].isInvoicePayed != true,"Invoice already payed!") ;       
   
        invoices[_invoiceId].isInvoiceApprovedForPayment = true;
        invoices[_invoiceId].isInvoicePayed = true;
        address payable _payee = companies[vaccines[purchaseOrders[invoices[_invoiceId].orderId].vaccineId].manufacturerId].owner;
        
        uint  _orderId = invoices[_invoiceId].orderId;
        uint _numberDelivered = 0;
        uint _orderQuantity = purchaseOrders[_orderId].orderQuantity;
        for (uint i=0;i< _orderQuantity;i++){
            uint _containerId = orderToContainers[_orderId][i];
            if(containers[_containerId].isSafeForDelivery == true){
               _numberDelivered = _numberDelivered.add(1);
            }}
        
        uint _paymentAmount = (invoices[_invoiceId].orderValue * (_numberDelivered)/_orderQuantity);
        
        if(msg.value > _paymentAmount) {
            address(uint160(msg.sender)).transfer(msg.value - _paymentAmount);
        }
       
        address(uint160(_payee)).transfer(_paymentAmount);
        emit PaymentDone(_invoiceId);
    }
    
    function registerHospital(string memory _hospitalName, string memory _hospitalLocation) public returns( uint hospitalId){
        require(ownedHospitalId[msg.sender] == 0 && ownedCompanyId[msg.sender] == 0);
        hospitalId = hospitalId.add(1);
        Hospital memory hospital = Hospital(hospitalId, _hospitalName,_hospitalLocation, msg.sender,false);
        hospitals[hospitalId] = hospital;
        ownedHospitalId[msg.sender] = hospitalId;
        return(hospitalId);
    }
    

    function buyVaccine( uint _numberOfContainers, uint _distributorId, uint _vaccineId) public returns (uint purchaseOrderId){
        require(hospitals[ownedHospitalId[msg.sender]].isApprovedByAdmin == true);
        PurchaseOrder memory purchaseOrder;
        orderId = orderId.add(1);
        purchaseOrder = PurchaseOrder(_distributorId,_vaccineId,orderId, _numberOfContainers, false, ownedHospitalId[msg.sender]);
        purchaseOrders[orderId] = purchaseOrder;
    }

    function acceptDistributionOrderAndShip( uint _orderId, uint _carrierId) public returns (uint invoiceId){
        uint _vaccineId = purchaseOrders[_orderId].vaccineId;
        require(msg.sender == companies[purchaseOrders[_orderId].sellerId].owner && vaccineCurrentInventory[_vaccineId][msg.sender] >= purchaseOrders[_orderId].orderQuantity*100
        , "Either you are not authorized to accept order or your Inventory is low");
        makeInvoice(_orderId);
        makeLorryReciept(_orderId, _carrierId,companies[ownedCompanyId[msg.sender]].location ,hospitals[ownedHospitalId[msg.sender]].hospitaLocation, true);
        vaccineCurrentInventory[_vaccineId][msg.sender] = vaccineCurrentInventory[_vaccineId][msg.sender].sub(purchaseOrders[_orderId].orderQuantity); 

        uint _orderQuantity = purchaseOrders[_orderId].orderQuantity;
        uint _invoiceId = getInvoiceId(_orderId);
        
        for (uint i = 0; i<= _orderQuantity; i++){
            PackingList memory packingList;
            uint _vaccineId = purchaseOrders[_orderId].vaccineId;
            uint _certificateOfOriginId = 0;
            uint _airwayBillId  = 0;
            uint _numberOfPallets = 10;
            packingListId = packingListId.add(1);
            packingList = PackingList(packingListId, _invoiceId, _vaccineId, 100, _certificateOfOriginId, _airwayBillId, _numberOfPallets,false, false);
            packingLists[packingListId] = packingList;
            assignContainer(_orderId, packingListId);
            orderToContainers[_orderId].push(containerId);            
            
            emit PackingListCreated(packingListId);
            emit ContainerAssigned(containerId);
                   // no airwaybill or certificateOfOrigin required and no need for approval from customs so values will be 0,0 and false;
    }}
    
    // truck will request pickup after this.
}
