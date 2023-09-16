export var UserType;
(function (UserType) {
    UserType["Admin"] = "ADMIN";
    UserType["Agency"] = "AGENCY";
    UserType["User"] = "USER";
})(UserType || (UserType = {}));
export var AppType;
(function (AppType) {
    AppType["Backend"] = "BACKEND";
    AppType["Frontend"] = "FRONTEND";
})(AppType || (AppType = {}));
export var PropertyType;
(function (PropertyType) {
    PropertyType["Apartment"] = "APARTMENT";
    PropertyType["Commercial"] = "COMMERCIAL";
    PropertyType["Farm"] = "FARM";
    PropertyType["House"] = "HOUSE";
    PropertyType["Industrial"] = "INDUSTRIAL";
    PropertyType["Plot"] = "PLOT";
    PropertyType["Townhouse"] = "TOWNHOUSE";
})(PropertyType || (PropertyType = {}));
export var BookingStatus;
(function (BookingStatus) {
    BookingStatus["Void"] = "VOID";
    BookingStatus["Pending"] = "PENDING";
    BookingStatus["Deposit"] = "DEPOSIT";
    BookingStatus["Paid"] = "PAID";
    BookingStatus["Reserved"] = "RESERVED";
    BookingStatus["Cancelled"] = "CANCELLED";
})(BookingStatus || (BookingStatus = {}));
export var RecordType;
(function (RecordType) {
    RecordType["Admin"] = "ADMIN";
    RecordType["Agency"] = "AGENCY";
    RecordType["User"] = "USER";
    RecordType["Property"] = "PROPERTY";
    RecordType["Location"] = "LOCATION";
})(RecordType || (RecordType = {}));
export var Availablity;
(function (Availablity) {
    Availablity["Available"] = "AVAILABLE";
    Availablity["Unavailable"] = "UNAVAILABLE";
})(Availablity || (Availablity = {}));
export var RentalTerm;
(function (RentalTerm) {
    RentalTerm["Monthly"] = "MONTHLY";
    RentalTerm["Weekly"] = "WEEKLY";
    RentalTerm["Daily"] = "DAILY";
    RentalTerm["Yearly"] = "YEARLY";
})(RentalTerm || (RentalTerm = {}));
