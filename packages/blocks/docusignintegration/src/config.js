// Customizable Area Start
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.getProfileContentType = "application/json";
exports.getProfileApiEndPoint = "bx_block_profile/profiles/get_profile";
exports.getProfileApiMethodType = "GET";

exports.allServicesApiEndpoint =
  "bx_block_landing_page/admin_landing_pages/get_services";
exports.allServicesApiMethodType = "GET";
exports.allservicesApiContentType = "application/json";

exports.documentSignedApiContentType = "application/json";
exports.documentSignedApiEndPoint = "bx_block_menu_ordering/document_signed_status?signed=true&document_id=";
exports.documentSignedApiMethodType = "GET";

exports.getDocusignDetailsApiContentType = "application/json";
exports.getDocusignDetailsApiMethodType = "GET";
exports.getDocusignApiEndpoint = "bx_block_menu_ordering/docusign_status?notary_request_id=";

exports.startDocuSignApiContentType = "application/json";
exports.startDocuSignApiMethodType = "POST";
exports.startDocuSignApiEndpoint = "bx_block_menu_ordering/docusign_start";

exports.generateSigningUrlsApiContentType = "application/json";
exports.generateSigningUrlsApiMethodType = "POST";
exports.generateSigningUrlsApiEndPoint = "bx_block_menu_ordering/docusign_url";
// Customizable Area End
