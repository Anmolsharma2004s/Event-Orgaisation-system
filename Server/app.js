

require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 5000;
const authRoutes=require('./Routes/AuthRoutes');
const eventRoutes=require('./Routes/EventRoutes');
const bookingRoutes=require('./Routes/BookingRoutes');
const AnalyticsRoutes=require('./Routes/AnalyticsRoutes');
const UserProfileRoutes= require('./Routes/UserProfileRoutes');
const userRoutes=require('./Routes/userRoutes');
const adminDashboardRoutes=require('./Routes/adminDashboardRoutes');
const NotificationRoutes=require('./Routes/NotificationRoutes');
const db=require('./config/mongoose-connection');
const cookieParser=require('cookie-parser');
const cors=require('cors');



app.use(cors({
    origin:['http://localhost:5173',
    "https://event-orgaisation-system.vercel.app"],
    credentials:true,
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRoutes);
app.use('/api/events',eventRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/analytics', AnalyticsRoutes);
app.use('/api/admin',userRoutes);
app.use('/api/user',UserProfileRoutes);
app.use('/api/dashboard',adminDashboardRoutes)
app.use('/api/notifications',NotificationRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});