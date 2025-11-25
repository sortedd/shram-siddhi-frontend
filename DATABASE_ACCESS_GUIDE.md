# 🗄️ **Database Access Guide - How to Check Your Data**

## 🎯 **Multiple Ways to Check Database Data**

### **Method 1: Web-Based Database Viewer (Easiest)**
1. **Start your application**:
   ```bash
   npm run dev
   ```

2. **Login as admin**:
   - Go to: `http://localhost:5174/admin-login`
   - Email: `admin@shramsiddhi.com`
   - Password: `Admin@123`

3. **Access Database Viewer**:
   - Click on "Database Viewer" in the admin navigation
   - Or go directly to: `http://localhost:5174/database-viewer`

4. **Features**:
   - ✅ View all database tables
   - ✅ Browse table data with pagination
   - ✅ See record counts for each table
   - ✅ Real-time data refresh
   - ✅ User-friendly interface

---

### **Method 2: Command Line Database Admin (Advanced)**

#### **Quick Commands**:
```bash
# Show database statistics
npm run db:stats

# View all workers
npm run db:workers

# Search for specific workers
npm run db:search "राजेश"

# Show recent activity
npm run db:recent

# Full admin menu
npm run db:admin
```

#### **Detailed Commands**:
```bash
# View specific number of workers
node server/db-admin.js workers 20

# Search workers by name/skill/city
node server/db-admin.js search "Mason"

# View users table
node server/db-admin.js users

# View client requests
node server/db-admin.js requests

# Show table structure
node server/db-admin.js describe workers

# Export table to CSV
node server/db-admin.js export workers workers_backup.csv
```

---

### **Method 3: Direct SQLite Commands**
```bash
# Open database directly
sqlite3 server/shram_siddhi.db

# Inside SQLite shell:
.tables                    # Show all tables
.schema workers           # Show table structure
SELECT * FROM workers;    # View all workers
SELECT COUNT(*) FROM workers; # Count workers
.quit                     # Exit
```

---

### **Method 4: API Endpoints (For Developers)**

#### **Database Admin API**:
```bash
# Get database statistics
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/admin/stats

# Get all tables
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/admin/tables

# Get workers data (with pagination)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:3001/api/admin/table/workers?limit=10&offset=0"
```

#### **Regular API Endpoints**:
```bash
# Get all workers
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/workers

# Get statistics
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/statistics

# Get analytics
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/analytics/daily
```

---

## 📊 **Database Tables Overview**

### **1. `workers` Table**
**Purpose**: Store all worker enrollment data
**Key Fields**:
- `id` - Unique worker ID
- `full_name` - Worker's full name
- `primary_skill` - Main skill (Mason, Plumber, etc.)
- `mobile_number` - Contact number
- `city`, `state` - Location
- `status` - pending/active/inactive
- `verified` - true/false
- `enrollment_date` - When they registered

### **2. `users` Table**
**Purpose**: Admin authentication
**Key Fields**:
- `id` - User ID
- `email` - Login email
- `password_hash` - Encrypted password
- `role` - admin/user

### **3. `client_requests` Table**
**Purpose**: Service requests from clients
**Key Fields**:
- `id` - Request ID
- `client_name` - Client name
- `service_type` - Type of service needed
- `location` - Where service is needed
- `status` - pending/assigned/completed

### **4. `analytics` Table**
**Purpose**: Track enrollment statistics
**Key Fields**:
- `date` - Date of record
- `enrollments` - Number of enrollments
- `active_workers` - Active worker count

### **5. `worker_documents` Table**
**Purpose**: Store worker document references
**Key Fields**:
- `worker_id` - Links to workers table
- `document_type` - Type of document
- `document_url` - File location
- `verified` - Document verification status

---

## 🔍 **Common Database Queries**

### **Check Recent Enrollments**:
```sql
SELECT full_name, primary_skill, city, enrollment_date 
FROM workers 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Count Workers by Skill**:
```sql
SELECT primary_skill, COUNT(*) as count 
FROM workers 
GROUP BY primary_skill;
```

### **Find Verified Workers**:
```sql
SELECT full_name, primary_skill, city 
FROM workers 
WHERE verified = 1 AND status = 'active';
```

### **Search Workers by Location**:
```sql
SELECT full_name, primary_skill, mobile_number 
FROM workers 
WHERE city LIKE '%Delhi%' OR state LIKE '%Delhi%';
```

---

## 📈 **Monitoring Your Database**

### **Daily Checks**:
```bash
# Quick stats
npm run db:stats

# Recent activity
npm run db:recent
```

### **Weekly Analysis**:
```bash
# Export all workers for analysis
npm run db:export workers weekly_workers_report.csv

# Check growth trends via web interface
# Go to: http://localhost:5174/database-viewer
```

### **Data Backup**:
```bash
# Backup entire database
cp server/shram_siddhi.db backups/backup_$(date +%Y%m%d).db

# Export specific tables
node server/db-admin.js export workers workers_backup.csv
node server/db-admin.js export client_requests requests_backup.csv
```

---

## 🚨 **Troubleshooting Database Issues**

### **Database Not Found**:
```bash
# Check if database exists
ls -la server/shram_siddhi.db

# Restart server to recreate
npm run server
```

### **No Data Showing**:
```bash
# Check table contents
npm run db:workers

# Verify API is working
curl http://localhost:3001/api/health
```

### **Permission Issues**:
```bash
# Check file permissions
ls -la server/

# Make sure server directory is writable
chmod 755 server/
```

---

## 🎯 **Best Practices**

1. **Regular Backups**: Copy database file weekly
2. **Monitor Growth**: Check stats daily during active use
3. **Clean Data**: Remove test entries periodically
4. **Security**: Never share database file publicly
5. **Performance**: Monitor query speed as data grows

---

## 📱 **Quick Access Summary**

| Method | Best For | Access |
|--------|----------|---------|
| **Web Viewer** | Non-technical users | `/database-viewer` |
| **CLI Commands** | Quick checks | `npm run db:stats` |
| **SQLite Direct** | Advanced queries | `sqlite3 server/shram_siddhi.db` |
| **API Endpoints** | Developers | `curl` commands |

**🎉 Your database is now fully accessible and manageable!**