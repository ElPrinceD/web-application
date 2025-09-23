Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.validationApiContentType = "application/json";
exports.validationApiMethodType = "GET";
exports.PatchApiMethodType = "PATCH";
exports.exampleAPiEndPoint = "EXAMPLE_URL";
exports.exampleAPiMethod = "POST";
exports.exampleApiContentType = "application/json";
exports.textInputPlaceHolder = "Enter Text";
exports.labelTitleText = "TextDetector";
exports.labelBodyText = "TextDetector Body";

exports.btnExampleTitle = "CLICK ME";

exports.requestApiContentType = "application/json";
exports.getReceivedRequestApiEndpoint = "request_management/requests/received";
exports.getReceivedRequestApiMethod = "GET";

exports.getSendRequestApiEndpoint = "request_management/requests/sent";
exports.getSendRequestApiMethod = "GET";

exports.getAllReceivedRequestApiEndpoint = "request_management/requests";
exports.getAllReceivedRequestApiMethod = "GET";

exports.createSendRequestApiEndpoint = "request_management/requests";
exports.createSendRequestApiMethod = "POST";
exports.markAsCompleteApiEndPoint = "/bx_block_menu_ordering/notary_requests/";
exports.emptyGroupIdAlert = "Please select group id";
exports.emptyRejectReasonAlert = "Please enter reason";
exports.acceptedMsgText = "Request has been accepted.";
exports.rejectedMsgText = "Request has been rejected.";
exports.deletedMsgText = "Request has been deleted.";
exports.requestSentSuccessMsg = "Request has been sent."
exports.requestUpdateSuccessMsg = "Request has been updated."

exports.updateRequestApiEndpointStart = "request_management/requests/";
exports.updateRequestApiEndpointEnd = "/review";
exports.updateRequestApiMethod= "PUT";

exports.deleteRequestApiEndpoint = "request_management/requests/";
exports.deleteRequestApiMethod= "DELETE";

exports.getGroupsApiEndpoint = "account_groups/groups";
exports.getGroupsApiMethod= "GET";

exports.getSentRequestApiEndpoint = "request_management/requests/sent";
exports.getSentRequestApiMethod= "GET";

exports.updateRequestTextApiEndpoint = "request_management/requests/";
exports.updateRequestTextApiMethod= "PUT";


exports.titleText = "Request Management";
exports.sendRequestBtnLabel = "Send Request";
exports.receiveRequestText = "Received Requests";
exports.nameLabelText = "Name";
exports.requestLabelText = "Request Text";
exports.rejectReasonLabelText = "Reject Reason";
exports.statusLabelText = "Status";
exports.actionLabelText = "Action";
exports.acceptBtnLabel = "Accept";
exports.rejectBtnLabel = "Reject";
exports.deleteBtnLabel = "Delete";
exports.sendRequestsText = "Sent Requests";
exports.updateBtnLabel = "Update";
exports.viewBtnLabel = "View";
exports.requestIdLabel = "Request ID";
exports.sendRequestDialogTitle = "Send Request";
exports.updateRequestDialogTitle = "Update Request";
exports.rejectRequestDialogTitle = "Request reject";
exports.cancelBtnLabel = "Cancel";
exports.sendBtnLabel = "Send";
exports.rejectReasonInputLabel = "Please enter reason";
exports.requestTextInputLabel = "Please enter request text";
exports.selectGroupPlaceholder = "Please select group";
exports.rejectTextFieldIsRequired = "Please enter reject reason";
exports.loginAlertMessage = "Please login first.";
exports.filterInputLabel = "Enter request id to filter"

exports.getCancellationChargesApiEndpointPart1 = "bx_block_menu_ordering/notary_requests/";
exports.getCancellationChargesApiEndpointPart2 = "/cancellation_charges";
exports.getCancellationChargesApiMethod = "GET";
exports.getCancellationChargesContentType = "application/json";

exports.cancelNotaryRequestApiEndpointPart1 = "bx_block_menu_ordering/notary_requests/";
exports.cancelNotaryRequestApiEndpointPart2 = "/cancel_end_user_notary_request";
exports.cancelNotaryRequestApiMethod = "PUT";
exports.cancelNotaryRequestContentType = "application/json";

exports.getNotaryRequestDetailsApiContentType = "application/json";
exports.getNotaryRequestDetailsApiMethodType = "GET";
exports.getNotaryRequestDetailsApiEndPoint = "bx_block_menu_ordering/notary_requests/";
exports.getAllNotaryRequestApiEndpoint = "bx_block_menu_ordering/notary_requests";

exports.getProfileContentType = "application/json";
exports.getProfileApiEndPoint = "bx_block_profile/profiles/get_profile";
exports.getProfileApiMethodType = "GET";

exports.allServicesApiEndpoint =
  "bx_block_landing_page/admin_landing_pages/get_services";
exports.allServicesApiMethodType = "GET";
exports.allservicesApiContentType = "application/json";

exports.regex = new RegExp(/^\d{0,8}\.?\d{0,4}$/);

exports.submitQuoteApiContentType = "application/json";
exports.submitQuoteApiEndPoint = "bx_block_quotemanagement2/quotes";
exports.submitQuoteApiMethodType = "POST";

exports.getQuotesListApiContentType = "application/json";
exports.getQuotesListApiEndPointPart1 = "/bx_block_quotemanagement2/quotes/";
exports.getQuotesListApiEndPointPart2 = "/list_quotes"
exports.getQuotesListApiMethodType = "GET";

exports.stripePayApiContentType = "application/json";
exports.stripePayApiEndpoint = "bx_block_stripe_integration/pay_now";
exports.stripePayApiMethodType = "POST";

exports.acceptQuoteApiContentType = "application/json";
exports.acceptQuoteApiMethodType = "POST";
exports.acceptQuoteApiEndpoint1 = "bx_block_quotemanagement2/quotes/";
exports.acceptQuoteApiEndpoint2 = "/accept_quote"

exports.withdrawQuoteApiContentType = "application/json";
exports.withdrawQuoteApiMethodType = "POST";
exports.withdrawQuoteApiEndpoint1 = "bx_block_quotemanagement2/quotes/";
exports.withdrawQuoteApiEndpoint2 = "/withdraw_quote";

exports.generateMeetingApiContentType = "application/json";
exports.generateMeetingApiMethodType = "POST";
exports.generateMeetingApiEndpoint = "bx_block_cfzoomintegration92/zoom_meetings";

exports.getMeetingTimeApiContentType = "application/json";
exports.getMeetingTimeApiMethodType = "GET";
exports.getMeetingTimeApiEndpoint = "bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=";

exports.getKYCStatusApiContentType = "application/json";
exports.getKYCStatusApiMethodType = "GET";
exports.getKYCStatusApiEndpoint = "bx_block_knowyourcustomerkycverification2/onfidos/get_notary_request_status?notary_request_id=";

exports.apiContentType = 'application/json';
exports.createChatRoomApiEndPoint = 'bx_block_chat/chats';
exports.postApiMethod = 'POST';

exports.allRequestCountAPI =
  "bx_block_menu_ordering/notary_requests/request_counts";
exports.allRequestApiEndpoint = "bx_block_menu_ordering/notary_requests";
exports.dashboardGetUrl = "/bx_block_dashboard/candidates";
exports.dashboarContentType = "application/json";
exports.dashboarApiMethodType = "GET";
exports.postMethod = "POST";
exports.putMethod = "PUT";
exports.dashboardHost = "<calculated when request is sent>";
exports.dashboarUserAgent = "PostmanRuntime/7.26.5";
exports.dashboarAccept = "*/*";
exports.dashboarAcceptEncoding = "gzip, deflate, br";
exports.dashboarConnection = "keep-alive";
exports.dashboartoken = "";
exports.labelTitleText = "Requests";
exports.totalCandidateslabelTitleText = "Total Candidates";
exports.viewDetailsBtn = "View Details";
exports.candidateslabelTitleText = "Candidates";
exports.baseUrl = "";
exports.labelBodyText = "dashboard Body";
exports.progressRequestCountAPI =
  "bx_block_menu_ordering/notary_requests/all_request_for_in_progress";
exports.urgency = "Urgency";
exports.orderID = "Order ID";
exports.notaryService = "Notary Services";
exports.method = "Method";
exports.requestDate = "Request Date";
exports.status = "Status";
exports.action = "Action";
exports.view = "View";
exports.edit = "Edit";
exports.noRequest = "No requests yet!";
exports.bookNow = "Book Now";
exports.textEmpty =
  "Create your first notary request with renotary by clicking";
exports.termsService = "Terms of service";
exports.fotterText = "renotary 2024";
exports.privacyPoilcy = "Privacy policy";
exports.allServiceApiEndpoint =
  "bx_block_landing_page/admin_landing_pages/get_services";
exports.notaryServicesText = "Notary Services";
exports.getjuridictionAPIEndPoint =
  "bx_block_menu_ordering/notary_requests/all_jurisdictions";
exports.getNotrisationMetodEndpoint =
  "bx_block_menu_ordering/notary_requests/all_notarisation_method";
exports.testing = "Testing";
exports.newNotaryRequest = "New Notary Request";
exports.typeOfNotaryService = "Type of notary service";
exports.methodOfNotarisations = "Method of Notarisations";
exports.selectTheMethodOfNotarisations = "Select the method of notarisations.";
exports.selectTheDateAndTimeSlotForYourNotaryService =
  "Select the date and time slot for your notary service.";
exports.selectTheDateBetweenTomorrowAnd30DaysFromTomorrow =
  "Select the date between tomorrow and 30 days from tomorrow";
exports.addSpecialInstructionOrAdditionalInformation =
  "Add special instruction or additional information (optional)";
exports.chooseYourJurisdiction = "Choose your Jurisdiction";
exports.chooseYourJurisdictionWhereYouNeedANotaryService =
  "Choose your jurisdiction where you need a notary service.";
exports.selectTheNumberOfDocumentsToBeNotarised =
  "Select the number of documents to be notarised.";
exports.cancel = "Cancel";
exports.next = "Next";
exports.morning = "Morning";
exports.afternoon = "Afternoon";
exports.evening = "Evening";
exports.save = "Save";
exports.remove = "Remove";
exports.back = "Back";
exports.createRequest = "Create Request";
exports.editRequest = "Update";
exports.getProfileEndPoint = "bx_block_profile/profiles/get_profile";
exports.no = "No";
exports.checkStatus = "Check Status";
exports.newNotaryEndPoint = "bx_block_menu_ordering/notary_requests";
exports.noNotaryRequest = "No Notary Requests!";
exports.regexForNumber = /^(?!0)\d+$/;
exports.nameRegex = /^[A-Z a-z]+$/;
exports.noNotaryRequestforNotaryUser =
  "Stay calm and relax. You'll receive your first notary request soon";

exports.outGoingText = "Outgoing Requests";
exports.noOngoingRequest = "No Ongoing Requests";
exports.noOngoingforNotaryUser =
  "Stay calm and relax. You'll receive your notary request soon";
exports.requestText = "All Requests";

exports. getAllRequestContentType = "application/json";
exports.editNotaryRequestEndPoint = "bx_block_menu_ordering/notary_requests";
exports.allNotaryServicesApiEndpoint =
  "bx_block_landing_page/admin_landing_pages/get_services";
exports.doYouReallyWantToCancelTheRequest =
  "Do you really want to cancel the request?";
exports.doYouReallyWantToCancelEditingTheRequest =
  "Do you really want to cancel editing the request?";
exports.yesCancelRequest = "Yes, Cancel request";
exports.yesCancelEditing = "Yes, Cancel Editing";
exports.no = "No";
exports.saveDraft = "Save Draft";
exports.commingSoonText = "Coming Soon";
exports.chooseYourCurrency = "Choose your currency"
exports.zoomEndPoint = "bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=";
exports.checkUnreadMessageCountApiEndPoint = "bx_block_chat/unread_message_count?id="
exports.rejectRequestAPIEndPoint = "reject_invite_request"
exports.warning = "warning";
exports.discText = "Are you sure you want to mark this request as completed?";
exports.discText2 = "Once completed you won't be able to make any changes.";
exports.btnText = "Yes, Mark Completed";
exports.invoiceDownload = "/bx_block_menu_ordering/notary_requests/generate_invoice_pdf?id=";
exports.notaryDeleteRequestAPIEndPoint = "bx_block_menu_ordering/notary_requests/";
// Customizable Area End