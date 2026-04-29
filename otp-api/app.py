from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# In-memory storage for OTPs (use Redis in production)
otp_storage = {}

@app.route('/api/auth/send-otp', methods=['POST', 'OPTIONS'])
def send_otp():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.status_code = 200
        return response

    try:
        data = request.get_json(force=True) or {}
        email = data.get('email')

        if not email:
            return jsonify({'success': False, 'message': 'College Email is required'}), 400

        # Generate 8-digit OTP
        otp = str(random.randint(10000000, 99999999))

        # Store OTP temporarily (5 minutes expiry)
        otp_storage[email] = otp

        # Send email
        sender_email = os.getenv('EMAIL')
        sender_password = os.getenv('EMAIL_PASS')

        if not sender_email or not sender_password:
            return jsonify({'success': False, 'message': 'Email configuration missing'}), 500

        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = 'Your OTP for Grade Calculator'

        body = f'Your OTP is: {otp}'
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, email, text)
        server.quit()

        return jsonify({'success': True, 'message': 'OTP sent successfully'})

    except Exception as e:
        print(f"Error sending OTP: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to send OTP'}), 500

@app.route('/api/auth/verify-otp', methods=['POST', 'OPTIONS'])
def verify_otp():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.status_code = 200
        return response

    try:
        data = request.get_json(force=True) or {}
        email = data.get('email')
        otp = data.get('otp')

        if not email or not otp:
            return jsonify({'success': False, 'message': 'Email and OTP are required'}), 400

        # Check if OTP matches
        stored_otp = otp_storage.get(email)
        if stored_otp and stored_otp == otp:
            # Remove OTP after successful verification
            del otp_storage[email]
            return jsonify({'success': True, 'message': 'OTP verified successfully'})
        else:
            return jsonify({'success': False, 'message': 'Invalid OTP'}), 400

    except Exception as e:
        print(f"Error verifying OTP: {str(e)}")
        return jsonify({'success': False, 'message': 'Failed to verify OTP'}), 500

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

if __name__ == '__main__':
    app.run(debug=True)
