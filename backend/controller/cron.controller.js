import cron from "node-cron";

cron.schedule("* * * * *", () => {
    console.log("Notification sent every minute", moment().format('DD MM YYYY hh:mm:ss'));
});
