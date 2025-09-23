Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ACCOUNT_TYPE_EMAIL = "EmailAccount";
exports.ACCOUNT_TYPE_SOCIAL = "SocialAccount";
exports.ACCOUNT_TYPE_PHONE = "SmsAccount";

exports.contentTypeApiUpdateUser = "application/json";
exports.apiEndPointUpdateUser = "profile/profile";
exports.apiUpdateUserType = "PUT";

exports.urlGetValidations = "profile/validations";
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";

exports.contenttypeApiValidateMobileNo = "application/json";
exports.endPointApiValidateMobileNo = "profile/change_phone_validation";
exports.callTypeApiValidateMobileNo = "POST";

exports.endPointApiGetUserProfile = "profile/profile";
exports.contentTypeApiGetUserProfile = "application/json";
exports.methodTypeApiGetUserProfile = "GET";

// Customizable Area Start
exports.placeHolderEmail = "Email";
exports.labelHeader =
  "This is your profile, Here you can see and update your personal information.";
exports.labelFirstName = "First name";
exports.lastName = "Last name";
exports.labelArea = "Area";
exports.labelMobile = "Mobile";
exports.labelEmail = "Email";
exports.labelCurrentPassword = "Current password";
exports.labelNewPassword = "New Password";
exports.labelRePassword = "Re-Type Password";
exports.btnTextCancelPasswordChange = "Cancel";
exports.btnTextSaveChanges = "Save Changes";
exports.btnTextChangePassword = "Change Password";
exports.errorCountryCodeNotSelected = "Please select country code";
exports.errorMobileNoNotValid = "Phone number is not valid.";
exports.errorTitle = "Error";
exports.errorBothPasswordsNotSame = "Passwords must match.";
exports.errorCurrentNewPasswordMatch = "New password cannot match current password.";
exports.errorCurrentPasswordNotValid = "Current password not valid.";
exports.errorNewPasswordNotValid = "New password not valid.";
exports.errorReTypePasswordNotValid = "Re-type password not valid.";
exports.hintCountryCode = "Select Country";
exports.errorBlankField = "can't be blank";
exports.errorEmailNotValid = "Email not valid.";
exports.setYourself = "Set Yourself";
exports.offline = "Offline";
exports.myProfile = "My Profile";
exports.payments = "Payments";
exports.notaryServices = "Notary Services";
exports.settings = "Settings";
exports.myAccount = "My Account";
exports.editPicture = "Edit picture";
exports.fullName = "Full Name";
exports.emailID = "Email ID";
exports.mobileText = "Mobile Number";
exports.addressLine = "Address Line 1";
exports.addressLineTwo = "Address Line 2 (Optional)";
exports.postCode = "Post Code";
exports.cancel = "Cancel";
exports.editProfile = "Edit profile";
exports.city = "City";
exports.country = "Country";
exports.getUserProfileEndPoint = "bx_block_profile/profiles/get_profile";
exports.editProfileAPIEndPoint = "bx_block_profile/profiles/update_profile";
exports.contentType = "multipart/form-data";
exports.countryCodeAPIEndPoint = "bx_block_menu_ordering/country_codes";
exports.errorFullName = "Please enter full name";
exports.companyError = "Please enter company Name";
exports.regexMobile = /^\d{9,12}$/;
exports.errorMobile = "Please enter valid mobile number";
exports.errorAddress= "Please enter your address line 1";
exports.errorCity= "Please enter your city name";
exports.errorPost = "Please enter your post code";
exports.onlineText = "Online";
exports.invalidDes = "Please select an image file (PNG, JPEG, JPG).";
exports.selectAllService = "Select All Services";
exports.saveChanges = "Save Changes";
exports.cancel = "Cancel";
exports.getAllServicesEndPoint = "bx_block_landing_page/admin_landing_pages/get_services";
exports.getUserServicesEndPoint = "account_block/accounts/notary_user_services";
exports.postUserServiceUpdate = "account_block/add_services";
exports.getCountryAPI = "account_block/countries";
exports.errorPostcode = "Please enter post code"
exports.ApiContentType = "application/json"
exports.httpGetMethod = "GET"
exports.transactionHistoryListEndpoint = "bx_block_stripe_integration/transaction_history?"
exports.option_1 = "By date (oldest first)"
exports.option_2 = "By date (newest first)"
exports.option_3 = "By amount (highest to lowest)"
exports.option_4 = "By amount (lowest to highest)"
exports.tableColumn_1 = "Request Type"
exports.tableColumn_2 = "Transaction Date"
exports.tableColumn_3 = "Method of Transaction"
exports.tableColumn_4 = "Transaction no."
exports.tableColumn_5 = "Order ID"
exports.tableColumn_6 = "Status"
exports.tableColumn_7 = "Payment Amount"
exports.sortByText = "Sort By";
exports.noMoreTransactionsText = "No more transactions to load.";
exports.noDataText = "No Data Found"
exports.countryValidation = "Invalid phone number for the selected country code"
// Customizable Area End

