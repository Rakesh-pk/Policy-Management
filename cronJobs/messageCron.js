import cron from "node-cron";
import Message from "../models/Message.js";
import ScheduledMessage from "../models/ScheduledMessage.js";
import { format } from 'date-fns';

// Cron job runs every minute
cron.schedule("* * * * *", async () => {
  console.log("Checking for messages to insert...");

//   "scheduledDay": "15-03-2025",
//    "scheduledTime": "01:00",
  const now = new Date();
  const date = format(now, 'dd-MM-yyyy'); 
  const time = format(now, 'HH:mm');
//   console.log(date)
//   console.log(time)

  const messages = await Message.find({ scheduledDay:date , scheduledTime:time });

  if (messages.length > 0) {
    console.log(`Found ${messages.length} messages to insert.`);

    for (const msg of messages) {
      await ScheduledMessage.create({ message: msg.message });

      console.log(`Inserted message: ${msg.message}`);
    }
  } else {
    console.log('No messages found for this schedule.');
  }


});
