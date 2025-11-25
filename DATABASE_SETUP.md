# 🗄️ Database Setup Guide - Shram Siddhi

## ✅ What We've Implemented

### 1. **Real Database System**
- **SQLite Database** with better-sqlite3 for production-ready data storage
- **Express.js API Server** with proper authentication and CORS
- **JWT Authentication** for secure admin access
- **Structured Database Schema** with proper relationships

### 2. **Database Tables Created**
- `users` - Admin authentication
- `workers` - Worker enrollment data
- `client_requests` - Service requests from clients
- `analytics` - Enrollment tracking data
- `worker_documents` - Document management

### 3. **API Endpoints**
- **Authentication**: `/api/auth/login`
- **Workers**: CRUD operations with `/api/workers/*`
- **Statistics**: `/api/statistics` and `/api/analytics/*`
- **Client Requests**: `/api/client-requests/*`
- **Export**: `/api/workers/export/csv`

## 🚀 How to Start the Application

### Method 1: Start Both Frontend and Backend Together
```bash
npm run dev
```
This will start:
- Backend API server on `http://localhost:3001`
- Frontend React app on `http://localhost:5174`

### Method 2: Start Separately
```bash
# Terminal 1 - Start Backend
npm run server

# Terminal 2 - Start Frontend  
npm start
```

## 🔐 Default Login Credentials
- **Email**: `admin@shramsiddhi.com`
- **Password**: `Admin@123`

## 📊 Database Location
The SQLite database will be created at: `server/shram_siddhi.db`

## 🔄 What Changed from Mock Data

### Before (Mock Data):
- Data stored in localStorage
- Hardcoded sample workers and analytics
- No real authentication
- No data persistence across devices

### After (Real Database):
- **SQLite database** with proper schema
- **Real API endpoints** with authentication
- **Persistent data** across sessions and devices
- **Proper error handling** and validation
- **CSV export** functionality
- **Real-time statistics** and analytics

## 📋 Features Now Working with Real Data

### ✅ Authentication System
- Real JWT-based login
- Secure password hashing with bcrypt
- Token-based session management

### ✅ Worker Management
- Create, read, update worker records
- Status management (pending, active, inactive)
- Verification system
- Real-time statistics

### ✅ Analytics Dashboard
- Real enrollment trends (daily, weekly, monthly)
- Skill distribution from actual data
- Worker location mapping
- Export functionality

### ✅ Data Persistence
- All data saved to SQLite database
- Survives application restarts
- Proper data relationships
- Backup and restore capability

## 🛠️ API Testing

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Login Test
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shramsiddhi.com","password":"Admin@123"}'
```

### Get Workers (requires auth token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/workers
```

## 🔧 Environment Variables

Create `.env` file in root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Shram Siddhi
REACT_APP_VERSION=1.0.0
```

## 📁 New File Structure
```
├── server/
│   ├── database.js       # Database schema and operations
│   ├── server.js         # Express API server
│   └── shram_siddhi.db   # SQLite database (auto-created)
├── src/
│   └── services/
│       └── api.js        # API service layer
├── .env                  # Environment configuration
└── DATABASE_SETUP.md     # This guide
```

## 🚨 Important Notes

1. **Database Auto-Creation**: The database and tables are created automatically on first run
2. **Default Admin**: A default admin user is created automatically
3. **Data Migration**: Old localStorage data won't be migrated automatically
4. **Port Configuration**: Backend runs on 3001, frontend on 5174
5. **CORS Enabled**: API accepts requests from frontend domain

## 🔍 Troubleshooting

### Database Issues
```bash
# Check if database file exists
ls -la server/shram_siddhi.db

# Restart server to recreate database
npm run server
```

### API Connection Issues
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Check frontend environment
echo $REACT_APP_API_URL
```

### Authentication Issues
- Clear browser localStorage
- Use correct default credentials
- Check JWT token expiration (24 hours)

## 🎯 Next Steps

1. **Test the Application**: Login and create some workers
2. **Verify Data Persistence**: Restart the app and check data is still there
3. **Test Export**: Try exporting worker data as CSV
4. **Monitor Performance**: Check API response times
5. **Backup Strategy**: Consider regular database backups

Your application now has a complete, production-ready database system! 🎉