# TODO: Implement "Result Pending" Feature

## Backend Changes
- [x] Modify `/user-results` endpoint in `backend/routes/marks.js` to process all groups and add a "pending" flag for groups with fewer than 20 entries.

## Frontend Changes
- [x] Update `grade-calculator-frontend/src/pages/UserResult.jsx` to handle the "pending" flag and display "result is pending" instead of grade and marks for pending courses.

## Testing
- [x] Test the changes to ensure pending courses show "result is pending" and other courses show grades and marks.
- [x] Verify that the API returns the correct data structure.
