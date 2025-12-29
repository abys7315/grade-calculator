# TODO: Add Middleware to Protect User and Admin Routes

## Information Gathered
- `backend/middleware/auth.js`: Existing JWT authentication middleware.
- `backend/routes/adminRoutes.js`: Contains admin routes (POST /course, POST /slot) that are currently unprotected.
- `backend/routes/courseRoutes.js`: User route (GET /) to fetch courses, unprotected.
- `backend/routes/slotRoutes.js`: User route (GET /:courseCode) to fetch slots, unprotected.
- `backend/routes/marks.js`: Mixed protection - POST /submit and GET /user-results have auth, but GET /result/:course/:slot and GET /all-results do not.
- `backend/routes/otp.js` and `backend/routes/authRoutes.js`: Contain public routes for authentication.

## Plan
- [x] Create an admin middleware in `backend/middleware/auth.js` that checks for authentication and admin role.
- [x] Apply auth middleware to unprotected user routes in `courseRoutes.js`, `slotRoutes.js`, and `marks.js` (GET /result/:course/:slot, GET /all-results).
- [x] Apply admin middleware to `adminRoutes.js`.

## Dependent Files to Edit
- [x] `backend/middleware/auth.js`: Add admin middleware function.
- [x] `backend/routes/adminRoutes.js`: Add admin middleware to router.
- [x] `backend/routes/courseRoutes.js`: Add auth middleware to router.
- [x] `backend/routes/slotRoutes.js`: Add auth middleware to router.
- [x] `backend/routes/marks.js`: Add auth middleware to unprotected routes.

## Followup Steps
- Test the protected routes to ensure they require authentication.
- Verify admin routes require admin role.
