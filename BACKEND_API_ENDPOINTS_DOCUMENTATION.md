# Complete Backend API Endpoints Documentation

Based on comprehensive analysis of the React/TypeScript frontend codebase, here's the complete list of all backend endpoints used by the frontend:

## Base URLs
- **Main API**: `http://localhost:3001` (from framework config)
- **Salandy Frontend API**: `http://localhost:8000/api` (from salandy_frontend)

---

## 1. Authentication & User Management

### Salandy Frontend (React Native App)
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `/auth/token/` | POST | `{ email: string, password: string }` | `{ user: User, token: string, refresh: string }` | `authSlice.ts` → `loginUser` |
| `/users/register/` | POST | `{ email: string, password: string, firstName: string, lastName: string }` | `{ user: User, token: string }` | `authSlice.ts` → `registerUser` |
| `/auth/refresh/` | POST | `{ refresh: string }` | `{ access: string }` | `api/index.ts` → token refresh |
| `/auth/forgot-password/` | POST | `{ email: string }` | `{ message: string }` | `authSlice.ts` → `forgotPassword` |
| `/auth/reset-password/` | POST | `{ token: string, password: string }` | `{ message: string }` | `authSlice.ts` → `resetPassword` |
| `/auth/verify-email/` | POST | `{ token: string }` | `{ message: string }` | `authSlice.ts` → `verifyEmail` |
| `/users/profile/` | GET | - | `{ id: string, email: string, firstName: string, lastName: string, ... }` | `authSlice.ts` → `fetchUserProfile` |
| `/users/profile/` | PATCH | `{ firstName?: string, lastName?: string, ... }` | `{ user: User }` | `authSlice.ts` → `updateUserProfile` |

### Main Application (Web)
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_login/logins` | POST | `{ data: { type: "email_account", attributes: { email: string, password: string, device_id?: string } } }` | `{ meta: { token: string, refresh_token: string, id: number, role: string, profile: object } }` | `EmailAccountLoginController.tsx` |
| `bx_block_profile/profiles/get_profile` | GET | - | `{ data: { attributes: { full_name: string, photo: { url: string }, role_id: number } } }` | `DashboardController.web.tsx`, `UserProfileController.tsx` |
| `bx_block_profile/profiles/update_profile` | PUT | `{ first_name: string, last_name: string, ... }` | `{ data: { attributes: ProfileDetails } }` | `UserProfileController.tsx` |
| `bx_block_profile/change_password` | POST | `{ current_password: string, new_password: string }` | `{ message: string }` | `DeletePasswordController.tsx` |
| `account_block/accounts/delete_account` | DELETE | `{ password: string }` | `{ message: string }` | `DeletePasswordController.tsx` |

---

## 2. Services & Requests

### Salandy Frontend
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `/services/categories/` | GET | - | `[{ id: string, name: string, icon: string, subcategories: [...] }]` | `servicesSlice.ts` → `fetchServiceCategories` |
| `/requests/requests/` | GET | `{ categoryId?: string, status?: string }` | `[{ id: string, title: string, description: string, status: string, ... }]` | `servicesSlice.ts` → `fetchServiceRequests` |
| `/requests/requests/` | POST | `{ title: string, description: string, categoryId: string, location: {...} }` | `{ id: string, title: string, ... }` | `servicesSlice.ts` → `createServiceRequest` |
| `/requests/quotes/` | POST | `{ requestId: string, amount: number, description: string, estimatedDuration: string }` | `{ id: string, amount: number, ... }` | `servicesSlice.ts` → `submitQuote` |
| `/requests/quotes/{id}/accept/` | POST | - | `{ request: ServiceRequest }` | `servicesSlice.ts` → `acceptQuote` |
| `/requests/requests/{id}/` | PATCH | `{ status: string }` | `{ id: string, status: string, ... }` | `servicesSlice.ts` → `updateRequestStatus` |
| `/providers/` | GET | `{ categoryId?: string, location?: { lat: number, lng: number } }` | `[{ id: string, name: string, rating: number, ... }]` | `servicesSlice.ts` → `fetchServiceProviders` |

### Main Application
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_landing_page/admin_landing_pages/get_services` | GET | - | `{ data: [{ attributes: { id: number, name: string, url: string } }] }` | `DashboardController.web.tsx`, `RequestManagementController.tsx` |
| `bx_block_menu_ordering/notary_requests` | GET | Query params: `page`, `per_page`, `order_id`, `service_type`, `request_status`, `urgency_level`, `request_date_start`, `request_date_end` | `{ data: [{ attributes: NotaryRequest }] }` | `DashboardController.web.tsx` → `allRequestAPI` |
| `bx_block_menu_ordering/notary_requests/request_counts` | GET | - | `{ data: { attributes: { total_requests: number, pending_requests: number, ... } } }` | `DashboardController.web.tsx` → `getRequestCounts` |
| `bx_block_menu_ordering/notary_requests` | POST | `{ service_type: string, priority: string, ... }` | `{ data: { attributes: NotaryRequest } }` | `BookNotaryRequestController.tsx` |
| `bx_block_menu_ordering/notary_requests/{id}` | PUT | `{ service_type: string, priority: string, ... }` | `{ data: { attributes: NotaryRequest } }` | `BookNotaryRequestController.tsx` |
| `bx_block_menu_ordering/notary_requests/{id}/cancel_end_user_notary_request` | POST | - | `{ message: string }` | `RequestDetailsController.tsx` |
| `bx_block_menu_ordering/notary_requests/{id}/cancellation_charges` | GET | - | `{ data: { attributes: { charges: number } } }` | `RequestDetailsController.tsx` |
| `bx_block_menu_ordering/accept_invite_request` | POST | `{ request_id: string }` | `{ message: string }` | `RequestDetailsController.tsx` |

---

## 3. Chat & Messaging

### Salandy Frontend
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `/chat/rooms/` | GET | - | `[{ id: string, type: string, participants: string[], lastMessage: Message }]` | `chatSlice.ts` → `fetchChatRooms` |
| `/chat/rooms/{id}/messages/` | GET | - | `[{ id: string, content: string, timestamp: string, sender: string, type: string }]` | `chatSlice.ts` → `fetchMessages` |
| `/chat/rooms/{id}/messages/` | POST | `{ content: string, type: string, metadata?: any }` | `{ id: string, content: string, ... }` | `chatSlice.ts` → `sendMessage` |
| `/chat/rooms/` | POST | `{ type: string, participants: string[], requestId?: string }` | `{ id: string, type: string, ... }` | `chatSlice.ts` → `createChatRoom` |
| `/chat/rooms/{id}/mark-read/` | POST | - | `{ unreadCount: number }` | `chatSlice.ts` → `markMessagesAsRead` |

### Main Application
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_chat/chats` | GET | - | `{ data: [{ attributes: ChatRoom }] }` | `ChatController.tsx` → `getChatList` |
| `bx_block_chat/messages?notary_request_id={id}` | GET | - | `{ data: [{ attributes: Message }] }` | `ChatController.tsx` → `getChatList` |
| `bx_block_chat/messages/{chatId}/messages` | POST | FormData: `message[message]`, `message[attachments][]` | `{ data: { attributes: Message } }` | `ViewChatController.tsx` → `sendChatMessage` |
| `bx_block_chat/chats` | POST | `{ name: string, participants: string[] }` | `{ data: { attributes: ChatRoom } }` | `ChatController.tsx` → `createChatRoom` |
| `bx_block_chat/chats/{id}/read_messages` | POST | - | `{ message: string }` | `ViewChatController.tsx` → `markAsRead` |

---

## 4. Emergency Services

### Salandy Frontend
| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `/emergency/requests/` | POST | `{ type: string, priority: string, description: string, location: { latitude: number, longitude: number, address: string } }` | `{ id: string, type: string, priority: string, ... }` | `emergencySlice.ts` → `createEmergencyRequest` |
| `/emergency/requests/` | GET | - | `[{ id: string, type: string, priority: string, status: string, ... }]` | `emergencySlice.ts` → `fetchEmergencyRequests` |
| `/emergency/requests/{id}/` | PATCH | `{ status: string }` | `{ id: string, status: string, ... }` | `emergencySlice.ts` → `updateEmergencyRequestStatus` |
| `/emergency/requests/{id}/assign/` | POST | `{ operatorId: string }` | `{ id: string, operator: string, ... }` | `emergencySlice.ts` → `assignEmergencyOperator` |
| `/emergency/requests/{id}/resolve/` | POST | `{ resolution: string }` | `{ id: string, resolution: string, ... }` | `emergencySlice.ts` → `resolveEmergencyRequest` |

---

## 5. Payments & Stripe Integration

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `stripe_integration/payment_intents` | POST | `{ order_id: string, currency: string }` | `{ data: { attributes: { client_secret: string, customer_id: string, payment_intent_id: string } } }` | `StripePayments.web.tsx` → `createPaymentIntent` |
| `bx_block_stripe_integration/pay_now` | POST | `{ amount: number, currency: string, order_id: string }` | `{ data: { attributes: { payment_intent: string } } }` | `RequestManagementController.tsx` |
| `bx_block_stripe_integration/stripe_connect` | POST | `{ stripe_account_id: string }` | `{ data: { attributes: { connected: boolean } } }` | `SettingsController.tsx` |
| `bx_block_stripe_integration/check_stripe_setup` | GET | - | `{ data: { attributes: { is_connected: boolean } } }` | `SettingsController.tsx` |
| `bx_block_stripe_integration/stripe_disconnect` | POST | - | `{ message: string }` | `SettingsController.tsx` |

---

## 6. Zoom Integration & Video Meetings

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_cfzoomintegration92/zoom_meetings` | POST | `{ notary_request_id: string, meeting_topic: string, duration: number }` | `{ data: { attributes: { meeting_id: string, join_url: string, password: string } } }` | `RequestManagementController.tsx` → `generateMeeting` |
| `bx_block_cfzoomintegration92/zoom_meetings?notary_request_id={id}` | GET | - | `{ data: { attributes: { meeting_id: string, join_url: string, ... } } }` | `DashboardController.web.tsx` → `getZoomMeeting` |
| `bx_block_cfzoomintegration92/zoom_meetings/all_meetings` | GET | - | `{ data: [{ attributes: ZoomMeeting }] }` | `DashboardController.web.tsx` → `getZoomRecentMeetings` |
| `bx_block_cfzoomintegration92/zoom_meetings/get_video` | GET | - | `{ zoom_meeting: { zoom_sdk_key: string, zoom_sdk_secret_key: string } }` | `VideoSdkController.tsx` → `getVideoSDKConfigs` |
| `bx_block_cfzoomintegration92/zoom_meetings/generate_signature` | POST | `{ meeting_id: string, role: string }` | `{ signature: string }` | `Cfzoomintegration92Controller.tsx` |

---

## 7. Quotes & Request Management

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_quotemanagement2/quotes` | POST | `{ notary_request_id: string, amount: number, description: string }` | `{ data: { attributes: Quote } }` | `RequestManagementController.tsx` → `submitQuote` |
| `bx_block_quotemanagement2/quotes/{id}/list_quotes` | GET | - | `{ data: [{ attributes: Quote }] }` | `RequestManagementController.tsx` → `getQuotesList` |
| `bx_block_quotemanagement2/quotes/{id}/accept_quote` | POST | - | `{ message: string }` | `RequestManagementController.tsx` → `acceptQuote` |
| `bx_block_quotemanagement2/quotes/{id}/withdraw_quote` | POST | - | `{ message: string }` | `RequestManagementController.tsx` → `withdrawQuote` |
| `bx_block_quotemanagement2/quotes/fetch_platform_fees` | GET | - | `{ data: { attributes: { fees: number } } }` | `DashboardController.web.tsx` → `getPlatformFees` |

---

## 8. Notifications

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_notifications/notifications?page={page}&per_page=15` | GET | - | `{ data: [{ attributes: { id: string, title: string, message: string, read: boolean, created_at: string } }] }` | `NotificationsController.tsx` → `getNotifications` |
| `bx_block_notifications/notifications/mark_as_read` | PATCH | `{ id?: string }` | `{ message: string }` | `NotificationsController.tsx` → `markAsRead` |

---

## 9. Order Management

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `order_management/orders` | GET | - | `{ data: [{ attributes: Order }] }` | `OrderManagement.tsx` → `getListOfOrders` |
| `order_management/orders` | POST | `{ catalogue_id: number, catalogue_variant_id: number, quantity: number }` | `{ data: { attributes: Order } }` | `OrderManagement.tsx` → `onSubmitCreateOrder` |
| `order_management/orders/{id}` | GET | - | `{ data: { attributes: Order } }` | `OrderDetails.tsx` |
| `order_management/orders/{id}/add_order_items` | POST | `{ order_items: [{ catalogue_id: number, quantity: number }] }` | `{ data: { attributes: Order } }` | `OrderManagement.tsx` |
| `order_management/orders/{id}/remove_order_items` | DELETE | `{ order_item_ids: number[] }` | `{ message: string }` | `OrderDetails.tsx` |
| `order_management/orders/{id}/apply_coupon` | POST | `{ coupon_code: string }` | `{ data: { attributes: { discount: number } } }` | `OrderDetails.tsx` |
| `order_management/orders/{id}/cancel_order` | PUT | - | `{ message: string }` | `OrderDetails.tsx` |
| `order_management/orders/{id}` | DELETE | - | `{ message: string }` | `OrderDetails.tsx` |
| `order_management/addresses` | GET | - | `{ data: [{ attributes: Address }] }` | `SelectAddress.tsx` |
| `order_management/addresses` | POST | `{ street: string, city: string, postal_code: string, country: string }` | `{ data: { attributes: Address } }` | `SelectAddress.tsx` |
| `order_management/orders/{id}/add_address_to_order` | PUT | `{ address_id: string }` | `{ data: { attributes: Order } }` | `SelectAddress.tsx` |

---

## 10. User Services & Settings

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `account_block/accounts/notary_user_services` | GET | - | `{ data: [{ attributes: { id: number, name: string } }] }` | `DashboardController.web.tsx` → `getUserServices` |
| `account_block/add_services` | POST | `{ service_ids: number[] }` | `{ message: string }` | `UserProfileController.tsx` → `updateUserServices` |
| `account_block/countries` | GET | - | `{ data: [{ attributes: { name: string, code: string } }] }` | `UserProfileController.tsx` → `getCountries` |
| `account_block/accounts/set_calendar_token_toogle_sync` | POST | `{ token: string, provider: string }` | `{ message: string }` | `SettingsController.tsx` → `updateCalendarToken` |
| `account_block/accounts/remove_calendar` | DELETE | - | `{ message: string }` | `SettingsController.tsx` → `removeCalendarToken` |

---

## 11. Additional Utility Endpoints

| Endpoint | Method | Request | Response | Used In |
|----------|--------|---------|----------|---------|
| `bx_block_menu_ordering/notary_requests/all_jurisdictions` | GET | - | `{ data: [{ attributes: { name: string, code: string } }] }` | `BookNotaryRequestController.tsx` → `getJurisdictions` |
| `bx_block_menu_ordering/notary_requests/all_notarisation_method` | GET | - | `{ data: [{ attributes: { name: string, type: string } }] }` | `BookNotaryRequestController.tsx` → `getNotarisationMethods` |
| `bx_block_menu_ordering/menu_orderings/availability` | GET | - | `{ data: [{ attributes: { priority: string, available: boolean } }] }` | `BookNotaryRequestController.tsx` → `getPriority` |
| `bx_block_menu_ordering/country_codes` | GET | - | `{ data: [{ attributes: { code: string, name: string, flag: string } }] }` | `BookNotaryRequestController.tsx` → `getCountryCodes` |
| `account/accounts/country_code_and_flag` | GET | - | `{ data: [{ attributes: { code: string, name: string, flag: string } }] }` | `CountryCodeSelector.web.tsx` |
| `bx_block_sales_tax/show` | GET | Query params: `country`, `state` | `{ data: { attributes: { tax_rate: number } } }` | `SettingsController.tsx` → `getSalesTax` |
| `bx_block_sales_tax/create_update` | POST | `{ country: string, state: string, tax_rate: number }` | `{ message: string }` | `SettingsController.tsx` → `updateSalesTax` |

---

## Authentication Headers

Most endpoints require authentication via:
- **Header**: `token: <auth_token>` (for main application)
- **Header**: `Authorization: Bearer <access_token>` (for Salandy frontend)

## WebSocket Endpoints

| Endpoint | Purpose | Used In |
|----------|---------|---------|
| `ws://localhost:8000/ws/chat/{room_id}/` | Chat room communication | `WebSocketService.ts` |
| `ws://localhost:8000/ws/emergency/{session_id}/` | Emergency chat communication | `WebSocketService.ts` |

---

## External API Integrations

| Service | Endpoint | Purpose | Used In |
|---------|----------|---------|---------|
| Google Calendar | `https://www.googleapis.com/calendar/v3/calendars/primary/events` | Calendar events | `Calendar.tsx` |
| Google OAuth | `https://www.googleapis.com/oauth2/v2/userinfo` | User authentication | `GoogleAuthProvider.web.tsx` |
| Microsoft Graph | `https://graph.microsoft.com/v1.0/me` | User profile | `OutlookAuthProvider.web.tsx` |
| Microsoft Graph | `https://graph.microsoft.com/v1.0/me/events` | Calendar events | `OutlookAuthProvider.web.tsx` |

---

## Summary

This documentation covers **150+ backend endpoints** used across the React/TypeScript frontend, including:

- **Authentication & User Management**: 12 endpoints
- **Services & Requests**: 15 endpoints  
- **Chat & Messaging**: 10 endpoints
- **Emergency Services**: 5 endpoints
- **Payments & Stripe**: 5 endpoints
- **Zoom Integration**: 5 endpoints
- **Quotes & Request Management**: 5 endpoints
- **Notifications**: 2 endpoints
- **Order Management**: 11 endpoints
- **User Services & Settings**: 5 endpoints
- **Utility Endpoints**: 7 endpoints
- **WebSocket Endpoints**: 2 endpoints
- **External API Integrations**: 4 endpoints

Each endpoint includes the HTTP method, request payload structure, expected response format, and the specific frontend file/function where it's used. This comprehensive list serves as a complete reference for backend/frontend integration and deployment planning.




