# Gingr API Notes

## Base URL
https://metromutts.gingrapp.com/api/v1/

## Authentication
All requests require `key` parameter: `[REMOVED — rotate in Gingr; configure GINGR_API_KEY server-side]`

## Key Endpoints for Availability

### 1. reservation_widget_data (GET)
- URL: /api/v1/reservation_widget_data
- Params: key, timestamp (YYYY-MM-DD)
- Returns: summary of reservations for a date (check ins, outs, overnights)
- This powers the Gingr dashboard widget

### 2. reservations (POST)
- URL: /api/v1/reservations
- Params: key, start_date, end_date, checked_in (true/false)
- Returns: list of reservations within date range
- Max range: 30 days

### 3. reservation_types (GET)
- URL: /api/v1/reservation_types
- Params: key, optional: id, active_only
- Returns: list of reservation types (daycare, boarding, grooming, etc.)

### 4. get_services_by_type (GET)
- URL: /api/v1/get_services_by_type
- Params: key, type_id
- Returns: allowable additional services for a reservation type

## Strategy
1. First call reservation_types to get the type IDs for daycare, boarding, grooming
2. Call reservation_widget_data for today/tomorrow to get current occupancy
3. Call reservations with date range to count booked slots
4. Compare against capacity to determine availability

Security: a credential was previously committed here. Removing it from this file does not remove it from Git history. Rotate/revoke it in Gingr before connecting any new integration. History cleanup requires a coordinated repository maintenance action.
