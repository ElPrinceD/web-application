Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Dashboard specific configuration
exports.dashboardGetUrl = "bx_block_menu_ordering/notary_requests/request_counts";
exports.dashboarContentType = "application/json";
exports.dashboarApiMethodType = "GET";
exports.totalCandidateslabelTitleText = "Total Requests";
exports.candidateslabelTitleText = "Requests";

// Customizable Area Start
exports.appJsonContentType = "application/json";
exports.getMethod = "GET";
exports.postMethod = "POST";
exports.putMethod = "PUT";

exports.allRequestCountApiEndpoint = "bx_block_menu_ordering/notary_requests/request_counts";
exports.getAllNotaryRequestApiEndpoint = "bx_block_menu_ordering/notary_requests";
exports.allServiceApiEndpoint = "bx_block_landing_page/admin_landing_pages/get_services";
exports.userServicesEndPoint = "account_block/accounts/notary_user_services";
exports.getjuridictionAPIEndPoint = "bx_block_menu_ordering/notary_requests/all_jurisdictions";
exports.getNotrisationMetodEndpoint = "bx_block_menu_ordering/notary_requests/all_notarisation_method";
exports.getProfileEndPoint = "bx_block_profile/profiles/get_profile";
exports.newNotaryEndPoint = "bx_block_menu_ordering/notary_requests";
exports.getCancellationChargesEndpoint1 = "bx_block_menu_ordering/notary_requests/";
exports.getCancellationChargesEndpoint2 = "/cancellation_charges";
exports.cancelRequestEndpoint1 = "bx_block_menu_ordering/notary_requests/";
exports.cancelRequestEndpoint2 = "/cancel_end_user_notary_request";
exports.editNotaryRequestEndPoint = "bx_block_menu_ordering/notary_requests";
exports.acceptRequestEndPoint = "bx_block_menu_ordering/accept_invite_request";
exports.getPriorityAPIEndPoint = "bx_block_menu_ordering/menu_orderings/availability"
exports.zoomEndPoint = "bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=";
exports.zoomRecentMeetingsEndPoint = "bx_block_cfzoomintegration92/zoom_meetings/all_meetings";
exports.zoomCreateMeetingEndPoint = "bx_block_cfzoomintegration92/zoom_meetings";
exports.zoomSignatureEndPoint = "bx_block_cfzoomintegration92/zoom_meetings/generate_signature";

// Zoom Web SDK v2 Configuration
exports.zoomSDKKey = process.env.REACT_APP_ZOOM_SDK_KEY || "1wYDJ1zZRmOBWTKs66QKmQ";
exports.zoomSDKSecret = process.env.REACT_APP_ZOOM_SDK_SECRET || "lGBIHUOB7ntMOpc54ecrZdhqcVinWySj";
exports.allServicesApiEndpoint = "bx_block_landing_page/admin_landing_pages/get_services";
exports.countryCodeAPIEndPoint = "bx_block_menu_ordering/country_codes";
exports.clientRequestAPIEndPoint ="bx_block_menu_ordering/invite_request";
// exports.rejectRequestAPIEndPoint = "reject_invite_request"; // Endpoint doesn't exist - removed
exports.getPlateFormFeesAPIEndPoint = "bx_block_quotemanagement2/quotes/fetch_platform_fees";
exports.postGuestRequestApiEndPoint = "account_block/accounts/guest_user_notary_request";
exports.validateGuestEmailEndPoint = "account_block/accounts/validate_guest_email";

exports.regexForNumber = /^(?!0)\d+$/;
exports.nameRegex = /^[A-Z a-z]+$/;
exports.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Customizable Area End
