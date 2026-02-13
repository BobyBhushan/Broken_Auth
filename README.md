# The Silent Server (Backend Debugging Assignment)

This API is intentionally broken. Your task is to debug it and complete the authentication flow.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   Server runs at: `http://localhost:3000`

## Assignment Objective

The goal is to fix the broken authentication endpoints so that a user can:
1.  **Login** to get a session ID and OTP.
2.  **Verify the OTP** to get a valid session cookie.
3.  **Exchange the Session** for a JWT Access Token.
4.  **Access Protected Routes** using the token.

You will need to use your browser's developer tools, network inspection, and server logs to debug.

---

## Tasks & Verification

### Task 1: Fix Login
**Endpoint:** `POST /auth/login`
The server should generate a session and log an OTP to the console.

**Test Command:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<YOUR_EMAIL@example.com>","password":"password123"}'
```
**Expected Outcome:**
- Server logs the OTP (e.g., `[OTP] Session abc12345 generated`).
- Response contains `loginSessionId`.

### Task 2: Fix OTP Verification
**Endpoint:** `POST /auth/verify-otp`
The server fails to verify the OTP correctly. You need to find out why.
*Hint: Check data types and how cookies are set.*

**Test Command:**
(Replace `<loginSessionId>` and `<otp>` with values from Task 1)
```bash
curl -c cookies.txt -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"loginSessionId":"<loginSessionId>","otp":"<otp_from_logs>"}'
```
**Expected Outcome:**
- `cookies.txt` is created containing a session cookie.
- Response says "OTP verified".

### Task 3: Fix Token Generation
**Endpoint:** `POST /auth/token`
This endpoint is supposed to issue a JWT, but it has a bug in how it reads the session.

**Test Command:**
```bash
# Uses the cookie captured in Task 2
curl -b cookies.txt -X POST http://localhost:3000/auth/token
```
**Expected Outcome:**
- Response contains `{ "access_token": "..." }`.

### Task 4: Fix Protected Route Access
**Endpoint:** `GET /protected`
Ensure the middleware correctly validates the token.

**Test Command:**
```bash
# Replace <jwt> with the token from Task 3
curl -H "Authorization: Bearer <jwt>" http://localhost:3000/protected
```
**Expected Outcome:**
- Response: `{ "message": "Access granted", "user": ... }`

---


## Expected Output

After fixing the bugs, you should be able to run the following sequence successfully:

1.  **Login**: Receive a `loginSessionId` and see an OTP in the server logs.
2.  **Verify OTP**: Receive a session cookie (`session_token`).
3.  **Get Token**: Exchange the session cookie for a JWT (`access_token`).
4.  **Access Protected Route**: Use the JWT to get a 200 OK response with user details and a **unique Success Flag**.





<img width="1920" height="1080" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/2e4c9fc2-42c7-49cf-aec3-2d393de7da62" />
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/abbe58c3-56b5-4de4-8f13-f600402e9436" />
<img width="1920" height="1080" alt="Screenshot (3)" src="https://github.com/user-attachments/assets/abbe58c3-56b5-4de4-8f13-f600402e9436" />
<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/59f2175b-e070-44e0-a94a-ef71dc5f1490" />
<img width="1920" height="1080" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/59f2175b-e070-44e0-a94a-ef71dc5f1490" />
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/149dc934-ec09-4b5f-be58-15d62621a8b0" />
<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/149dc934-ec09-4b5f-be58-15d62621a8b0" />

<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/2ac4adc7-e634-4fa0-a9c7-da283be376fc" />
<img width="1920" height="1080" alt="Screenshot (6)" src="https://github.com/user-attachments/assets/2ac4adc7-e634-4fa0-a9c7-da283be376fc" />
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/53abbc3d-caa9-4238-aa87-1de7ab21f62d" />
<img width="1920" height="1080" alt="Screenshot (7)" src="https://github.com/user-attachments/assets/53abbc3d-caa9-4238-aa87-1de7ab21f62d" />
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/b2c1d47b-1cf9-4c6f-a750-2dda6ae31c08" />
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/b2c1d47b-1cf9-4c6f-a750-2dda6ae31c08" />









