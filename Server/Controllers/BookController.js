const express = require('express');
const BookingModel= require('../Models/BookingModel');
const EventModel= require('../Models/EventModel');
const NotificationModel = require('../Models/NotificationModel');


// Create Booking
const CreateBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId, tickets } = req.body;

   
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.strength < tickets) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

   
    const totalAmount = event.amount * tickets;

    const booking = await BookingModel.create({
      eventId,
      userId,
      tickets,
      totalAmount,
      status: "pending",
    });
     await NotificationModel.create({
      message:`New booking for " ${event.title}"`
     })
    res.status(201).json({
      message: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//get All Bookings

const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("eventId", "title date location amount")
      .populate("userId", "username email");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// update Booking
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    
    if (status === "confirmed") {
      const event = await EventModel.findById(booking.eventId);
      if (event.strength < booking.tickets) {
        return res.status(400).json({ message: "Seats no longer available" });
      }
      event.strength -= booking.tickets;
      await event.save();
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getMyBookings=async(req,res)=>{
  try{
    const bookings= await BookingModel.find({userId:req.user._id}).populate("eventId","title date locaton amount").sort({createdAt:-1});
    res.status(200).json(bookings);

  }catch(err){
    res.status(500).json({
      message:"server error",
      error:"error.message",
    });
  }
};


// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {  CreateBooking, getAllBookings, updateBookingStatus, deleteBooking,getMyBookings};