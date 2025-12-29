# TODO: Create OTP API for PythonAnywhere Deployment

## Python OTP API (New Project)
- [x] Create otp-api directory
- [x] Create Flask app.py with OTP endpoints
- [x] Create requirements.txt
- [x] Create .env template

## Node.js Backend Modifications
- [x] Modify backend/routes/otp.js to call Python API instead of nodemailer
- [x] Remove nodemailer from backend/package.json
- [ ] Update backend/routes/authRoutes.js (if needed)
- [ ] Add PYTHON_OTP_API_URL to backend/.env

## Deployment
- [ ] Deploy Python API to PythonAnywhere
- [ ] Update PYTHON_OTP_API_URL in backend/.env with actual URL
- [ ] Test integration

## Testing
- [ ] Test OTP flow with Python API
